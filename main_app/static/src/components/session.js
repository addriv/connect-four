import React from 'react';

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  onClickSubmit() {
    const { username, password } = this.state;
    this.props.submitSession(username, password);
  }

  onChangeInput(type) {
    return (event) => {
      this.setState({[type]: event.target.value });
    };
  }

  render() {
    return (
      <div id="signup">
        <label>Username</label>
        <input 
          type="text" 
          value={this.state.username} 
          onChange={this.onChangeInput('username')}
        />
        <label>Password</label>
        <input 
          type="text" 
          value={this.state.password} 
          onChange={this.onChangeInput('password')}
        />
        <button onClick={this.onClickSubmit}>Submit</button>
      </div>
    );
  }
}
