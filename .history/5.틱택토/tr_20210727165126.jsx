const React = require('react');
const Td = require('./td');

const Tr = ({rowData,rowIndex,dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td,i) => (
                console.log(rowData[i]),
            <Td dispatch ={dispatch} rowIndex={rowIndex} cellIndex={i} cellData = {rowData[i]}>{''}</Td>
            ))}
        </tr>
    );
};

module.exports = Tr;