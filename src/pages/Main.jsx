import logo from '../static/svgs/metamask-fox.svg';
import '../App.css';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { Link } from 'react-router-dom';

function Main() {

  const contextFunctions = useContext(AppContext);
  console.log(contextFunctions);

  var connectToEthereum = async () => {
    //Will Start the metamask extension
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    contextFunctions.signIn(accounts[0]);
  };


  var ActiveAccountDetail = () => {
    return (
      <Link to="/Dashboard">
        <button type="button" className="btn btn-dark enableEthereumButton">
          <h3>
            {contextFunctions.getAccount().substr(0,10)}
          </h3>
          <small>Go</small>
        </button>
      </Link>
    )
  };

  var ConnectToWeb3Button = () => {
    return (
      <button type="button" className="btn btn-dark enableEthereumButton" onClick={connectToEthereum}>
        <img src={logo} className="App-logo" alt="logo" width="50" />
        <br/>
        <small>Connect</small>
      </button>
    );
  };

  var MissingWeb3Provider = () => {
    <h3>Please Install Metamask</h3>
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          (typeof window.ethereum !== 'undefined') ? 
          (contextFunctions.getAccount() === '0x0') ?
          <ConnectToWeb3Button /> :
          <ActiveAccountDetail /> :
          <MissingWeb3Provider />
        }
      </header>
    </div>
  );
}

export default Main;