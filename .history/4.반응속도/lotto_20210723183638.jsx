const React=require('react');
const {Component, useState, useRef, useEffect, useMemo} = require('react');
const Ball =require('./ball');


function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle=[]
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0])
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumbers,bonusNumber];
}

const Lotto = () =>{
    const [winBalls,setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers() , [winBalls]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus,setBonus] = useState(null);
    const [redo,setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect( () => {
        for(let i=0 ; i< winNumbers.length -1 ; i++){
            timeouts.current[i]=setTimeout(()=>{
                setWinBalls((prevwinBalls)=>{
                    return [...prevwinBalls , winNumbers[i]];
                })
            },(i+1)*1000);
        }
        timeouts.current[winNumbers.length -1]=setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        },7000)
        return () =>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            })
        }
    } , [timeouts.current]);//input이 빈배열일시 componentDidMount와 동일한 역할을 한다!!



    const onClickRedo =() =>{
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }

    return (
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v)=><Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한번더!</button>}
        </>
    );
};


module.exports = Lotto;