const React =require('react');
const ReactDom = require('react-dom');
const TicTacToe = require('./tictaetoe');
console.log(TicTacToe);
ReactDom.render(<TicTacToe /> , document.querySelector('#root'));