
import React, { useState } from "react";

const api ={
  key : "1398b40535bb51c1aeba3e4392f3199e",
  base: "http://api.openweathermap.org/data/2.5/",
}

function App() {

  const [city, setcity] = useState('');
  const [weather, setweather] = useState({});
  const search = (e) =>{
    if(e.key==="Enter"){
      fetch (`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setcity('');
        setweather(result);
        console.log(result);
      });
    }
  }
  const today= (d) =>{
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months= ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className= {(typeof weather.main !='undefined') ?
     ((weather.main.temp >15) ?
      'App warm' : 'App')
       : 'App'} >
      <main>
        <div className='searchcontainer'>
          <input type="text"
            placeholder='Search City...' className='searchbar'
            onChange={(e)=> setcity(e.target.value)}
            value = {city}
            onKeyPress={search}/>
        </div>
        {(typeof weather.main !='undefined') ?(
          <div className="location-container">
            <div className="city">
              {weather.name},{weather.sys.country}
            </div>
            <div className="date">
              {today(new Date())}
            </div>
            <div className="weather-container">
              <div className="temp">
                {Math.round(weather.main.temp)}℃
              </div>
              <div className="condition">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
