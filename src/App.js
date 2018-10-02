import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Button, DropDownButton, Box, Txt, Provider } from 'rendition';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    fetchData = async (url) => {
        await fetch(url)
            .then(data => data.text())
            .then(data => this.setState({ data: data }))
            .catch(err => console.log('Error: ' + err))
    }

    getCurrency = () => {
        this.fetchData('http://localhost:5000/api/currency')
    }

    render() {
        return (
            <Provider>
                <Box m={3}>
                    <DropDownButton mx={2} primary>
                        <div>AED</div>
                        <div>AFN</div>
                        <div>ALL</div>
                        <div>AMD</div>
                    </DropDownButton>
                    <Button primary onClick={this.getCurrency}>Get</Button>
                </Box>
                <Box m={3}>
                    <Txt mx={2}>{this.state.data}</Txt>
                </Box>
            </Provider>
        );
    }
}

export default App;
