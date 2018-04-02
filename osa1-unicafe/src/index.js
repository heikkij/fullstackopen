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
        <tr><td>{title}</td><td>{number}</td><td>{unit}</td></tr>
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
        <table>
            <tbody>
            <Statistic title={'Hyvä'} number={state.good} />
            <Statistic title={'Neutraali'} number={state.neutral} />
            <Statistic title={'Huono'} number={state.bad} />
            <Statistic title={'Keskiarvo'} number={getAverage(state)} />
            <Statistic title={'Positiivisia'} number={getGoodPercentage(state)} unit={'%'} />
            </tbody>
        </table>
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

    setVote = (type) => {
        return () => {
            this.setState({
                [type]: this.state[type] + 1,
            })
        }
    }

    render() {
        return (
            <div>
            <Header text={'Anna palautetta'} />
            <Button text={'Hyvä'} handleClick={this.setVote('good')}/>
            <Button text={'Neutraali'} handleClick={this.setVote('neutral')} />
            <Button text={'Huono'} handleClick={this.setVote('bad')} />
            <Header text={'Statistiikka'} />
            <Statistics state={this.state} />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));