import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import bat from "../static/images/basic-attention-token-bat-logo.png";
import link from "../static/images/chainlink-link-logo.png";
import { useState, useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext'
import ContractDao from '../dao/ContractDao'; 
import ReactLoading from 'react-loading';
import MoneyFormatUtils from '../utils/MoneyFormatUtils';
import ParcelAdapter from '../utils/ParcelAdapter';
import { Link } from 'react-router-dom';

export function ParcelCard(props) {

    const contextFunctions = useContext(AppContext);
    const state = contextFunctions.getState();
    const parcel = props.parcel;

    const [loading, setLoading] = useState(true);
    const [amounts, setAmounts] = useState(["0", "0"]);

    useEffect(() => {
        console.log('Parcel');
        console.log(parcel);
        const contract = new ContractDao(state);

        let tokenAddresses = parcel.getTokenAddresses();
        let tokenWeights = parcel.getTokenWeights();
        let tokenAmounts = parcel.getTokenAmounts();

        contract.getEstimate(tokenAddresses, tokenAmounts).then((netAmounts) => {
            setAmounts(netAmounts);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [loading]);

    const getTokenDetails = () => {
        return ParcelAdapter.getParcelTokenDetails(parcel);
    };

    return (
        <div className="card card-container" style={{width: 18+'rem'}}>
            {
                (loading) ?
                <ReactLoading type="bubbles" color="#1a1a1a" />:
                <div className="card-body">
                    <h5 className="card-title">{parcel.name}</h5>
                    <div className="card-text">
                        <div className="parcel-description">
                            {parcel.description}
                        </div>
                        <br/>
                        <div className="parcel-token-list">
                            <span className="mini-heading">Tokens ({parcel.tokens.length})</span> <br/>
                            <div className="parcel-token-image-container">
                                {
                                  parcel.tokens.map((token) => {
                                    return <img className="token-icon" src={token.tokenHeader.logo}/>
                                  })
                                }
                            </div>
                        </div>
                        <br/>
                        <div className="parcel-risk">
                            <div className="row">
                                <div className="col-sm">
                                    <span className="mini-heading">Risk</span> <br/>
                                    {parcel.risk}
                                </div>
                                <div className="col-sm">
                                    <span className="mini-heading">Unit Cost</span> <br/>
                                    {MoneyFormatUtils.getBaseConvertedDenomination(amounts[0])} ETH
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {/* <button className=' btn btn-dark' onClick={buyParcel}>Buy</button> */}
                    <Link to={{pathname: "/Discover/" + parcel.id, parcel: parcel}}>
                        <button className=' btn btn-dark'>View</button>
                    </Link>
                </div>
            }
        </div>
    );
}