import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../contexts/AppContext'
import ParcelDao from '../dao/ParcelDao';
import ContractDao from '../dao/ContractDao';
import ReactLoading from 'react-loading';
import { Navbar } from '../components/Navbar';
import Web3Utils from '../utils/Web3Utils';
import { Link } from 'react-router-dom';
import MoneyFormatUtils from '../utils/MoneyFormatUtils';

function View(props) {
  const contextFunctions = useContext(AppContext);
  const state = contextFunctions.getState();
  const [chain, setChain] = useState("");
  const [parcel, setParcel] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const id = props.match.params.id;

  useEffect(() => {
    getBaskets().then(() => {
      setLoading(false);
    });
    getChain().then((chainId) => {
      setChain(chainId);
    });
  }, [loading]);

  const getBaskets = async () => {
    const parcelTemp = await ParcelDao.getParcelById(id);
    setParcel(parcelTemp);
  };

  const getChain = async () => {
    const chain = await contextFunctions.getState().web3.eth.getChainId();
    return chain;
  }

  const buyParcel = () => {
    setLoading(true);

    let tokenAddresses = parcel.getTokenAddresses();
    let tokenAmounts = parcel.getTokenAmounts();

    const contract = new ContractDao(state);
    contract.getEstimate(tokenAddresses, tokenAmounts, quantity).then((netAmounts) => {
      let totalCost = netAmounts[0];
      if(window.confirm("You are about to purchase " + quantity + " units of this basket for " + totalCost + ". Select OK to proceed")) {
        contract.purchaseParcel(tokenAddresses, tokenAmounts, quantity, totalCost).then((txn) => {
          ParcelDao.addTransaction(txn.tx, contextFunctions.getState().userId, id, Number(MoneyFormatUtils.getBaseConvertedDenomination(totalCost)), Number(quantity)).then((transaction) => {
            console.log(transaction);
            window.open(Web3Utils.getTransactionUrl(txn.tx));
          });
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        });
      } else{
        setLoading(false);
      }
    });
  };

  const quantityChange = (event) => {
    let value = event.target.value;
    if (Number(value) > 0) {
      setQuantity(Number(value));
    } else {
      setQuantity(0);
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
        <Navbar active={navbarActive} />
        <div className="container">
          <div className="topbar">
            <div id="wallet-address">{contextFunctions.getAccount().substring(0, 10) + '..'}</div>
            <div id="network-id">
              {
                Web3Utils.getChainName(chain)
              }
            </div>
          </div>
          {
            (loading) ?
              <ReactLoading type="bubbles" color="#1a1a1a" /> :
              <div>
                <br/>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={"/Discover"}>Discover</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{parcel.name}</li>
                  </ol>
                </nav>
                <br />
                <div class="container">
                  <h1 className="card-title">{parcel.name}</h1>
                  <div class="row">
                    <div class="col">
                      <div className="card-body">
                        <div className="card-text">
                          <div className="parcel-description-main">
                              {parcel.description}
                          </div>
                          <br/>
                          <div className="parcel-token-list">
                              <span className="mini-heading">Composition ({parcel.tokens.length})</span><br/>
                              <div className="parcel-token-image-container-main">
                                <table>
                                  <tbody>
                                    {
                                      parcel.tokens.map((token) => {
                                        return <tr key={token.id}>
                                          <td class="token-icon-container">
                                            <img className="token-icon" src={token.tokenHeader.logo}/>
                                          </td>
                                          <td>
                                            <span class="token-symbol">{token.tokenHeader.symbol}</span>
                                            <span class="token-name">{token.tokenHeader.name}</span>
                                          </td>
                                          <td>
                                            <span class="token-weight">{token.weight}</span>
                                          </td>
                                        </tr>
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                          </div>
                          <br/>
                        </div>
                        <br/>
                      </div>
                    </div>
                    <div class="col">
                      <div class="parcel-metadata">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <h3>{parcel.invested}<span class="smalltext">ETH</span></h3>
                                <span class="subheading">Invested</span>
                              </td>
                              <td>
                                <h3>{parcel.investors}</h3>
                                <span class="subheading">Investors</span>
                              </td>
                              <td>
                                <h3>{parcel.risk}</h3>
                                <span class="subheading">Risk Level</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <br/>
                      <div className="parcel-graph">
                        Parcel Graph Placeholder
                      </div>
                      <br/>
                      <div className="parcel-buy">
                          <input type="number" placeholder="Purchase Quantity" className="parcel-buy-input" onChange={quantityChange}/>
                          <button type="button" className="btn parcel-buy-button" onClick={buyParcel} disabled={quantity===0}>Buy</button>
                      </div>
                    </div>
                  </div>
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