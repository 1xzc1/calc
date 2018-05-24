import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        digits: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.'],
        inputValue: '',
        block: false,
        show: ''
    };

    buttonHandler = (digit) => {
        this.setState(prevState => {
            let val;
            let val1;
            if (prevState.inputValue === '' && digit === 0) {
                val = prevState.inputValue + digit.toString() + '.';
                val1 = prevState.show + digit.toString() + '.';
            } else {
                val = prevState.inputValue + digit.toString();
                val1 = prevState.show + digit.toString();
            }
            return {...prevState, inputValue: val, show: val1};

        });
    };
    getCalc = (mark) => {
        this.setState(prevState => {
            if (!prevState.block) {
                const val = prevState.inputValue + mark;
                return {...prevState, inputValue: val, block: true, show: ''};
            }
            return prevState;
        });
    };
    result = () => {
        this.setState(prevState => {
            let last = prevState.inputValue.toString().slice(-1);
            if (parseInt(last) || last === '') {
                return {...prevState, block: false, show: eval(prevState.inputValue)}
            }
        })
    };
    clear = () => {
        this.setState({inputValue: '', block: false, show: ''});
    };
    back = () => {
        if (this.state.inputValue === '0.') {
            this.setState({block: false, inputValue: '', show: ''})
        } else {
            this.setState({
                block: false, inputValue: this.state.inputValue.substring(0, this.state.inputValue.length - 1),
                show: this.state.inputValue.substring(0, this.state.inputValue.length - 1)
            });
        }
    };


    render() {
        return (
            <div className='App'>
                <div className='display'>{this.state.show}</div>
                <div>{
                    this.state.digits.map(digit => (
                        <button
                            key={digit}
                            onClick={() => this.buttonHandler(digit)}>{digit}
                        </button>
                    ))
                }
                    <button onClick={() => this.getCalc('+')}> +</button>
                    <button onClick={() => this.getCalc('-')}> -</button>
                    <button onClick={() => this.getCalc('*')}> *</button>
                    <button onClick={() => this.getCalc('/')}> /</button>
                    <button onClick={this.result}> =</button>
                    <button onClick={this.clear}> C</button>
                    <button onClick={this.back}> {'<'} </button>


                </div>
            </div>
        );


    }
}

export default App;


