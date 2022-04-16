import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '../../contexts/langContext';

export default function Exchange(props){
    const [currency, setCurrency] = useState('PLN');
    const [currency2, setCurrency2] = useState('USD');
    const [amount, setAmount] = useState(0);
    const [payoff, setPayoff] = useState(0);
    const { lang } = useContext(LanguageContext)
    
    const title = {
        'pl': 'Wymiana waluty',
        'en': 'Currency Exchange'
    }
    const symbols = ['USD','EUR','PLN','GBP','CHF','HUF','UAH','CZK','NOK','SEK','HRK','BGN','RUB','BTC'];

    const currencyExchange = () => {
        if(amount > 0){
            if(currency === 'EUR'){
                let value = props.value[currency2] * amount;
                setPayoff(value.toFixed(2));
            } else {
                let value = props.value[currency2] / props.value[currency] * amount;
                setPayoff(value.toFixed(2));
            }
            
        } else setPayoff(0)
    }
    useEffect(() => {
        currencyExchange()
    },[amount])
    
    return(
        <PageContainer>
            <Container>
                <h2>{title[lang]}</h2>
                <Wrapper>
                    <ChangeCurrency value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        {symbols.map(x => {
                            return <option value={x}>{x}</option>
                        })}
                    </ChangeCurrency>
                    <ChangeCurrency value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
                        {symbols.map(x => {
                            return <option value={x}>{x}</option>
                        })}
                    </ChangeCurrency>
                </Wrapper>
                <Wrapper>
                    <Input
                        type='number'
                        placeholder='wpisz wartość'
                        min='0'
                        value={amount}
                        onChange={e => {
                            setAmount(e.target.value);
                        }}
                    />
                    <Output>{payoff}</Output>
                </Wrapper>
            </Container>
        </PageContainer>
    )
}

const PageContainer = styled.section`
    display:flex;
    justify-content:center;
    height:70vh;
    width:100%;
`;

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    margin-top:10vh;
    width:60vw;
    height:300px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0px 0px 1em -3px rgba(121, 128, 128, 1);
`;

const Wrapper = styled.div`
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
    width:100%;
    height:30px;
`;

const Input = styled.input`
    width:40%;
    height:30px;
    text-align:center;
    background: #5D8BF4;
    color: #fff;
    border:1px solid black;
    &::placeholder{
        color: #fff;
    }
`;

const Output = styled.div`
    width:40%;
    height:30px;
    background: #5D8BF4;
    color: #fff;
    text-align:center;
    border:1px solid black;
`;

const ChangeCurrency = styled.select`

`;

