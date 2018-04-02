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

const Statistic = ({title, number, unit}) => {
    return (
        <div>{title} {number} {unit}</div>
    )
}

const Statistics = ({state}) => {
    const getFeedbacks = (state) => state.good + state.neutral + state.bad

    const getAverage = (state) => {
        if (getFeedbacks(state) > 0) {
            return ((state.good - state.bad) / getFeedbacks(state)).toFixed(1)
        } else {
            return 0
        }
    }

    const getGoodPercentage = (state) => {
        if (getFeedbacks(state) > 0) {
            return (state.good / getFeedbacks(state) * 100).toFixed(1)
        } else {
            return 0
        }
    }

    if (getFeedbacks(state) === 0) {
        return (
            <div>
                <em>Palautteita ei ole annettu</em>
            </div>
        )
    }

    return (
        <div>
            <Statistic title={'Hyvä'} number={state.good} />
            <Statistic title={'Neutraali'} number={state.neutral} />
            <Statistic title={'Huono'} number={state.bad} />
            <Statistic title={'Keskiarvo'} number={getAverage(state)} />
            <Statistic title={'Positiivisia'} number={getGoodPercentage(state)} unit={'%'} />
        </div>
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
            <Statistics state={this.state} />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));