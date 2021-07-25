const React = require('react');
const Table =require('./table');

const TicTacToe = () => {
    return (
        <>
            <Table />
            {winner && <div>{winner}의 승리 </div>}
    )
}