import React, {useState} from 'react';
import './index.css';

const api = {
  key: "79f0172b1b48d3921c1cb1e091dde288",
  base: "https://api.openweathermap.org/data/2.5/weather"
}

function App() {
  const [query,setQuery] = useState("");
  const [weather,setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter"){
      fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery("");
        console.log(result)
      });
    }
  }

  const dateBuilder = (d) => {
    const MONTHS = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAYS = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    let day = DAYS[d.getDay()];
    let date = d.getDate();
    let month = MONTHS[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="logo">Beautiful Day Weather App</div>
        )}
      </main>    
    </div>
  );
}

export default App;
