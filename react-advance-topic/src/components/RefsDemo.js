import React, { Component } from 'react'

class RefsDemo extends Component {
    constructor(props){
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount(){
        this.inputRef.current.focus();
        console.log(this.inputRef)
    }

    handleClick = () =>{
        alert(this.inputRef.current.value)
    }

    render() {
        return (
            <div>
                <input text="text" ref={this.inputRef} />
                <button onClick={this.handleClick}>Click Here </button>
            </div>
        )
    }
}

export default RefsDemo
