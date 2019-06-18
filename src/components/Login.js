import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { logIn } from '../redux/actions/auth';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
		super(props);
		this.state = {
			formData: {
        username: '',
        password: ''
      }
		}
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.token !== this.props.token) {
			this.props.history.push('/')
		}
  }

  editValue = e => {
		this.setState({
			formData: {
				...this.state.formData,
				[e.target.id]: e.target.value
			}
		})
  }

  handleForm = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", this.state.formData.username);
    formData.append("password", this.state.formData.password);
    this.props.logIn(formData);
  }

  render() {
    const {formData} = this.state;

    return (
      <div className="login-form">
        <Form onSubmit={this.handleForm}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control id="username" type="text" placeholder="Enter username" value={formData.username} required onChange={this.editValue} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id="password" type="password" placeholder="Enter password" value={formData.password} required onChange={this.editValue} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
	state => ({
		token: state.user.token,
	}),
	dispatch => ({
		logIn: data => {
			dispatch(logIn(data));
		}
	})
)(Login);
