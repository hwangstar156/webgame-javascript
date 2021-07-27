const { useCallback } = require('react');
const React = require('react');
const CLICK_CELL = require('./tictaetoe');
const SET_TURN = require('./tictaetoe');
console.log(CLICK_CELL,SET_TURN);
const Td = ({rowIndex,cellIndex,dispatch,cellData}) => {
    const onClickTd = useCallback(() =>{
        
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
        dispatch({type:SET_TURN});
    },[]);

    return (
        <td onClick = {onClickTd}>{cellData}</td>
    )
}

module.exports = Td;