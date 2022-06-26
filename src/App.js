import './App.css';
import './static/css/sidebar.css';
import Web3 from 'web3';
import TruffleContract from '@truffle/contract';
import Contract from './contracts/Contract.json';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppContext from './contexts/AppContext';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Main from './pages/Main';
import NotFound from './pages/NotFound';;

function App() {
  
  const InitialAppState = {
    web3Provider: null,
    contracts: {},
    account: '0x0'   
  }

  InitialAppState.web3Provider = window.web3.currentProvider;

  InitialAppState.web3 = new Web3(InitialAppState.web3Provider);

  InitialAppState.mainContract = TruffleContract(Contract);
  InitialAppState.mainContract.setProvider(InitialAppState.web3Provider);

  InitialAppState.web3.eth.getAccounts((err, accounts) => {
    if(err === null) {
      InitialAppState.account = accounts[0];
    }
  });

  InitialAppState.web3.eth.getChainId().then((chainId) => {
    InitialAppState.chainId = chainId;
  });

  const [state, setState] = useState(InitialAppState);

  const contextFunctions = {
    signIn: (address) => {
      console.log('Signing in: ' + address);
      setState({
        ...state,
        account: address,
      });
    },
    getAccount: () => {
      return state.account;
    },
    getState: () => {
      return state;
    }
  }

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
            <Route exact path="/" component={Home} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Buy" component={Buy} />
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
