import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../contexts/AppContext'
import { Navbar } from '../components/Navbar';
import Web3Utils from '../utils/Web3Utils';

function Dashboard() {
  const contextFunctions = useContext(AppContext);
  const [chain, setChain] = useState("");
  const [parcels, setParcels] = useState([]);


  useEffect(() => {
    // getBaskets().then(() => {
    //   console.log('Success');
    // });
    // getChain().then((chainId) => {
    //   console.log("Chain: " + chainId);
    //   setChain(chainId);
    // });
  }, []);

  const navbarActive = {
    dashboard: 1,
    discover: 0,
    construct: 0,
    manage: 0,
    help: 0
  };

  return (
    <div class="main">
      <main>
        <Navbar active={navbarActive}/>
        <div className="container">
          <div className="topbar">
            <div id="wallet-address">{contextFunctions.getAccount().substring(0,10)+'..'}</div>
            <div id="network-id">
              {
                Web3Utils.getChainName(chain)
              }
            </div>
          </div>
          <div>
            Dashboard
          </div>
        </div>
      </main>
      <div className="footer">
        <span className="footer-text">O P T A . F I N A N C E</span>
      </div>
    </div>
  );
}

export default Dashboard;