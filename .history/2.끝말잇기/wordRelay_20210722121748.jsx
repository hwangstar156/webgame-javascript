const React = require('react');
const {useState,useRef} = React;

const WordRelay = () => {
    const [word,setword] = useState('황정민');
    const [value,setValue] = useState('');
    const [result,setResult]=useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(word[word.length -1] === value[0]){
            setResult('딩동댕');
            setword(value);
        }else{
            setResult('떙');
        }
        setValue('');
    }


    const onChangeInput = (e) =>{
        setValue(e.target.value);
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput} />
                <button>click!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

module.exports = WordRelay;