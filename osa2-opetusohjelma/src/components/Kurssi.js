import React from 'react'

const Yhteensa = (props) => {
    const sum = (acc, osa) => acc + osa.tehtavia
    return (
        <div>
            <p>yhteensä {props.kurssi.osat.reduce(sum, 0)} tehtävää</p>
        </div>
    )
}

const Osa = (props) => <p>{props.nimi} {props.tehtavia}</p>

const Sisalto = (props) => {
    return (
        <div>
            {props.kurssi.osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

export default Kurssi