import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Button, DropDownButton, Input, Box, Txt, Provider } from 'rendition';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: '',
            selectOptions: []
        }
    }

    getURL = () => {
        return 'http://localhost:5000/api/currency'
    }

    componentDidMount() {
        this.setUpSelectControls(this.getURL())
    }

    setUpSelectControls = async (url) => {
        await fetch(url)
            .then(data => data.text())
            .then(data => {
                const json = JSON.parse(data)
                let options = []
                for (let c in json) {
                    options.push(c)
                }
                this.setState({ selectOptions: options })
            })
            .catch(err => console.log('Error: ' + err))
    }

    fetchData = async (url) => {
        await fetch(url)
            .then(data => data.text())
            .then(data => {
                const primaryCurrency = document.getElementById('primaryCurrency').value
                const secondaryCurrency = document.getElementById('secondaryCurrency').value
                const howMuch = document.getElementById('howMuch').value

                const json = JSON.parse(data)
                const rate = (json[secondaryCurrency] / json[primaryCurrency]) * howMuch

                this.setState({ rate: rate})
            })
            .catch(err => console.log('Error: ' + err))
    }

    handleGet = () => {
        this.fetchData(this.getURL())
    }

    // Add onChange in number input and cut if too long
    // Split form in smaller modules
    // Use rendition
    render() {
        return (
            <div className='mainContainer'>
                <div className='formContainer'>
                    <input type='number' defaultValue='1.00' id='howMuch' className='numberInput' />
                    
                    <select id='primaryCurrency' className='selectInput'>
                        {this.state.selectOptions.map((opt) => <option key={opt} value={opt}>{opt}</option> )}
                    </select>

                    <div id='equalSign'>=</div>

                    <input type='number' defaultValue={this.state.rate} placeholder='...' readOnly={true} className='numberInput' />

                    <select id='secondaryCurrency' className='selectInput'>
                        {this.state.selectOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>

                    <input type='button' onClick={this.handleGet} value="Get" className='buttonInput'/>
                </div>
                <div className='fotter'>
                    {this.state.rate}
                </div>
            </div>
        );
    }
}

export default App;
