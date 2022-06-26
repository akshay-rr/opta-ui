import '../App.css';
import '../index.css';
import {useState, useContext} from 'react';
import { getInitialTokenMap, tokenList } from '../constants/TokenMap';
import BuyContext from '../contexts/BuyContext';

const getSelectedTokens = (tokenMap) => {
    let s=0;
    Object.keys(tokenMap).forEach((token) => {
        if(tokenMap[token] > 0){
            s+=1;
        }
    });
    return s;
};

const getTokenMapFromSelectedTokens = (selectedTokens) => {
    let tokenMap = getInitialTokenMap();
    selectedTokens.forEach((token) => {
        tokenMap[token]=1;
    });
    return tokenMap;
}

const Step1 = () => {
    const buyContext = useContext(BuyContext);

    const [tokenMap, setTokenMap] = useState(getTokenMapFromSelectedTokens(buyContext.getSelectedTokens()));
    const [searchString, setSearchString] = useState('');
    const tokenOptions = tokenList.filter((token) => {
        return token.toLocaleLowerCase().startsWith(searchString.toLocaleLowerCase());
    });

    const setTokenState = (token, status) => {
        let newTokenMap = {...tokenMap}
        newTokenMap[token]=status?1:0;
        setTokenMap(newTokenMap);
    };

    const moveToStep2 = () => {
        const selectedTokens = Object.keys(tokenMap).filter((token) => {
            return tokenMap[token] > 0;
        });
        buyContext.setSelectedTokens(selectedTokens);
        buyContext.nextStep();
    }

    return (
        <div id={'setp1-container'}>
            <div id={'step1-header'}>
                <div>Step 1</div>
                <div>{getSelectedTokens(tokenMap)} selected</div>
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

            {/* <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Token</span>
                <input 
                    type="text" 
                    class="form-control" 
                    aria-label="Sizing example input" 
                    aria-describedby="inputGroup-sizing-sm"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                />
            </div> */}

            <div>
                {
                    tokenOptions.map((token) => {
                        return (
                            <div className='tokenOption'>
                                <input 
                                    type="checkbox" 
                                    id={token} 
                                    onChange={(e) => setTokenState(token, e.currentTarget.checked)} 
                                    checked={tokenMap[token]}/>
                                <label for={token}>{token}</label>
                            </div>
                        )
                    })
                }
            </div>
            <br/>
            <div className='row'>
                <div className='col'></div>
                <div className='col'></div>
                <div className='col' id='next-step'>
                    <button 
                        className='btn btn-sm btn-dark' 
                        disabled={getSelectedTokens(tokenMap) <= 0}
                        onClick={moveToStep2}
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step1;