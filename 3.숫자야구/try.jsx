const { PureComponent, memo } = require('react');
const React = require('react');

// class Try extends PureComponent{
//     render(){
//         const {value} = this.props;
//         return (
//             <li>
//                 <div>{value.try}</div>
//                 <div>{value.result}</div>
//             </li>
//         );
//     }
// }

const Try =memo(({value}) => {
    return (
        <li>
            <div>{value.try}</div>
            <div>{value.result}</div>
        </li>
    )
})

module.exports=Try;