const { useState, useReducer, useCallback } = require('react');
const React = require('react');
const Table =require('./table');
const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const initialState = {
    winner : '',
    turn : 'O',
    tableData:[['','',''],['','',''],['','','']]
};

const reducer = (state,action) => {
    switch(action.type){
        case SET_WINNER:
            return {
                ...state,
                winner:action.winner
            };
        case CLICK_CELL :
            return{
                ...state,

            }
    }
};

const TicTacToe = () => {
    const [state,dispatch] = useReducer(reducer , initialState);
    // const [winner,setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData ,setTableData] = useState([['','',''],['','',''],['','','']])

    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER , winner:'O'})
    },[]);
    
    return (
        <>
            <Table onClick = {onClickTable} tableData = {state.tableData}/>
            {state.winner && <div>{state.winner}의 승리 </div>}
        </>
    )
}

module.exports = TicTacToe;