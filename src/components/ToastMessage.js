import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';

import '../styles/toast-message.css';

class ToastMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      messages: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        show: true,
        messages: nextProps.errors
      });
    }
  }

  handleClose = () =>
    this.setState({
      show: false
    })

  render() {
    const { show, messages } = this.state;

    return (
      <Toast
        className="toast"
        delay={5000}
        autohide
        onClose={this.handleClose}
        show={show}
      >
        <Toast.Header />
        <Toast.Body className="toast-body">
          {
            messages.map(message => (
              <div key={message}>{message}</div>
            ))
          }
        </Toast.Body>
      </Toast>
    );
  }
}

export default connect(
  state => ({
    errors: state.errors.data
  })
)(ToastMessage);
