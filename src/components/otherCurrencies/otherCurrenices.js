import { useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '../../contexts/langContext';
import { pl, en } from './currencies';

export default function OtherCurrenices(props){
    const { lang } = useContext(LanguageContext)
    const currencies = lang === 'pl' ? pl : en;
    
    const translation = {
        'pl':{  
            title: 'Kursy walut PLN',
            countryName: 'Nazwa kraju',
            currencyName:'Nazwa waluty',
            exchangeRate: 'Kurs PLN',     
        },
        'en':{
            title: 'PLN Exchange Rates',
            countryName: 'Country Name',
            currencyName: 'Currency Name',
            exchangeRate:'PLN Exchange Rate'
        }
    }


    const exchangeRate = (currency) => {
            let value = props.value.PLN / props.value[currency];
            return value.toFixed(3);
    }

    return(
        <Container>
            <Title>{translation[lang].title}</Title>
            <Table>
                <Head>
                    <HeaderField>{translation[lang].exchangeRate}</HeaderField>
                    <HeaderField>Symbol</HeaderField>
                    <HeaderField>{translation[lang].currencyName}</HeaderField>
                    <HeaderField>{translation[lang].countryName}</HeaderField>
                </Head>
                {currencies.map(value => {
                    return(
                        <Row>
                            <Field style={{textAlign: 'center'}}>{exchangeRate(value.symbol)}</Field>
                            <Field style={{textAlign: 'center'}}>{value.symbol}</Field>
                            <Field>{value.name}</Field>
                            <Field>{value.country}</Field>
                        </Row>
                    )
                })}
                
            </Table>
        </Container>
    )
}

const Container = styled.section`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:100%;
    height:50vh;
    border:1px solid black;
`;

const Title = styled.h3`
    width: 100%;
    text-align: center;
`;

const Table = styled.div`
    width:100%;
    
`;

const Head = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);
`;

const HeaderField = styled.div`
    background: #5D8BF4;
    height:30px;
    &:nth-child(1){
        text-align: center;
    }
    &:nth-child(2){
        text-align: center;
    }
`;

const Row = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    &:nth-child(odd){
        background:#e0e0e0;
    }
    &:nth-child(even){
        background:#f7f7f5;
    }
`;

const Field = styled.div`
    border-bottom: 1px solid black;
    
`;