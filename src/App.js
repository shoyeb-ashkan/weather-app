import { useEffect, useState } from 'react';
import coldBG from './assets/cold.jpg'
import hotBG from './assets/hot.jpg'
import rainBG from './assets/rain.jpg'
import Descriptions from './components/Descriptions';
import { getFormattedData } from './WeatherSvc';

function App() {

  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric')
  const [city, setCity]=useState('Pune')
  const [bg, setBg]=useState(hotBG)
  


  useEffect(() => {
    const fetchWeatherData = async () => {

      const data = await getFormattedData(city, units)

      setWeather(data)
      const threshold= units==='metric'?20:60
    
      data.isRain?setBg(rainBG):data.temp<=threshold?setBg(coldBG):setBg(hotBG)
    };
    fetchWeatherData();

  }, [units, city])



  const setCityName=(e)=>{
    if(e.keyCode===13){
      setCity(e.target.value)
      e.target.blur()
    }
  }

  const handleUnitsClick=(e)=>{
    
    const button=e.currentTarget
    const isCelUnit=button.innerText.slice(1)==='C'
    button.innerText=isCelUnit?'°F':'°C'
    setUnits(isCelUnit?'metric':'imperial')

  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__input">
              <input type="text" name='city' placeholder='Enter City...' onKeyDown={setCityName} />
              <button onClick={e=>handleUnitsClick(e)} >°F</button>
            </div>


            <div className="section section__temp">
              <div className="desc">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={`${weather.iconURL}`} alt="weathericon" />
                <h3>{`${weather.description}`}</h3>
              </div>
              <div className="temp">
                <h1>{`${weather.temp.toFixed()}
                ${units === 'metric' ? '°C' : '°F'}
                `}</h1>
              </div>
            </div>

            {/* bottom Section */}
            <Descriptions weather={weather} tempUnit={units === 'metric' ? '°C' : '°F'} />

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
