import React from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h2>{country.name} {country.nativeName}</h2>
            <p>capital: {country.capital} </p>
            <p>population: {country.population} </p>
            <img src={country.flag} alt='flag' width="300" border='1' />
        </div>
    )
}

const CountryListItem = ({ country, onClick }) => {
    return (
        <tr onClick={onClick}><td id={country.name}>{country.name}</td></tr>
    )
}

const CountryList = ({ countries, onClick }) => {
    return (
        <table>
            <tbody>
                {countries.map(country => <CountryListItem key={country.alpha3Code} country={country} onClick={onClick} />)}
            </tbody>
        </table>
    )
}

const Countries = ({ countries, onClick }) => {
    if (countries.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    } else if (countries.length > 1) {
        return (
            <CountryList countries={countries} onClick={onClick} />
        )
    } else if (countries.length === 1) {
        return (
            <CountryDetails key={countries[0].alpha3Code} country={countries[0]} />
        )
    } else {
        return (
            <div />
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            countryFilter: '',
        }
    }

    componentDidMount() {
        axios
            .get('http://restcountries.eu/rest/v2/all?fields=name;nativeName;alpha3Code;capital;population;flag')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    handleCountryFilter = (event) => {
        const { target: { value } } = event
        this.setState({
            countryFilter: value
        })
    }

    setCountryFilter = (event) => {
        const { target: { id } } = event
        this.setState({
            countryFilter: id
        })
    }

    render() {
        const filteredCountries = this.state.countries.filter(country => country.name.search(new RegExp(this.state.countryFilter, 'i')) > -1)
        return (
            <div>
                find countries: <input value={this.state.countryFilter} onChange={this.handleCountryFilter} />
                <Countries countries={filteredCountries} onClick={this.setCountryFilter} />
            </div>
        )
    }
}

export default App
