const { useCallback, memo } = require('react');
const React = require('react');
const {CLICK_CELL,SET_TURN} = require('./tictaetoe');

const Td = memo(({rowIndex,cellIndex,dispatch,cellData}) => {
    
    const onClickTd = useCallback(() =>{
        if(cellData){
            return;
        }
        dispatch({type:CLICK_CELL, row: rowIndex, cell:cellIndex});
        
    },[cellData]);

    return (
        <td onClick = {onClickTd}>{cellData}</td>
    )
})

module.exports = Td;