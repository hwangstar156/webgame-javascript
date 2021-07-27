const { useCallback } = require('react');
const React = require('react');
const {CLICK_CELL,SET_TURN} = require('./tictaetoe');

const Td = ({rowIndex,cellIndex,dispatch,cellData}) => {
    
    const onClickTd = useCallback(() =>{
        console.log('click');
        if(cellData){
            return;
        }
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
        
    },[cellData]);

    return (
        <td onClick = {onClickTd}>{cellData}</td>
    )
}

module.exports = Td;