import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchIcon from './assets/search-icon-png-1.png';
import clearIcon from './assets/sunnny.png';
import cloudIcon from './assets/cloud-1.png';
import rainIcon from './assets/rain-1.png';
import snowIcon from './assets/snow-image.png';
import Humi from './assets/humidity-1.png';
import Wind from './assets/wind-1.png';

const WetherDetails = ({icon,temp,city,country,lat,long,humi,wind}) =>{
  return(
    <>
    <div className='images'>
      <img src={icon} alt="img"  />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='city'>{city}</div>
    <div className='country'>{country}</div>
    <div className='lat-long'>
       <div>
        <span className='lat'>latitude</span>
       <span>{lat}0</span>
       </div>
       <div>
        <span className='long'>longitude</span>
       <span>{long}0</span>
       </div>
    </div>
    <div className='data-container'>
      <div className='elemet'>
        <img src={Humi} alt="" srcset="" />
      <div className='data'>
        <span>{humi}%</span>
        <span></span>
      </div>
      </div>

      <div className='elemet'>
        <img src={Wind} alt="" srcset="" />
      <div className='data'>
        <span>{wind}km/h</span>
        <span></span>
      </div>
      </div>

      </div>      
    </>
  )
}
function App() {
  const apiKey = 'c2b743cbf361b21f369df1591913da27'; 
  const [icon,seticon] = useState(clearIcon);
  const [temp,setTemp] = useState();
  const [city,setCity] = useState("Salem");
  const [country,setCountry] = useState('IN');
  const [lat,setLat] = useState();
  const [long,setLong] = useState();
  const [humi,sethumi] = useState();
  const [wind,setWind] = useState();

  const [text,setText] = useState("Salem");
  const [citynotfound,setcity] = useState(false)
  const [loading,setloading] = useState(false);
  const [error,seterrror]  = useState(null);
  const WeatherIconMap = {
    "01d" : clearIcon,
    "01n": clearIcon,
     "02d": cloudIcon, 
     "02n": cloudIcon,
      "09d": rainIcon, 
      "09n": rainIcon, 
      "10d": rainIcon, 
      "10n": rainIcon, 
      "13d" : snowIcon, 
      "13n": snowIcon,
    
  }
  
  const fetchdata = async ()=>{
    setloading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    
    try{
      let res =await fetch(url);
      let data =await res.json();
      if(data ==="404"){
        setCity(true);
        setloading(false);
        return;
      }
      setTemp(Math.floor(data.main.temp));
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setCountry(data.sys.country)
      setCity(data.name)
      sethumi(data.main.humidity);
      setWind(data.wind.speed);
      const weathericoncode = data.Wether[0].icon;
      seticon(WeatherIconMap[weathericoncode]||clearIcon);
        
    }
    catch(error){
      seterrror("An Error Occuard");
    }
    finally{
      setloading(false);
    }
  }
  function handlecity(e){
     setText(e.target.value);
  }
  function handlekey(e){
    if(e.key === "Enter"){
      fetchdata();
      setText("")
    }

  }
  useEffect(()=>{
    fetchdata();
  },[])
  return (
   <>
   <div className="container">
      <div className='container-box'>
         <div className='input-box'>
           <input type='text' 
           value={text}
           placeholder='Enter Your City'
           onChange={handlecity}
           onKeyDown={handlekey}
           />
         </div>
         <div className='search-icon' onClick={()=>fetchdata()}>
           <img src={SearchIcon} alt="image"  />
         </div>
      </div>
      { loading &&<div className='cityloadin'>loading....</div>}
      {citynotfound &&<div className='citynotfound'>City Not Found</div>}
     {!loading && !citynotfound &&<WetherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humi={humi} wind={wind}/>}
      <div className='footer'>
          <p>Designed By Sun</p>
         </div>
   </div>
   </>
  )
}

export default App
