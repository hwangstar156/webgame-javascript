const { useCallback } = require('react');
const React = require('react');

const Td = ({rowIndex,cellIndex}) => {
    const onClickTd = useCallback(() =>{
        console.log(rowIndex,cellIndex);
    },[]);

    return (
        <td onClick = {onClickTd}>{''}</td>
    )
}

module.exports = Td;