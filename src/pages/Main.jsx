import logo from '../static/svgs/metamask-fox.svg';
import '../App.css';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import ParcelDao from '../dao/ParcelDao';

function Main() {

  const contextFunctions = useContext(AppContext);
  console.log(contextFunctions);

  var login = async (walletAddress) => {
    var user = await ParcelDao.getUser(walletAddress);
    console.log("FETCHED USER");
    console.log(user);
    if (user.length > 0) {
      return user[0];
    }
    user = await ParcelDao.createUser({
      firstName: "TEST",
      lastName: "TEST",
      email: "TEST",
      walletAddress: walletAddress
    });
    return user[0];
  }

  var connectToEthereum = async () => {
    //Will Start the metamask extension
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Step 1: " + accounts[0]);
    const user = await login(accounts[0]);
    console.log("Step 2: ");
    console.log(user);
    contextFunctions.signIn(user);
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