import React from 'react';
import personService from '../services/persons'

const Input = (props) => {
    return (
        <input value={props.value} onChange={props.onChange} />
    )
}

const NewPerson = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr><td>nimi:</td><td><Input value={props.newName} onChange={props.onNameChange} /></td></tr>
                    <tr><td>numero:</td><td><Input value={props.newNumber} onChange={props.onNumberChange} /></td></tr>
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
            newName: '',
            newNumber: '',
            nameFilter: '',
        }
    }

    componentDidMount() {
        personService.getAll().then(response => {
            this.setState({ persons: response.data })
        })
    }    

    addPerson = (event) => {
        event.preventDefault()
        if (this.state.persons.find(person => person.name === this.state.newName)) return
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber,
        }
        personService.create(newPerson).then(response => {
            this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: '',
            })
        })
    }

    deletePerson = (event) => {
        const { target: { id } } = event
        personService.deleteOne(id).then(response => {
            this.setState({
                persons: this.state.persons.filter((person) => person.id.toString() !== id.toString()),
            })
        })
    }

    handleNewName = (event) => {
        this.setState({
            newName: event.target.value,
        })
    }

    handleNewNumber = (event) => {
        this.setState({
            newNumber: event.target.value,
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
                rajaa näytettäviä: <Input value={this.state.nameFilter} onChange={this.handleNameFilter} />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <NewPerson newName={this.state.newName} newNumber={this.state.newNumber}
                        onNameChange={this.handleNewName} onNumberChange={this.handleNewNumber} />
                </form>
                <h2>Numerot</h2>
                <Persons persons={personsToShow} onDelete={this.deletePerson} />
            </div>
        )
    }
}

export default App