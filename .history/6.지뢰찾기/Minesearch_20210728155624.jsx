import { createContext, memo, useEffect, useMemo, useReducer } from 'react';
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
    data:{
        row:0,
        cell:0,
        mine:0,
    },
    timer:0,
    result:'',
    halted:true,
    openedCount:0,
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
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
let checked = [];
let cnt = 0;
const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME:{
            checked = [];
            cnt =0;
            return{
                ...state,
                data:{
                    row:action.row,
                    cell:action.cell,
                    mine:action.mine
                },
                tableData: plantMine(action.row,action.cell,action.mine),
                halted:false,
                openedCount:0,
                result: '',
                timer: 0,
            };
        }
        case OPEN_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            tableData.forEach((row,i)=>{
                tableData[i] = [...state.tableData[i]];
            });
            cnt= 0;
            const checkAround = (row,cell) =>{
                if([CODE.OPENED,CODE.FLAG,CODE.QUESTION,CODE.QUESTION_MINE,CODE.FLAG_MINE].includes(tableData[row][cell])){
                    return;
                }
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    return;
                }
                if(checked.includes(`${row},${cell}`)){
                    return;
                }else{
                    checked.push(`${row},${cell}`);
                }
                console.log(checked);
                cnt += 1;
                let around = [];
                if(tableData[row -1]){
                    around.push(
                        tableData[row-1][cell],
                        tableData[row-1][cell-1],
                        tableData[row-1][cell+1]
                    );
                }
                around.push(
                    tableData[row][cell -1],
                    tableData[row][cell +1],
                );
                if(tableData[row +1]){
                    around.push(
                        tableData[row +1][cell],
                        tableData[row +1][cell-1],
                        tableData[row +1][cell+1],
                    )
                }
                const count = around.filter((v)=>[CODE.FLAG_MINE,CODE.QUESTION_MINE,CODE.MINE].includes(v));
                tableData[row][cell] = count.length;

                if(count.length === 0){
                    const near = [];
                    if( row - 1 > - 1 ){
                        near.push([row -1 ,cell -1]);
                        near.push([row -1 ,cell]);
                        near.push([row -1 ,cell +1]);
                    }
                    near.push([row ,cell -1]);
                    near.push([row ,cell +1]);
                    if(row + 1 < tableData.length){
                        near.push([row +1 ,cell -1]);
                        near.push([row +1 ,cell]);
                        near.push([row +1 ,cell +1]);
                    }
                    near.filter(v => !!v[0]).forEach((n)=>{
                        checkAround(n[0],n[1]);
                    })
                }else{

                }
            };
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            console.log(state.openedCount , cnt);
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + cnt){
                halted = true;
                result = '승리';
            }
            return{
                ...state,
                tableData,
                openedCount: state.openedCount+cnt,
                halted,
                result,
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
        case INCREMENT_TIMER :{
            return {
                ...state,
                timer : state.timer +1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = memo(() => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const {tableData,halted,timer,result} = state;
    const value = useMemo(()=>
        ({tableData, dispatch,halted})
    ,[tableData,halted]);
    useEffect(()=>{
        let timer;
        if(halted === false){
            timer = setInterval(()=>{
                dispatch({type:INCREMENT_TIMER});
            },1000);
        }
        return () =>{
            clearInterval(timer);
        }
    },[halted]);
    return useMemo(()=>(
        <TableContext.Provider value = {value} >
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    ),[timer]);
});

export default MineSearch;