import React,{ Component } from 'react';


class GameMatcher extends Component{
    render(){
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('bye'));
        if(this.props.match.params.name === 'number-baseball'){
            return (
                <div>메롱</div>
            );
        };
        return (
            <div>응애</div>
        );
    }
}

export default GameMatcher;
