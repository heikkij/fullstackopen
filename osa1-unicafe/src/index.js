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

const Counter = ({title, number, unit}) => {
    return (
        <div>{title} {number} {unit}</div>
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

    getAverage = (state) => {
        if (state.good + state.neutral + state.bad > 0) {
            return ((state.good - state.bad) / (state.good + state.neutral + state.bad)).toFixed(1)
        } else {
            return 0
        }
    }

    getGoodPercentage = (state) => {
        if (state.good + state.neutral + state.bad > 0) {
            return (state.good / (state.good + state.neutral + state.bad) * 100).toFixed(1)
        } else {
            return 0
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
            <Counter title={'Keskiarvo'} number={this.getAverage(this.state)} />
            <Counter title={'Positiivisia'} number={this.getGoodPercentage(this.state)} unit={'%'} />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));