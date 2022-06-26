import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Exchange from './components/exchange';
import Header from './components/header';
import OtherCurrenices from './components/otherCurrencies/otherCurrenices';
import Footer from './components/footer';
import LanguageContext from './contexts/langContext';


function App() {
  const [currencyValues, setCurrencyValues] = useState([]);
  const [lang, setLang] = useState('pl')
  

  const getExchanges = async () => {
    // returns latest exchange of all currencies at the euro exchange rate
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=fe33b019d92fcf29167debd31e669d26';
    await axios.get(url)
    .then(res => {
        setCurrencyValues(res.data.rates);
    }).catch(error => {
        console.log(error);
    })
  }
  useEffect(() => {
      getExchanges()
  }, [])

  return (
    <LanguageContext.Provider value={{lang, setLang}}>
      <Header/>
      <Exchange value={currencyValues}/>
      <OtherCurrenices value={currencyValues}/>
      <Footer/>
    </LanguageContext.Provider>
  );
}

export default App;
