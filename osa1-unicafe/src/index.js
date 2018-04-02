import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Counter = ({title, number}) => {
    return (
        <div>{title} {number}</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
        }
    }

    setGood = (value) => {
        return () => {
            this.setState({
                good: value,
            })
        }
    }

    setNeutral = (value) => {
        return () => {
            this.setState({
                neutral: value,
            })
        }
    }

    setBad = (value) => {
        return () => {
            this.setState({
                bad: value,
            })
        }
    }

    render() {
        return (
            <div>
            <Header text={'Anna palautetta'} />
            <Button text={'Hyvä'} handleClick={this.setGood(this.state.good + 1)}/>
            <Button text={'Neutraali'} handleClick={this.setNeutral(this.state.neutral + 1)} />
            <Button text={'Huono'} handleClick={this.setBad(this.state.bad + 1)} />
            <Header text={'Statistiikka'} />
            <Counter title={'Hyvä'} number={this.state.good} />
            <Counter title={'Neutraali'} number={this.state.neutral} />
            <Counter title={'Huono'} number={this.state.bad} />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));