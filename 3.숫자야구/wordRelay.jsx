const React = require('react');
const {useState} = require('react');
const Try = require('./try');

function getNumbers(){//숫자 4개 안겹치게 뽑는것!!
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i < 4; i +=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}



const NumberBaseball = () => {
    const [result,setResult] =useState('');
    const [value,setValue] = useState('');
    const [answer,setAnswer] = useState(getNumbers());
    const [trys,setTrys]=useState([]);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm=(e)=>{
        e.preventDefault();
        console.log(answer);
        if (value === answer.join('')){
            setResult('homerun!');
            setTrys((prevTries)=>{
                return [...prevTries , {try:value, result: '홈런!'}]
            })
            setTimeout(()=>{
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTrys([]);
                setResult('');
            },0)
        }else{
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike=0;
            let ball=0;
            if(trys.length >=9){
                setResult(`실패!! 답은${answer.join('')} `);
                setTimeout(()=>{
                    alert('게임을 다시 시작합니다.');
                    setAnswer(getNumbers());
                    setTrys([]);
                    setResult('');
                },0)
            }else{
                answerArray.map((v,i)=>{
                    if(answer[i] === v){
                        strike+=1
                    }else if(answer.includes(v)){
                        ball+=1
                    }
                })
                setTrys((prevTries)=>{
                    return [...prevTries, {try:value , result:`${strike}스트라이크 ${ball} 볼`}]
                })
                setResult(`${strike}스트라이크 ${ball} 볼`)
            }
            setValue('');
        }
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도: {trys.length}</div>
            <ul>
                {trys.map((v,i)=>{
                    return (
                        <Try key={`${i+1}차 시도`} value={v} index={i} />
                    );
                })}
            </ul>
        </>
    )
}


module.exports=NumberBaseball;