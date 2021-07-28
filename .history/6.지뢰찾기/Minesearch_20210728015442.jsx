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
    dispatch: () => {},
});

const initialState ={
    tableData : [],
    timer:0,
    result:''
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
export const CLICK_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'OPEN_CELL';
export const QUESTION_CELL = 'OPEN_CELL';
export const NORMALIZE_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'OPEN_CELL';

const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME:{
            return{
                ...state,
                tableData: plantMine(action.row,action.cell,action.mine)
            };
        }
        case OPEN_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            console.log(tableData);
            return{
                ...state,
                tableData,
            };
        case CLICK_MINE:{

        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const value = useMemo(()=>
        ({tableData: state.tableData, dispatch})
    ,[state.tableData]);

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