const { memo } = require('react');
const React = require('react');
const Tr = require('./tr');
const Table = memo(({tableData,dispatch}) => {
    return (
        <table>
            {Array(tableData.length).fill().map((tr,i) => (
            <Tr dispatch={dispatch} rowIndex = {i} rowData={tableData[i]}/>
            ))}
        </table>
    );
});

module.exports = Table;