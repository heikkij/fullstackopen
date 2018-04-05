import React from 'react'
import ReactDOM from 'react-dom'

const Anectode = ({text, votes}) => {
    return (
        <div>
            <div>{text}</div>
            <div>has {votes} votes</div>
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(props.anecdotes.length).fill(0),
        }
    }

    voteAnecdote = () => {
        return () => {
            const currentVotes = [...this.state.votes]
            currentVotes[this.state.selected] += 1            
            this.setState({
                votes: currentVotes
            })
        }
    }

    showRandomAnecdote = () => {
        const getRandomIndex = () => Math.floor(Math.random() * Math.floor(anecdotes.length))
        return () => {
            let index
            do {
                index = getRandomIndex()
            } while (index === this.state.selected)
            this.setState({
                selected: index,
            })
        }
    }

    getFavourite = () => this.state.votes.indexOf(Math.max(...this.state.votes))

    render() {
        return (
        <div>
            <Anectode text={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
            <div>
                <Button text={'Vote this'} handleClick={this.voteAnecdote()}/>
                <Button text={'Show next'} handleClick={this.showRandomAnecdote()}/>
            </div>
            <div>
                <h3>Anecdote with most votes</h3>
                <Anectode text={this.props.anecdotes[this.getFavourite()]} votes={this.state.votes[this.getFavourite()]} />
            </div>
        </div>
        )
    }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))