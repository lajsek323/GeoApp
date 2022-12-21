import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup  } from "react-simple-maps";
import { Annotation } from "react-simple-maps";
import  {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Popup from 'reactjs-popup';
import './styles.css';

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";



const App = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [isWinner, setIsWinner] = useState(false); 
  const [guess, setGuess] = useState('');
 
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const countries = ['Zambia', 'Yemen', 'Poland']; 
  const countries2 = ['Zambia']; 
  countries.push('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 
  'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 
  'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 
  'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Côte d'Ivoire", 
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
   'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 
   'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 
   'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 
   'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino')

    const [selectedCountry, setSelectedCountry] = useState(countries[Math.floor(Math.random() * countries.length)]); // wybieramy losowe pa
    const [numCorrect, setNumCorrect] = useState(0); 
    const [isWrong, setIsWrong] = useState(false);

  const handleGuess = (event) => {
    if (guess === selectedCountry) {
      event.preventDefault();
      setIsWinner(true); 
      setSelectedCountry(countries[Math.floor(Math.random() * countries.length)])
      setNumCorrect(numCorrect + 1); 
      setGuess('')
    }
    else{
      event.preventDefault();
      
      setIsWrong(true)
      setGuess('')
      openModal()
      
    }
  };
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [time, setTime] = useState(0)
  const openModal = () => {
    setModalIsOpen(true);
    setTime(timeLeft)
    setTimeLeft(0)
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    setNumCorrect(0); 
  };
console.log(selectedCountry)
console.log(isWrong)
  return (

    <> <div>

      <p className="benc"><b>Twój czas: {timeLeft} sekund</b></p>

   
       
       <div>
       {modalIsOpen && (
       <Modal
       isOpen={modalIsOpen}
       onRequestClose={closeModal}
       style={customStyles}
       ariaHideApp={false}
     >
       <h2>Przegrana</h2>
       <p>Przegrałeś, twoj wynik to: {numCorrect}</p>
       <p>Zgadłeś {numCorrect} państw w czasie {time} sekund</p>
       <button onClick={closeModal}>Zamknij</button>
     </Modal>
       )}
  
     </div>


    
    <div className="benc">
      <b>Ilość poprawnych odpowiedzi z rzędu: {numCorrect} </b>
    </div>
    <div>
    &nbsp;
    </div>
    <form className='search-bar' onSubmit={handleGuess}>
      <label>
      &nbsp; Zgadnij nazwe państwa:
        <input type="text" value={guess} onChange={(event) => setGuess(event.target.value)} />
      </label>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button type="submit">Zatwierdź</button>
    </form>
  </div><div>
        <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} 
              fill={geo.properties.name === selectedCountry ? '#F00' : 'grey'}/>

            ))}
          </Geographies>
          {location.name && (
          <Annotation
            subject={[location.longitude, location.latitude]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#FF5533",
              strokeWidth: 3,
              strokeLinecap: "round"
            }}
          >
            <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              {location.name}
            </text>
          </Annotation>
)}
</ZoomableGroup>
        </ComposableMap>
      </div></>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});

export default App;
