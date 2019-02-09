import React, {Component} from 'react'
import Display from '../display/display'
import Buttons from '../buttons/Buttons'
import Button from '../button/button'
import axios from 'axios'

class App extends Component {

    state = {
        firstNumber: [],
        secondNumber: [],
        operation: null,
    }


    requestResult = (operationDouble = null) => {
        const firstNumber = this.state.firstNumber.join('')
        const secondNumber = this.state.secondNumber.join('')
        let operation = null;
        switch (this.state.operation) {
            case '+':
                operation = 'add'
                break
            case '-':
                operation = 'sub'
                break
            case '/':
                operation = 'div'
                break
            case '*':
                operation = 'mul'
        }

        const reqUrl = `/calc?x=${firstNumber}&y=${secondNumber}&op=${operation}`

        axios.get(reqUrl).then((res) => res.data).then(data => {
            this.setState({firstNumber: [data.result], secondNumber: [], operation : operationDouble})
        }).catch(e => console.log(e))
    }




    handleClick = (e) => {
        const value = e.target.getAttribute("data-value")
        switch (value) {
            case 'clear':
                this.setState({operation: null, firstNumber: [], secondNumber: []})
                break
            default:
                if ((!Number.isNaN(Number.parseFloat(value)) || value === '.') && this.state.operation === null) this.setState({firstNumber: [...this.state.firstNumber, value]})
                if ((!Number.isNaN(Number.parseFloat(value)) || value === '.') && this.state.operation !== null) this.setState({secondNumber: [...this.state.secondNumber, value]})
                if (Number.isNaN(Number.parseFloat(value)) && value !== "equal" && value !== '.' && this.state.operation === null) this.setState({operation: value})
                if (value === 'equal') this.requestResult()
                if (Number.isNaN(Number.parseFloat(value)) && value !== "equal" && value !== '.' && this.state.operation !== null && this.state.secondNumber.length !== 0) this.requestResult(value)

        }
    }

    render() {
        return (
            <div className="App">
                <Display data={[this.state.firstNumber.join(''), this.state.operation, this.state.secondNumber.join('')]} />
                <Buttons>
                    <Button onClick={this.handleClick} label="C" value="clear" />
                    <Button onClick={this.handleClick} label="7" value="7" />
                    <Button onClick={this.handleClick} label="4" value="4" />
                    <Button onClick={this.handleClick} label="1" value="1" />
                    <Button onClick={this.handleClick} label="0" value="0" />

                    <Button onClick={this.handleClick} label="/" value="/" />
                    <Button onClick={this.handleClick} label="8" value="8" />
                    <Button onClick={this.handleClick} label="5" value="5" />
                    <Button onClick={this.handleClick} label="2" value="2" />
                    <Button onClick={this.handleClick} label="." value="." />

                    <Button onClick={this.handleClick} label="x" value="*" />
                    <Button onClick={this.handleClick} label="9" value="9" />
                    <Button onClick={this.handleClick} label="6" value="6" />
                    <Button onClick={this.handleClick} label="3" value="3" />
                    <Button label="" value="null" />

                    <Button onClick={this.handleClick} label="-" value="-" />
                    <Button onClick={this.handleClick} label="+" size="2" value="+" />
                    <Button onClick={this.handleClick} label="=" size="2" value="equal" />
                </Buttons>
            </div>
        )
    }
}

export default App