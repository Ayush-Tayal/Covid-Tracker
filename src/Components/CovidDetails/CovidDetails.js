import React, { useEffect, useState } from 'react'
import './CovidDetails.css'

const CovidDetails = () => {
    const [details, setDetails] = useState({ });

    const fetchData = async () => {
        const response = await fetch(`https://disease.sh/v3/covid-19/all`)
        const data  = await response.json();
        setDetails(data)
        console.log("data", details) 
        // console.log("recovered", details.recovered)
    }

    useEffect(()=> {
        fetchData();
    }, [])


    return (
        <div className='covid-details'>
            <h1 className='covid-heading'>Covid-19 Tracker</h1>
            
            <select name="hi" id="" ><option value="jj">kk</option></select>

            <div className='c-data'>
                <div className='cases '>
                    <h2> Coronavirus Cases : </h2>
                    <p> {details.todayCases} </p>
                    <p> {details.cases} Total </p>
                </div>

                <div className='recovered'>
                    <h2> Recovered : </h2>
                    <p> {details.todayRecovered} </p>
                    <p>{details.recovered} Total </p>
                </div>

                <div className='deaths'>
                    <h2> Deaths : </h2>
                    <p> {details.todayDeaths} </p>
                    <p>{details.deaths} Total </p>
                </div>
            </div>



        </div>
    )
}

export default CovidDetails
