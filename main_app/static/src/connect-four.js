import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';
import Session from './components/session';
import axios from 'axios';

export default class ConnectFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 'signup', 
      loggedIn: false
    };

    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(username, password) {
    const uri = "/create-user";
    const user = { username, password };
    axios.get(uri, user).then((response) => {
      this.setState({ loggedIn: true });
    }).catch((errors) => {

    });
  }

  signup(username, password) {
    const uri ="/create-user";
    const user = { username, password };
    axios.post(uri, user).then((response) => {
      this.setState({ loggedIn: true });
    }).catch((errors) => {

    });
  }

  onClickSubmit(username, password) {
    const submit = this.state.session === 'login' ? this.login : this.signup;
    submit(username, password);
  }

  render() {
    const sessionProps = {
      state: this.state,
      submitSession: (username, password) => this.onClickSubmit(username, password)
    };

    const component = this.state.loggedIn ? <Game /> : <Session state={this.state} submitSession={this.onClickSubmit} />;
    return (
      <div id="connect-four">
        {component}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(
    <ConnectFour />, root
  );
});

