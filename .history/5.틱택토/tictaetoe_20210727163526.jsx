const { useState, useReducer, useCallback } = require('react');
const React = require('react');
const Table =require('./table');

const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const SET_TURN = 'SET_TURN';

const initialState = {
    winner : '',
    turn : 'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']
    ]
};

const reducer = (state,action) => {
    switch(action.type){
        case SET_WINNER:
            return {
                ...state,
                winner:action.winner
            };
        case CLICK_CELL : {
                const tableData = [...state.tableData];
                tableData[action.row] = [...tableData[action.row]];
                tableData[action.row][action.cell] = state.turn;
                console.log(tableData);
                console.log(state.tableData);
                return{
                    ...state,
                    tableData,
                };
        }
        case SET_TURN : {
            return {
                ...state,
                turn:state.turn ==='O' ? 'X' : 'O',
            }
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
            <Table onClick = {onClickTable} tableData = {state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}의 승리 </div>}
        </>
    )
}

module.exports = {TicTacToe,CLICK_CELL,SET_TURN};
