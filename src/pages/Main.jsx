import logo from '../static/svgs/metamask-fox.svg';
import grid from '../static/images/grid1.gif';
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
    console.log("Step 1: " + accounts[0]);
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
        <img src={logo} className="App-logo" alt="logo" width="20" />
        <small>Connect</small>
      </button>
    );
  };

  var MissingWeb3Provider = () => {
    <h3>Please Install Metamask</h3>
  };

  return (
    <div id={'home-container'}>
        <div className="topbar"></div>
        <div id={'home-content'}>
            <div className='logo'>O P T A . F I N A N C E</div>
            {/* <div className='row'>
                <div className='col-4 home-content-child'>
                    Bulk Purchase
                </div>
                <div className='col-4 home-content-child'>
                    Save Gas 
                </div>
                <div className='col-4 home-content-child'>
                    ABCD
                </div>
            </div> */}
            <div className='row'>
              <img id={'grid-gif'} src={grid} width={30} />
            </div>
            <div id='subtitle'>
              <small>
                Enabling bulk purchase of cryptocurrencies
              </small>
            </div>
            <div className='row'>
                <div id={'button-container-row'} className='col-12'>
                  {
                    (typeof window.ethereum !== 'undefined') ? 
                    (contextFunctions.getAccount() === '0x0') ?
                    <ConnectToWeb3Button /> :
                    <ActiveAccountDetail /> :
                    <MissingWeb3Provider />
                  }
                </div>
            </div>
        </div>
    </div>
  );
}

export default Main;