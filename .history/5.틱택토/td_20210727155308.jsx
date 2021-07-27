const { useCallback } = require('react');
const React = require('react');
const {CLICK_CELL,SET_TURN} = require('./tictaetoe');

console.log(SET_TURN,CLICK_CELL);
const Td = ({rowIndex,cellIndex,dispatch,cellData}) => {
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
        dispatch({type:SET_TURN});
    },[]);

    return (
        <td onClick = {onClickTd}>{cellData}</td>
    )
}

module.exports = Td;