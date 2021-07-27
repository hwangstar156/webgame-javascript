const { memo } = require('react');
const React = require('react');
const Td = require('./td');

const Tr = memo(({rowData,rowIndex,dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td,i) => (
            <Td dispatch ={dispatch} rowIndex={rowIndex} cellIndex={i} cellData = {rowData[i]}>{''}</Td>
            ))}
        </tr>
    );
});

module.exports = Tr;