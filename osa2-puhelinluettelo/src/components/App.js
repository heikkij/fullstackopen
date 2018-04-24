import React from 'react';
import personService from '../services/persons'

const Notification = ({ message }) => {
    if (message === null) return null
    return (
      <div className="message">
        {message}
      </div>
    )
}

const NewPerson = ({newPersonName, newPersonNumber, onNameChange, onNumberChange}) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr><td>nimi:</td><td><input value={newPersonName} onChange={onNameChange} /></td></tr>
                    <tr><td>numero:</td><td><input value={newPersonNumber} onChange={onNumberChange} /></td></tr>
                </tbody>
            </table>
            <div>
                <button type="submit">lisää</button>
            </div>
        </div>
    )
}

const Person = ({ person, onDelete }) => {
    const deleteWithConfirm = (event) => {
        if (window.confirm(`poistetaanko ${person.name}`)) {
            onDelete(event)
        }
    }
    return (
        <tr><td>{person.name}</td><td>{person.number}</td><td><button id={person.id} onClick={deleteWithConfirm}>poista</button></td></tr>
    )
}

const Persons = ({ persons, onDelete }) => {
    return (
        <table>
            <tbody>
                {persons.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
            </tbody>
        </table>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newPersonName: '',
            newPersonNumber: '',
            nameFilter: '',
            message: null,
        }
    }

    componentDidMount() {
        personService.getAll().then(response => {
            this.setState({ persons: response.data })
        })
    }    

    addPerson = (event) => {
        event.preventDefault()
        const person = this.state.persons.find(person => person.name === this.state.newPersonName)
        if (person) {
            const newPerson = {...person, number: this.state.newPersonNumber}
            if (window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                personService.updateOne(newPerson.id, newPerson).then(response => {
                    this.setState({
                        persons: this.state.persons.map((person) => person.id === newPerson.id ? response.data : person),
                        newPersonName: '',
                        newPersonNumber: '',
                        message: `päivitetty ${newPerson.name}`,
                    })
                }).catch(error => {
                    this.setState({
                        persons: this.state.persons.filter((person) => person.id !== newPerson.id),
                        message: `${newPerson.name} on poistettu`,
                    })
                })
            }
        } else {
            const newPerson = {
                name: this.state.newPersonName,
                number: this.state.newPersonNumber,
            }
            personService.create(newPerson).then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newPersonName: '',
                    newPersonNumber: '',
                    message: `lisätty ${newPerson.name}`,
                })
            })
        }
        setTimeout(() => this.setState({message: null}), 5000)
    }

    deletePerson = (event) => {
        const { target: { id } } = event
        personService.deleteOne(id).then(response => {
            const removed = this.state.persons.find(person => person.id === id)
            this.setState({
                persons: this.state.persons.filter((person) => person.id !== id),
                message: `poistettu ${removed.name}`,
            })
        })
        setTimeout(() => this.setState({message: null}), 5000)
    }

    handleNewName = (event) => {
        this.setState({
            newPersonName: event.target.value,
        })
    }

    handleNewNumber = (event) => {
        this.setState({
            newPersonNumber: event.target.value,
        })
    }

    handleNameFilter = (event) => {
        this.setState({
            nameFilter: event.target.value
        })
    }

    render() {
        const personsToShow = this.state.persons.filter(person => person.name.search(new RegExp(this.state.nameFilter, 'i')) > -1)
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message}/>
                rajaa näytettäviä: <input value={this.state.nameFilter} onChange={this.handleNameFilter} />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <NewPerson newPersonName={this.state.newPersonName} newPersonNumber={this.state.newPersonNumber} onNameChange={this.handleNewName} onNumberChange={this.handleNewNumber} />
                </form>
                <h2>Numerot</h2>
                <Persons persons={personsToShow} onDelete={this.deletePerson} />
            </div>
        )
    }
}

export default App