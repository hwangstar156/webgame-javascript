const { useCallback } = require('react');
const React = require('react');
const { SET_TURN, CLICK_CELL } = require('./tictaetoe');

const Td = ({rowIndex,cellIndex,dispatch}) => {
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
        dispatch({type:SET_TURN});
    },[]);

    return (
        <td onClick = {onClickTd}>{''}</td>
    )
}

module.exports = Td;