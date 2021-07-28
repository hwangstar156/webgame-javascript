import React from 'react';
import {BrowserRouter,HashRouter,Route, Link, Switch} from 'react-router-dom';
import {TicTacToe} from '../5.틱택토/tictaetoe';
import {MineSearch} from '../6.지뢰찾기/Minesearch';
import NumberBaseball from '../3.숫자야구/wordRelay';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
            &nbsp;
            <Link to="/game/index">게임매쳐</Link>
                <Switch>
                    <Route exact path = "/game/:name" component={GameMatcher} />
                    <Route path = "/game/number-baseball" component={GameMatcher} />
                    <Route path = "/game/number-baseball" component={GameMatcher} />
                    <Route path = "/game/number-baseball" component={GameMatcher} />
                    <Route path = "/game/number-baseball" component={GameMatcher} />
                    <Route path = "/game/number-baseball" component={GameMatcher} />
                </Switch>
        </BrowserRouter>
    );
};

export default Games;