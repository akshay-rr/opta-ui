import './App.css';
import './static/css/sidebar.css';
import Web3 from 'web3';
import TruffleContract from '@truffle/contract';
import Contract from './contracts/Contract.json';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Discover from './pages/Discover';

import AppContext from './contexts/AppContext';
import Dashboard from './pages/Dashboard';
import View from './pages/View';

function App() {
  
  const InitialAppState = {
    web3Provider: null,
    contracts: {},
    account: '0x0'    
  }

  if (typeof window.web3 !== 'undefined') {
    console.log('T1: ' + window.web3);
    InitialAppState.web3Provider = window.web3.currentProvider;
  } else {
    console.log('T2: ' + window.web3);
    InitialAppState.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }

  InitialAppState.web3 = new Web3(InitialAppState.web3Provider);

  InitialAppState.mainContract = TruffleContract(Contract);
  InitialAppState.mainContract.setProvider(InitialAppState.web3Provider);

  console.log('111');
  console.log(InitialAppState.mainContract);

  InitialAppState.web3.eth.getAccounts((err, accounts) => {
    if(err === null) {
      // console.log('Test');
      // console.log(accounts);
      InitialAppState.account = accounts[0];
    }
  });

  const [state, setState] = useState(InitialAppState);

  const contextFunctions = {
    signIn: (account) => {
      console.log('Signing in: ' + account);
      setState({
        ...state,
        account: account
      });
    },
    getAccount: () => {
      return state.account;
    },
    getState: () => {
      return state;
    }
  }

  console.log(state);

  const DisconnectedApp = () => {
    return (
      <AppContext.Provider value={contextFunctions}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  };

  const ConnectedApp = () => {
    return (
      <AppContext.Provider value={contextFunctions}>
        <Router>
          <Switch>
            <Route exact path="/" component={Discover} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Discover" component={Discover} />
            <Route exact path="/Discover/:id" component={View} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  };

  return (
    (state.account === '0x0') ? 
    <DisconnectedApp /> :
    <ConnectedApp />
  );
}

export default App;
