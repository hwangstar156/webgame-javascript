import React, { useCallback, useContext } from 'react';
import { TableContext,CODE,OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './Minesearch';

const getTdStyle = (code) => {
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background:'#444',
            }
        case CODE.OPENED:
            return{
                background: 'white',
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return{
                background:'yellow',
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return{
                background:'tomato',
            }
        default:
            return{
                background:'white',
            }
    }
};

const getTdText =(code) =>{
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '🎏';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '❓';
        default:
            return '';
    }
}


const Td = ({rowIndex,cellIndex}) => {
    const {tableData,dispatch} = useContext(TableContext);
    
    const onClickTd = useCallback(()=>{
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
                dispatch({type:OPEN_CELL,row:rowIndex,cell:cellIndex});
                return;
            case CODE.MINE:
                dispatch({type:CLICK_MINE,row:rowIndex,cell:cellIndex});
                return;
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
        }
        
    },[])

    const onRightClickTd =useCallback((e)=>{
        e.preventDefault();
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL,row:rowIndex,cell:cellIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type:QUESTION_CELL,row:rowIndex,cell:cellIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type:NORMALIZE_CELL,row:rowIndex,cell:cellIndex});
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex]])

    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
        {getTdText(tableData[rowIndex][cellIndex])}</td>
    )
}

export default Td;