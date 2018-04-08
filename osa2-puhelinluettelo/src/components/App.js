import React from 'react';

const Person = ({ person }) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td></tr>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' },
            ],
            newName: '',
            newNumber: '',
            nameFilter: '',
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        if (this.state.persons.find(person => person.name === this.state.newName)) return
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber,
        }
        this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
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
        const searchRegExp = new RegExp(this.state.nameFilter, 'i')
        const personsToShow = this.state.nameFilter.length === 0 ? 
            this.state.persons : this.state.persons.filter(person => person.name.search(searchRegExp) > -1)
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                rajaa näytettäviä: <input value={this.state.nameFilter} onChange={this.handleNameFilter} />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <table>
                        <tbody>
                            <tr><td>nimi:</td><td><input value={this.state.newName} onChange={this.handleNewName} /></td></tr>
                            <tr><td>numero:</td><td><input value={this.state.newNumber} onChange={this.handleNewNumber} /></td></tr>
                        </tbody>
                    </table>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {personsToShow.map(person => <Person key={person.name} person={person} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App