import Image from "next/image";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_API;

export default function Home() {
  const [cityName, setCityName] = useState<string>();
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [fiveDaysWeather, setFiveDaysWeather] = useState<IFiveDays>();
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");


  async function fetchData() {

    try {
      const resCurrentWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
      const resFiveDaysWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
      
      if(!resCurrentWeather.ok || !resFiveDaysWeather.ok) {
        throw new Error(`Could not find city by name ${cityName}`);
      }
    
      const currentWeatherData = await resCurrentWeather.json();
      const fiveDaysWeather = await resFiveDaysWeather.json();

      setWeatherData(currentWeatherData);
      setFiveDaysWeather(fiveDaysWeather);
      setError(null);

      const date = new Date(currentWeatherData.dt * 1000);
      setLastUpdated(`${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`);
    } catch(error: any) {
      setError(error.message);
    }
  }

  const handleChange = (event: any) => {
    setCityName(event.target.value);
    setError(null);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault()
    fetchData();
  };

  const formatFix = (event: any) => {
    const date = new Date(event);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <header className="appName">
        <h1>Weather App</h1>
      </header>
      <main className={`flex flex-row items-center justify-between`}>
        <div className="currentWeather">
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Write city name" 
              value={cityName} 
              onChange={handleChange} 
              className="search"
            />
            <button type="submit"></button>
          </form>

          {error && <p>{error}</p>}

          {weatherData && (
            <div>
              <h2 className="forecastWeatherCityName">Weather in <span className="forecastCityName">{weatherData.name}</span></h2>
              <div className="currentWeatherMain">
                <div>
                  <Image
                    src={`icons/current/${weatherData.weather[0].icon}.svg`}
                    width={200}
                    height={100}
                    alt={weatherData.weather[0].main}
                  />
                </div>

                <div className="currentWeatherInfo">
                  <p className="currentWeatherTemp">{(weatherData.main.temp).toFixed(0)}<span className="forecastTemp">°C</span></p>
                  <p>{weatherData.weather[0].main}</p>
                  <p>Wind: {(weatherData.wind.speed * 3.6).toFixed(1)}km/h</p>
                </div>
              </div>

              <p>Last Updated: <br/> {lastUpdated}</p>
            </div>
          )}
        </div>

        <div className="fiveDays">
          <h1 className="fiveDaysHead">5-Day Forecast</h1>

          {/* Day 01 */}
          {fiveDaysWeather && (
            <div className="forecast">
              <div>
                <p className="forecastDate">{formatFix(fiveDaysWeather.list[0].dt_txt)}</p>
                <p className="forecastTemp">{(fiveDaysWeather.list[0].main.temp).toFixed(1)}<span>°C</span></p>                
              </div>

              <div>
                <Image
                  src={`icons/forecast/${fiveDaysWeather.list[0].weather[0].icon}.svg`}
                  width={40}
                  height={40}
                  alt={fiveDaysWeather.list[0].weather[0].main}
                />
                <p>{fiveDaysWeather.list[0].weather[0].main}</p>
              </div>

              <div className="forecastWeather">
                <p>{fiveDaysWeather.list[0].weather[0].description}</p>
                <p>Wind: {(fiveDaysWeather.list[0].wind.speed * 3.6).toFixed(1)}km/h</p>
              </div>
            </div>
          )}

          <br/>

          {/* Day 02 */}
          {fiveDaysWeather && (
            <div className="forecast">
              <div>
                <p className="forecastDate">{formatFix(fiveDaysWeather.list[8].dt_txt)}</p>
                <p className="forecastTemp">{(fiveDaysWeather.list[8].main.temp).toFixed(1)}<span>°C</span></p>                
              </div>

              <div>
                <Image
                  src={`icons/forecast/${fiveDaysWeather.list[8].weather[0].icon}.svg`}
                  width={40}
                  height={40}
                  alt={fiveDaysWeather.list[8].weather[0].main}
                />
                <p>{fiveDaysWeather.list[8].weather[0].main}</p>
              </div>

              <div className="forecastWeather">
                <p>{fiveDaysWeather.list[8].weather[0].description}</p>
                <p>Wind: {(fiveDaysWeather.list[8].wind.speed * 3.6).toFixed(1)}km/h</p>
              </div>
            </div>
          )}

          <br/>

          {/* Day 03 */}
          {fiveDaysWeather && (
            <div className="forecast">
              <div>
                <p className="forecastDate">{formatFix(fiveDaysWeather.list[16].dt_txt)}</p>
                <p className="forecastTemp">{(fiveDaysWeather.list[16].main.temp).toFixed(1)}<span>°C</span></p>                
              </div>

              <div>
                <Image
                  src={`icons/forecast/${fiveDaysWeather.list[16].weather[0].icon}.svg`}
                  width={40}
                  height={40}
                  alt={fiveDaysWeather.list[16].weather[0].main}
                />
                <p>{fiveDaysWeather.list[16].weather[0].main}</p>
              </div>

              <div className="forecastWeather">
                <p>{fiveDaysWeather.list[16].weather[0].description}</p>
                <p>Wind: {(fiveDaysWeather.list[16].wind.speed * 3.6).toFixed(1)}km/h</p>
              </div>
            </div>
          )}

          <br/>

          {/* Day 04 */}
          {fiveDaysWeather && (
            <div className="forecast">
              <div>
                <p className="forecastDate">{formatFix(fiveDaysWeather.list[24].dt_txt)}</p>
                <p className="forecastTemp">{(fiveDaysWeather.list[24].main.temp).toFixed(1)}<span>°C</span></p>                
              </div>

              <div>
                <Image
                  src={`icons/forecast/${fiveDaysWeather.list[24].weather[0].icon}.svg`}
                  width={40}
                  height={40}
                  alt={fiveDaysWeather.list[24].weather[0].main}
                />
                <p>{fiveDaysWeather.list[24].weather[0].main}</p>
              </div>

              <div className="forecastWeather">
                <p>{fiveDaysWeather.list[24].weather[0].description}</p>
                <p>Wind: {(fiveDaysWeather.list[24].wind.speed * 3.6).toFixed(1)}km/h</p>
              </div>
            </div>
          )}

          <br/>

          {/* Day 05 */}
          {fiveDaysWeather && (
            <div className="forecast">
              <div>
                <p className="forecastDate">{formatFix(fiveDaysWeather.list[32].dt_txt)}</p>
                <p className="forecastTemp">{(fiveDaysWeather.list[32].main.temp).toFixed(1)}<span>°C</span></p>                
              </div>

              <div>
                <Image
                  src={`icons/forecast/${fiveDaysWeather.list[32].weather[0].icon}.svg`}
                  width={40}
                  height={40}
                  alt={fiveDaysWeather.list[32].weather[0].main}
                />
                <p>{fiveDaysWeather.list[32].weather[0].main}</p>
              </div>

              <div className="forecastWeather">
                <p>{fiveDaysWeather.list[32].weather[0].description}</p>
                <p>Wind: {(fiveDaysWeather.list[32].wind.speed * 3.6).toFixed(1)}km/h</p>
              </div>
            </div>
          )}
          
        </div>
      </main>
      <footer className="footer">
        <p>Created by Giovana Birck</p>
      </footer>
    </>
  );
}
