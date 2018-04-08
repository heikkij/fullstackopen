import React from 'react'

const Yhteensa = ({ osat }) => {
    const sum = (acc, osa) => acc + osa.tehtavia
    return (
        <div>
            <p>yhteensä {osat.reduce(sum, 0)} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.tehtavia}</p>
        </div>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi.nimi}</h1>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi