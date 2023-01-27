import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props){
        super(props)

        this.state = {
            isError: false
        }
    }

    static getDerivedStateFromError(error){
        return{
            isError: true
        }
    }
    
    componentDidCatch(error, info) {
		console.log(error)
		console.log(info)
	}

    render() {
        if(this.state.isError){
            return <h1> There is some Error</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary
