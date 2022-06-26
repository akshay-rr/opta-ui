import '../App.css';
import '../index.css';
import {useState, useContext} from 'react';
import BuyContext from '../contexts/BuyContext';

const Step2 = () => {
    const buyContext = useContext(BuyContext);
    const [searchString, setSearchString] = useState('');

    const filteredTokens = buyContext.getSelectedTokens().filter((token) => {
        return token.toLocaleLowerCase().startsWith(searchString.toLocaleLowerCase());
    });

    const selectedTokens = buyContext.getSelectedTokens();
    const selectedTokenMap = buyContext.getSelectedTokenMap();

    const tokenAmounts = selectedTokens.map((token) => selectedTokenMap[token]);
    const validQuantities = areTokenAmountsValid(tokenAmounts);

    const moveToStep3 = () => {
        buyContext.nextStep();
    }

    return (
        <div id={'step2-container'}>
            <div id={'step2-header'}>
                <div>Step 2</div>
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
            {

            }
            <div>
                {
                    filteredTokens.map((token) => {
                        return (
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">{token}</span>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    aria-label="Sizing example input" 
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={buyContext.getQuantityOfToken(token)}
                                    onChange={(e) => {
                                        buyContext.setQuantityOfToken(token, Number(e.currentTarget.value))
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
            {
                (!validQuantities) &&
                <div id='step-2-error'>
                    Please enter non zero quantities for the selected tokens
                </div>
            }
            <br/>
            <div className='row'>
                <div className='col' id='prev-step'>
                    <button className='btn btn-sm btn-dark' onClick={() => buyContext.previousStep()}>&larr;</button>
                </div>
                <div className='col'></div>
                <div className='col' id='next-step'>
                    <button 
                        className='btn btn-sm btn-dark' 
                        disabled={!validQuantities}
                        onClick={moveToStep3}
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

const areTokenAmountsValid = (tokenAmounts) => {
    for(let i=0; i<tokenAmounts.length; i++) {
        if(tokenAmounts[i] <= 0) {
            return false;
        }
    }
    return true;
};

export default Step2;