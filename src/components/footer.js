import styled from 'styled-components';

export default function Footer(){

    return(
        <Container>
            <Span>Copyright © 2022</Span>
            <Span>Author Marek Drąg</Span>
        </Container>
    )
}

const Container = styled.footer`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap: wrap;
    width:100%;
    height:100px;
    background:grey;
`;

const Span = styled.span`
    width: 100%;
    text-align:center;
    color:#fff;
`;