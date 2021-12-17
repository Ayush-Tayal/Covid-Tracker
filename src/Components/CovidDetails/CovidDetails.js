import React, { useEffect, useState } from 'react'
import './CovidDetails.css'
import Select from 'react-select'

const CovidDetails = () => {
    const [details, setDetails] = useState({ });
    const [input, setInput] = useState("all");
    const [countries, setCountries] = useState([{
        value : "all",
        label : "World Wide"
    }])
    
    console.log("Input", input);

    const fetchData = async() => {
        const url =
            input === "all" ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${input}`

        try{
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key":
                    "c9a29aa22amshf1ee8eea420310cp120b54jsnd1e0a43599ee",
                },
            });
            
            const data  = await response.json();
            setDetails(data)
            // console.log("data", details) ;
            // console.log("recovered", details.recovered)
        }
        catch(err) {
            console.log("error",err);
        }
    }

    useEffect( () => {
        fetchData();
    }, [input])
    

    const fetchCountries = async() => {
        try{
            const response = await fetch("https://disease.sh/v3/covid-19/countries", {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key":
                    "c9a29aa22amshf1ee8eea420310cp120b54jsnd1e0a43599ee",
                },
            });
            
            const data  = await response.json();
            
            const temp = [];
            data.map((e) => {
                temp.push([{value:e.country, label:e.country}]);
            })
            setCountries(temp)
            // console.log("countries", countries);
        }
        catch(err){
            console.log("err", err)
        }
    }

    useEffect(() => {
        fetchCountries();
    }, [])    
    
    const handleIpChange = (e) => {
        console.log("click",e);
        // e.map((ele) => {
        //     setInput(ele.value);
        // })

    }
    
    return (
        <div className='covid-details'>
            
            <div className='covid-heading'>
                <h1> Covid-19 Tracker </h1>
            </div>
            
            <div className='select'>
                <Select
                    options = {countries}
                    defaultValue={{ label: "World Wide", value: "0" }}
                    onChange={handleIpChange}
                />
            </div>
            
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
