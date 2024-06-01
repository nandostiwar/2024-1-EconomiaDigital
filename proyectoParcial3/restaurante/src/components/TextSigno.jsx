import './styles/TextSigno.css';

function TextSigno({texto}){
    return (
        <textarea id="textoSigno" value={texto} cols="50" rows="10">

        </textarea>
    )
}

export default TextSigno;