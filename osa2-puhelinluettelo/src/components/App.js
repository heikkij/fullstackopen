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
                {
                    name: 'Arto Hellas',
                    number: '0404324321'
                }
            ],
            newName: '',
            newNumber: '',
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        if (this.state.persons.find(person => person.name === this.state.newName)) return
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber,
        }
        const persons = this.state.persons.concat(newPerson)
        const newName = ''
        const newNumber = ''
        this.setState({
            persons,
            newName,
            newNumber,
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

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
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
                        {this.state.persons.map(person => <Person key={person.name} person={person} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App