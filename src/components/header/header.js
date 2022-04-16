import { useContext } from 'react';
import styled from 'styled-components';
import LanguageContext from '../../contexts/langContext';

export default function Header(){
    const {lang, setLang} = useContext(LanguageContext)
    const title = {
        'pl': 'Kantor',
        'en': 'Cantor'
    }


    return(
        <Container>
            <Title>{title[lang]}</Title>
            <Nav>
                <Button onClick={() => setLang('pl')}><Img src='pl_flag.jpg'/></Button>
                <Button onClick={() => setLang('en')}><Img src='eng_flag.png'/></Button>
                
            </Nav>
        </Container>
    )
}

const Container = styled.header`
    display:flex;
    align-items:center;
    justify-content: center;
    width: 100%;
    height: 10vh;
    background-color: #5D8BF4;
    position:relative;
`;

const Title = styled.h1`
    color: #DFF6FF;
`;

const Nav = styled.nav`
    margin-left:90vw;
    height:10vh;
    width:4em;
    position:absolute;
    @media (max-width: 790px){
        margin-left:85vw;
    }
    @media (max-width: 530px){
        margin-left:80vw;
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    width: 20px;
    margin-right:10px;
    &:hover{
        opacity: 0.7;
    }
`;

const Img = styled.img`
    width: 20px;
`;