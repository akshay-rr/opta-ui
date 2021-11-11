import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { ParcelCard } from '../components/ParcelCard';
import AppContext from '../contexts/AppContext'
import ParcelDao from '../dao/ParcelDao';
import { Navbar } from '../components/Navbar';
import Web3Utils from '../utils/Web3Utils';

function Discover() {
  const contextFunctions = useContext(AppContext);
  const [chain, setChain] = useState("");
  const [parcels, setParcels] = useState([]);

  // console.log(await window.ethereum.request({ method: 'eth_getChainId' }));

  useEffect(() => {
    getBaskets().then(() => {
      console.log('Success');
    });
    getChain().then((chainId) => {
      console.log("Chain: " + chainId);
      setChain(chainId);
    });
  }, []);

  const getBaskets = async () => {
    ParcelDao.getParcels().then((parcelList) => {
      setParcels(parcelList);
    }); 
  };

  const getChain = async () => {
    const chain = await contextFunctions.getState().web3.eth.getChainId();
    return chain;
  }

  const navbarActive = {
    dashboard: 0,
    discover: 1,
    construct: 0,
    manage: 0,
    help: 0
  };

  return (
    <div className="main">
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
            {
              parcels.map(item => {
                return (
                  <ParcelCard key={item.id} id={item.id} parcel={item}/>
                );
              })
            }
          </div>
        </div>
      </main>
      <div className="footer">
        <span className="footer-text">O P T A . F I N A N C E</span>
      </div>
    </div>
  );
}

export default Discover;