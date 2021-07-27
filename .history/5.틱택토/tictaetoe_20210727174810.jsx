const { useState, useReducer, useCallback, useEffect } = require('react');
const React = require('react');
const Table =require('./table');

const SET_WINNER = 'SET_WINNER';
const CLICK_CELL = 'CLICK_CELL';
const SET_TURN = 'SET_TURN';
const RESET_GAME = 'RESET_GAME';
const initialState = {
    winner : '',
    turn : 'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','',''],
    ],
    recentCell:[-1,-1],
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
                    tableData:tableData,
                    recentCell:[action.row,action.cell],
                };
        }
        case SET_TURN : {
            return {
                ...state,
                turn:state.turn ==='O' ? 'X' : 'O',
            }
        }
        case RESET_GAME : {
            return{
                ...state,
                turn : 'O',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ],
                recentCell:[-1,-1],
            }
        }
    }
};

const TicTacToe = () => {
    const [state,dispatch] = useReducer(reducer , initialState);
    const {winner,turn,tableData,recentCell} = state;
    console.log(turn);

    useEffect(()=>{
        const [row,cell] =recentCell;
        if(row<0){
            return;
        }
        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] ===turn){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] ===turn){
            win =true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win =true
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        if(win){
            dispatch({type:SET_WINNER, winner:turn});
        }else{
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all =false;
                    }
                })
            })
            if(all){
                dispatch({type:SET_WINNER,winner:})
            }else{
                dispatch({type:SET_TURN});
            }
        }
    },[tableData]);

    return (
        <>
            <Table tableData = {tableData} dispatch={dispatch}/>
            {winner && <div>{winner}의 승리 </div>}
        </>
    )
}

module.exports = {TicTacToe,CLICK_CELL,SET_TURN};
