/*=== import the common packages ===*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row} from 'react-bootstrap';
import {MuiThemeProvider, TextField, RaisedButton, Snackbar, RadioButton, RadioButtonGroup} from 'material-ui';
/*=== import internal ===*/
import './styles.scss'; // import styles of register page
import {actions, types} from '../../../middle'; // call to actions & types (redux)
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};
class Register extends Component {
    // constructor: this is function to setup default states & call to the init functions
      constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            re_password: null,
            gender: 'male',
            fullname: null,
            msgStatus: false
        }
  }
    // componentWillMount: this function will called before render (lifecycle react)
    componentWillMount() {
        const {auth} = this.props;
        // redirect to list patient page if user authenticated
        if (auth.isLogged || JSON.parse(localStorage.getItem('auth'))) {
            this.props.router.push('patient');
        }
    }

    // handleRequestClose: this function will called to hidden a error message
    handleRequestClose() {
       this.setState({msgStatus: false});
    }

  // componentWillReceiveProps: this function will called when have a new props or prop received a new value (lifecycle react)
  componentWillReceiveProps(props) {
    const {auth} = props;

    if (auth !== undefined && auth.action !== null) {
        if (auth.action === types.auth.LOGGED_IN) {
            this.props.router.push('patient');
        }

        if (auth.action === types.auth.LOGGED_OUT) {
            console.log('logout');
        }

        if (auth.action === types.auth.LOGGED_ERROR) {
            console.log('LOGGED_ERROR');
        }

        if (auth.action === types.auth.REMEMBER_CHANGE) {
            this.setState({remember: auth.remember});
        }

        if(auth.error !== undefined) {
            this.setState({msgStatus: auth.error});
        }
    }
  }

  // onRegister: call to action register. this action defined in middle
  onRegister() {
    this.props.dispatch(actions.auth.register(this.state));
  }

  // onRememberChange: call to action remember. this action defined in middle
  onRememberChange(checked) {
    this.props.dispatch(actions.auth.rememberChange(checked));
  }

  // onChangeValue: this is function to handle the change of the inputs in form. we will set state again when the value changed
  onChangeValue(key, value) {
    this.setState({[key]: value});
  }

  onKeyPress = (event) => {
      if(event.key === 'Enter') {
         this.onRegister();
      }
  }

  // render: this is function to render all element of register page into dom
  render() {
    return (
        <MuiThemeProvider>
            <Grid className="form">
                <div className="form-register lbl-change-top">
                    <Snackbar
                          open={this.state.msgStatus}
                          message={this.props.auth.message || ''}
                          autoHideDuration={4000}
                          onRequestClose={() => this.handleRequestClose()}
                          bodyStyle={{'background' : '#dc4437', 'textAlign' : 'center'}}
                    />
                    <Row>
                        <h3 className="text-center">Sign Up</h3>
                    </Row>
                    <Row>
                        <TextField
                          className="input-border"
                          floatingLabelText="Full name"
                          multiLine={false}
                          fullWidth={true}
                          rows={1}
                          onChange={(event, value) => {this.onChangeValue('fullname', value)}}
                          onKeyPress={this.onKeyPress}
                        />
                    </Row>
                    <Row className="show-grid">
                        <RadioButtonGroup name="shipSpeed" defaultSelected="male" onChange={(event, value) => {this.onChangeValue('gender', value)}}>
                            <RadioButton
                                value="male"
                                label="Nam"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="female"
                                label="Nữ"
                                style={styles.radioButton}
                                
                            />
                        </RadioButtonGroup>
                    </Row>
                    <Row>
                        <TextField
                          className="input-border"
                          floatingLabelText="Username"
                          multiLine={false}
                          fullWidth={true}
                          rows={1}
                          onChange={(event, value) => {this.onChangeValue('username', value)}}
                          onKeyPress={this.onKeyPress}
                        />
                    </Row>
                    <Row>
                        <TextField
                          className="input-border"
                          floatingLabelText="Password"
                          multiLine={false}
                          fullWidth={true}
                          rows={1}
                          type={'password'}
                          onChange={(event, value) => {this.onChangeValue('password', value)}}
                          onKeyPress={this.onKeyPress}
                        />
                    </Row>
                    <Row>
                        <TextField
                          className="input-border"
                          floatingLabelText="Re-Password"
                          multiLine={false}
                          fullWidth={true}
                          rows={1}
                          type={'password'}
                          onChange={(event, value) => {this.onChangeValue('re_password', value)}}
                          onKeyPress={this.onKeyPress}
                        />
                    </Row>
                    <Row>
                        <RaisedButton
                            className="btn-save"
                            label="Register"
                            primary={true}
                            onTouchTap={() => {this.onRegister()}}
                        />
                        
                    </Row>
                </div>
            </Grid>
        </MuiThemeProvider>
    )
  }
}

// map data of redux
const mapStateToProps = (state) => {
  const {auth} = state

  return {
    auth
  };
}

// map the states to props to using in register page
export default connect(mapStateToProps)(Register)
