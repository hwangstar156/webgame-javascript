const React =require('react');

class Test extends React.PureComponent {
    state={
        counter:0
    };  
    
    onClick =() =>{
        this.setState({});
    }
    render(){
        console.log('렌더링',this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

module.exports = Test;