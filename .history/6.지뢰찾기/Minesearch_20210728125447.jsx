import { createContext, useMemo, useReducer } from 'react';
import React from 'react';
import Form from './Form';
import Table from './table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE:-5,
    CLICKED_MINE: -6,
    OPENED:0,
}

export const TableContext = createContext({
    tableData:[],
    halted:true,
    dispatch: () => {},
});

const initialState ={
    tableData : [],
    timer:0,
    result:'',
    halted:true,
};

const plantMine = (row, cell, mine) => {
    console.log(row,cell,mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row*cell-mine) {
        const chosen = candidate.splice(Math.floor( Math.random()* candidate.length),1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i=0; i<row;i++){
        const rowData = [];
        data.push(rowData);
        for(let j=0;j<cell;j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for (let i=0; i<shuffle.length;i++){
        const ver = Math.floor(shuffle[i]/cell);
        const hor = shuffle[i]%cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const CLICK_MINE = 'CLICK_MINE';

const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME:{
            return{
                ...state,
                tableData: plantMine(action.row,action.cell,action.mine),
                halted:false,
            };
        }
        case OPEN_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            let around = [];
            if(tableData[action.row -1]){
                around.push(
                    tableData[action.row-1][action.cell],
                    tableData[action.row-1][action.cell-1],
                    tableData[action.row-1][action.cell+1]
                );
            }
            around.push(
                tableData[action.row][action.cell -1],
                tableData[action.row][action.cell +1],
            );
            if(tableData[action.row +1]){
                around.push(
                    tableData[action.row +1][action.cell],
                    tableData[action.row +1][action.cell-1],
                    tableData[action.row +1][action.cell+1],
                )
            }
            console.log(around);
            const count = around.filter((v)=>[CODE.FLAG_MINE,CODE.QUESTION_MINE,CODE.MINE].includes(v));
            tableData[action.row][action.cell] = count;
            console.log(count);
            
            return{
                ...state,
                tableData,
            };
        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted:true,
            }
        }
        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const {tableData,halted,timer,result} = state;
    const value = useMemo(()=>
        ({tableData, dispatch,halted})
    ,[tableData,halted]);

    return (
        <TableContext.Provider value = {value} >
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;