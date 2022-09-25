import { useState } from "react";
import alfabeto from "./assets/alfabeto";
import palavras from "./assets/palavras";
import styled from 'styled-components';
import GlobalStyle from "./GlobalStyle";

function importAll(r) {
    return r.keys().map(r);
}
const imagensForca = importAll(require.context('./assets/img/', false, /\.(png)$/));

export default function App() {
    const [numErros, setNumErros] = useState(0)
    const [palavraEscolhida, setPalavraEscolhida] = useState("")
    const [corPalavraEmJogo, setCorPalavraEmJogo] = useState("black")
    const [letrasTestadas, setLetrasTestadas] = useState(alfabeto)
    const [chuteDesabilitado, setChuteDesabilitado] = useState(true)
    const [chute, setChute] = useState("")
    let palavraEscolhidaArray = palavraEscolhida.split("")
    let palavraEscondidaArray = palavraEscolhidaArray.map((l) => "_")
    let palavraEmJogo = [...palavraEscondidaArray]

    function iniciarJogo() {
        let novaPalavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
        setPalavraEscolhida(novaPalavra)
        console.log(novaPalavra)
        palavraEscolhidaArray = novaPalavra.split("")
        palavraEscondidaArray = novaPalavra.split("").map((l) => "_")
        console.log(palavraEscolhidaArray)
        console.log(palavraEscondidaArray)
        setNumErros(0)
        setLetrasTestadas([])
        setChuteDesabilitado(false)
        setCorPalavraEmJogo("black")
    }

    function checkLetra(l,index) {
        console.log(l)
        const letra = l.toUpperCase()
        if (palavraEscolhidaArray.includes(letra)) {
            console.log("Acertou a letra: ", letra)
            palavraEmJogo.map((l,index) => l===letra ? palavraEscolhidaArray[index] : palavraEmJogo[index])
        } else {
            console.log("A palavra não contém a letra: ", letra)
            setNumErros(numErros + 1)
        }
        setLetrasTestadas([...letrasTestadas,l])
    }

    function checkChute() {
        if (chute.toUpperCase() === palavraEscolhida) {
            console.log("Venceu!")
            setCorPalavraEmJogo("green")
        } else {
            console.log("Perdeu!")
            setCorPalavraEmJogo("red")
            setNumErros(6)
        }
        setChute("")
    }

    return (
        <Container>
            <GlobalStyle />

            <span>Jogo da Forca</span>

            <BotaoEscolherPalavra onClick={() => iniciarJogo()} data-identifier="choose-word">Escolher Palavra</BotaoEscolherPalavra>

            <Jogo>
                <img src={imagensForca[numErros].default} alt="Imagem da forca" data-identifier='game-image' />
                <PalavraEmJogo data-identifier='word' color={corPalavraEmJogo}>{palavraEscolhida==="" ? "Clique em 'Escolher Palavra' para jogar" : palavraEmJogo.join(" ")}</PalavraEmJogo>
            </Jogo>

            <Letras>{alfabeto.map(
                (l, index) =>
                    <BotaoLetra
                        key={index}
                        onClick={() => checkLetra(l,index)}
                        disabled={letrasTestadas.includes(l)}
                        data-identifier='letter'>
                        {l.toUpperCase()}
                    </BotaoLetra>
            )}</Letras>

            <Chute>
                <input
                    data-identifier='type-guess'
                    onChange={e => setChute(e.target.value)}
                    value={chute}
                    disabled={chuteDesabilitado}
                    placeholder="Já sei a palavra!"
                />
                <BotaoChutar
                    onClick={() => checkChute()}
                    disabled={chuteDesabilitado}
                    data-identifier='guess-button'>
                    Chutar
                </BotaoChutar>
            </Chute>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 700px;
    max-height: 95vw;
    width: 100%;
    height: 100%;
    font-size: 50px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
`
const BotaoEscolherPalavra = styled.button`
    background-color: #27AE60;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    height: 40px;
    min-height: 40px;
    width: 170px;
    margin-top: 35px;
    margin-bottom: 20px;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
      }
`
const Jogo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
        width: 350px;
        padding: 25px;
    }
`
const PalavraEmJogo = styled.span`
    font-size: 30px;
    font-weight: 500;
    font-family: 'Quicksand', sans-serif;
    color: ${(props) => props.color}
    margin: 20px;
`
const Letras = styled.div`
    display: grid;
    justify-content: space-around;
    grid-template-rows: repeat(2,40px);
    grid-template-columns: repeat(13,40px);
    align-content: space-around;
    width: 100%;
    height: 15vh;
    padding: 10px 50px;
`
const BotaoLetra = styled.button`
    width: 100%;
    height: 100%;
    background-color: #E1ECF4;
    color: #49799E;
    border-radius: 10px;
    border: 3px solid #49799E;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }
    &:disabled {
        filter: brightness(0.9);
        cursor: default;
    }
`
const Chute = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 50px;
    gap: 15px;
    font-size: smaller;

    input {
        width: 100%;
        height: 30px;
        font-weight: 100;
    }
`
const BotaoChutar = styled.button`
    background-color: #FF6C0C;
    color: #FFFFFF;
    border-radius: 5px;
    border: none;
    width: 110px;
    height: 30px;
    &:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }
    &:disabled {
        filter: brightness(0.9);
        cursor: default;
    }
`