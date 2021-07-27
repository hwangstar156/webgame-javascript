const React =require('react');
const ReactDom = require('react-dom');
const {TicTacToe} = require('./tictaetoe');
ReactDom.render(<TicTacToe /> , document.querySelector('#root'));