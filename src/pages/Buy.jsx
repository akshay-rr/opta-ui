import '../App.css';
import '../index.css';
import { Topbar } from '../components/Topbar';
import {useState} from 'react';
import Step1 from '../components/Step1';
import BuyContext from '../contexts/BuyContext';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';

function Buy() {
    const [step, setStep] = useState(1);
    const [selectedTokenMap, setSelectedTokenMap] = useState({});
    const [selectedTokens, setSelectedTokens] = useState([]);

    const contextFunctions = {
        getSelectedTokens: () => {
            return selectedTokens;
        },
        setSelectedTokens: (selectedTokenList) => {
            let newSelectedTokenMap = {}
            for (let i=0; i<selectedTokenList.length; i++) {
                let token = selectedTokenList[i];
                let tokenAlreadySelected = Object.keys(selectedTokenMap).includes(token);
                newSelectedTokenMap[token] = tokenAlreadySelected?selectedTokenMap[token]:0;
            }
            setSelectedTokens(selectedTokenList);
            setSelectedTokenMap(newSelectedTokenMap);
        },
        getSelectedTokenMap: () => {
            return selectedTokenMap;
        },
        nextStep: () => {
            if(step < 3) {
                setStep(step+1);
            }
        },
        previousStep: () => {
            if(step > 1) {
                setStep(step-1);
            }
        },
        setQuantityOfToken: (token, quantity) => {
            let newSelectedTokenMap = {...selectedTokenMap}
            newSelectedTokenMap[token] = quantity;
            setSelectedTokenMap(newSelectedTokenMap);
        },
        getQuantityOfToken: (token) => {
            return selectedTokenMap[token];
        }
    };

    return (
        <BuyContext.Provider value={contextFunctions}>
            <div id={'buy-container'}>
                <Topbar />
                <div id={'buy-content'}>
                    {
                        (step === 1)?
                        <Step1 />:
                        (step === 2)?
                        <Step2 />:
                        <Step3 />
                    }
                </div>
            </div>
        </BuyContext.Provider>
    );
}

export default Buy;