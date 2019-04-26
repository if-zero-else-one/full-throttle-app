import React, { Component } from 'react';
//import SimpleSlider from './slider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import "bootstrap/dist/css/bootstrap.css"


const styles = {
    slider: {
      padding: '10px 0px',
    },
};

class App extends React.Component {
    state = {
        loan_value: 500,
        month_value: 6,
        interest_rate: 0.25,
        monthly_payment: 93.0,
        num_payments: 6
    };

    handleLoanChange = (event, loan_value) => {
        this.setState({loan_value});
        let url = 'https://ftl-frontend-test.herokuapp.com/interest?amount='+loan_value+'&numMonths='+this.state.month_value;
        console.log('url', url)
        fetch(url)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({interest_rate: data.interestRate})
            this.setState({monthly_payment: data.monthlyPayment.amount})
            this.setState({num_payments: data.numPayments})
            console.log('loan state', this.state)
            console.log('loan data', data)
        });
    }

    handleMonthChange = (event, month_value) => {
        this.setState({month_value})
        let url = 'https://ftl-frontend-test.herokuapp.com/interest?amount='+this.state.loan_value+'&numMonths='+month_value;
        console.log('url', url)
        fetch(url)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({interest_rate: data.interestRate})
            this.setState({monthly_payment: data.monthlyPayment.amount})
            this.setState({num_payments: data.numPayments})
            console.log('month state', this.state)
            console.log('month data', data)
        });
    }

    render() {
        const {classes} = this.props;
        return (
        <div align='center' className='container-fluid' style = {{width: '50%', alignItems:'center'}}>
            <div className='container-fluid' style ={{ marginBottom: 30}}>
            <p id="label" style = {{margin: '0px', padding: '0px'}}>Loan - <p style = {{fontSize: 30, margin: '0px', padding: '0px'}}>{this.state.loan_value}$</p></p>
            <Slider
            classes={{ container: classes.slider }}
            value={this.state.loan_value}
            min = {500}
            max = {5000}
            step = {1}
            aria-labelledby="label"
            onChange={this.handleLoanChange}
            />
            </div>

            <div className='container-fluid' style= {{marginBottom: 30}}>
            <p id="label" style = {{margin: '0px', padding: '0px'}}>Months - <p style = {{fontSize: 30, margin: '0px', padding: '0px'}}>{this.state.month_value}</p></p>
            <Slider
            classes={{ container: classes.slider }}
            value={this.state.month_value}
            min = {6}
            max = {24}
            step = {1}
            aria-labelledby="label"
            onChange={this.handleMonthChange}
            />
            </div>
            <div style= {{marginTop: 60}}>
                <p>Monthly Payment: <p style = {{fontSize: 30}}>{this.state.monthly_payment}$</p></p> 
                <p>Interest Rate: <p style = {{fontSize: 30}}>{this.state.interest_rate}</p></p>
                <p>Number of Payments: <p style = {{fontSize: 30}}>{this.state.num_payments}</p></p>
            </div>
        </div>    
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
  };
  
export default withStyles(styles)(App);