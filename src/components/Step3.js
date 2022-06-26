import '../App.css';
import '../index.css';
import {useState, useContext, useEffect} from 'react';
import BuyContext from '../contexts/BuyContext';
import ContractDao from '../dao/ContractDao';
import tokenLibrary from '../constants/TokenLibrary';
import Constants from '../constants/Constants';
import MoneyFormatUtils from '../utils/MoneyFormatUtils';
import AppContext from '../contexts/AppContext';
import Web3Utils from '../utils/Web3Utils';

const Step3 = () => {
    const buyContext = useContext(BuyContext);
    const appContext = useContext(AppContext);

    const [searchString, setSearchString] = useState('');
    const contract = new ContractDao(appContext.getState());
    const selectedTokens = buyContext.getSelectedTokens();
    const selectedTokenMap = buyContext.getSelectedTokenMap();

    const [loadingEstimate, setLoadingEstimate] = useState(true);
    const [estimate, setEstimate] = useState(-1);

    const [loadingPurchaseResponse, setLoadingPurchaseResponse] = useState(false);

    const tokenAddresses = selectedTokens.map((token) => {
        return tokenLibrary[token].address;
    });

    const tokenAmounts = selectedTokens.map((token) => {
        const decimals = tokenLibrary[token].decimals;
        const multiplier = selectedTokenMap[token];
        const baseDecimalValue = Constants.getBaseDecimalValue(decimals);
        return MoneyFormatUtils.getTotalAmounts(multiplier, baseDecimalValue);
    });

    const filteredTokens = selectedTokens.filter((token) => {
        return token.toLocaleLowerCase().startsWith(searchString.toLocaleLowerCase());
    });

    useEffect(() => {
        console.log(tokenAddresses);
        console.log(tokenAmounts);
        contract.getEstimate(tokenAddresses, tokenAmounts, 1).then((estimate) => {
            console.log('Estimate: ' + estimate);
            setEstimate(estimate[0]);
            setLoadingEstimate(false);
        }).catch((e) => {
            setLoadingEstimate(false);
            console.log(e);
        });
    }, []);

    const purchaseSet = () => {
        setLoadingPurchaseResponse(true);
        contract.getEstimate(tokenAddresses, tokenAmounts, 1).then((estimate) => {
            let totalCost = estimate[0];
            contract.purchaseParcel(tokenAddresses, tokenAmounts, 1, totalCost).then((txn) => {
                window.open(Web3Utils.getTransactionUrl(txn.tx));
            }).catch((e) => {
                console.log('Purchase failed');
                throw e;
            });
        }).catch((e) => {
            console.log('Failure');
            console.log(e);
        }).finally(() => {
            setLoadingPurchaseResponse(false);
        });
    };

    return (
        <div id={'step2-container'}>
            <div id={'step2-header'}>
                <div>Step 3</div>
                <div>{buyContext.getSelectedTokens().length} selected</div>
            </div>
            <div class="form-floating mb-3">
                <input 
                    type="text" 
                    class="form-control" 
                    id="floatingInput" 
                    placeholder="BTC, LINK, etc."
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                />
                <label for="floatingInput">Tokens</label>
            </div>
            <div>
                {
                    filteredTokens.map((token) => {
                        return (
                            <div>
                                {token} {buyContext.getQuantityOfToken(token)}
                            </div>
                        )
                    })
                }
            </div>
            <br/>
            {
                (!loadingPurchaseResponse) ?
                <div>
                    Estimate
                    <div>
                        {
                            (loadingEstimate) ?
                            <div>Loading...</div>:
                            <div>{MoneyFormatUtils.getBaseConvertedDenomination(estimate)} ETH</div>
                        }
                    </div>
                </div>:
                <div>
                    Purhcasing
                </div>
            }
            <div className='row'>
                <div className='col' id='prev-step'>
                    <button className='btn btn-sm btn-dark' onClick={() => buyContext.previousStep()}>&larr;</button>
                </div>
                <div className='col'></div>
                <div className='col' id='next-step'>
                    <button 
                        className='btn btn-sm btn-dark' 
                        onClick={() => purchaseSet()}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step3;