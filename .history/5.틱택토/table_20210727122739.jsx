const React = require('react');
const Tr = require('./tr');
const Table = ({onClick,tableData}) => {
    return (
        <table>
            {Array(tableData.length).fill().map((tr,i) => (<Tr rowIndex = {i} rowData={tableData[i]}/>))}
        </table>
    );
};

module.exports = Table;