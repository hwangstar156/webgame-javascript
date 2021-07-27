const { useCallback } = require('react');
const React = require('react');

const Td = ({rowIndex,cellIndex}) => {
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
    },[]);

    return (
        <td onClick = {onClickTd}>{''}</td>
    )
}

module.exports = Td;