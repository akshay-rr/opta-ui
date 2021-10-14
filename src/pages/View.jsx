import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import bat from "../static/images/basic-attention-token-bat-logo.png";
import link from "../static/images/chainlink-link-logo.png";
import { useContext, useEffect, useState } from 'react';
import AppContext from '../contexts/AppContext'
import ParcelDao from '../dao/ParcelDao';
import ContractDao from '../dao/ContractDao';
import MoneyFormatUtils from '../utils/MoneyFormatUtils';
import ParcelAdapter from '../utils/ParcelAdapter';
import ReactLoading from 'react-loading';
import { Navbar } from '../components/Navbar';
import Web3Utils from '../utils/Web3Utils';
import { Link } from 'react-router-dom';
import ParcelEstimateException from '../exceptions/ParcelEstimateException';

function View(props) {
  const contextFunctions = useContext(AppContext);
  const state = contextFunctions.getState();
  const [chain, setChain] = useState("");
  const [parcel, setParcel] = useState();
  const [loading, setLoading] = useState(true);
  const [amtLoading, setAmtLoading] = useState(true);
  const [amounts, setAmounts] = useState(["0", "0"]);
  const [quantity, setQuantity] = useState(1);
  const id = props.match.params.id;
  console.log('ID: ' + id);

  useEffect(() => {
    getBaskets().then(() => {
      console.log('Success');
      setLoading(false);
      getEstimate(quantity).then((netAmounts) => {
        setAmounts(netAmounts);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setAmtLoading(false);
      });
    });
    getChain().then((chainId) => {
      console.log("Chain: " + chainId);
      setChain(chainId);
    });
  }, [loading]);

  const getBaskets = async () => {
    const parcelsJsonList = await ParcelDao.getParcels();
    const parcels = ParcelAdapter.convertToParcelList(parcelsJsonList);
    const tempParcel = parcels.filter((entry) => {
        return String(entry.id) === String(id);
    });
    console.log("SELECTED PARCEL");
    console.log(tempParcel);
    setParcel(tempParcel[0]);
  };

  const getChain = async () => {
    const chain = await contextFunctions.getState().web3.eth.getChainId();
    return chain;
  }

  const buyParcel = () => {
    setLoading(true);
    const contract = new ContractDao(state);
    const quantities = parcel.weights.map((entry) => {
        return String(Number(quantity) * Number(entry));
    }); 
    contract.purchaseParcel(parcel.tokenAddresses, quantities, amounts[0]).then((netSpend) => {
        console.log(netSpend);
        alert(netSpend);
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        setLoading(false);
    });
  };

  const getEstimate = async (quantity) => {
    const contract = new ContractDao(state);
    const quantities = parcel.weights.map((entry) => {
        return String(Number(quantity) * Number(entry));
    }); 
    const netAmounts = await contract.getEstimate(parcel.tokenAddresses, quantities);
    return netAmounts;
  }

  const quantityChange = (value) => {
    setAmtLoading(true);
    if(Number(value) > 0) {
        setQuantity(Number(value));
        getEstimate(Number(value)).then((netAmounts) => {
            setAmounts(netAmounts);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setAmtLoading(false);
        })
        
    } else {
        setQuantity(0);
        setAmtLoading(false);
        setAmounts(["0", "0"])
    }
  }

  const navbarActive = {
    dashboard: 0,
    discover: 1,
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
          {
              (loading) ?
              <ReactLoading type="bubbles" color="#1a1a1a" />:
              <div>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={"/Discover"}>Discover</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{parcel.name}</li>
                  </ol>
                </nav>
                <br/>
                <div className="card-body">
                    <h5 className="card-title">{parcel.name}</h5>
                    <div className="card-text">
                        <div className="parcel-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum tempus orci ut fermentum mattis. Proin vulputate est sit amet bibendum rhoncus. 
                        </div>
                        <br/>
                        <div className="parcel-token-list">
                            <span className="mini-heading">Tokens ({parcel.tokenHeaders.length})</span> <br/>
                            <div className="parcel-token-image-container">
                                <img className="token-icon" src={bat}/>
                                <img className="token-icon" src={link}/>
                            </div>
                        </div>
                        <br/>
                        <div className="parcel-risk">
                            <span className="mini-heading">Risk</span> <br/>
                            2
                        </div>
                        <br/>
                        <div className="parcel-buy">
                            <input type="number" placeholder="quantity" /><br/>
                            <div class="parcel-cost">
                                <span className="mini-heading">Unit Cost</span> <br/>
                                {
                                    (amtLoading) ? 
                                    <ReactLoading type="bubbles" color="#1a1a1a" />:
                                    MoneyFormatUtils.getBaseConvertedDenomination(amounts[0]) + " ETH"
                                }
                            </div><br/>
                            <button type="button" class="btn btn-success" onClick={buyParcel} disabled={amounts[0]==="0"}>Purchase</button>
                        </div>
                    </div>
                    <br/>
                </div>
              </div>
          }
        </div>
      </main>
      <div className="footer">
        <span className="footer-text">O P T A . F I N A N C E</span>
      </div>
    </div>
  );
}

export default View;