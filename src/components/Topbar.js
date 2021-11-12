import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';

import AppContext from '../contexts/AppContext'
import { useContext, useEffect, useState } from 'react';
import Web3Utils from '../utils/Web3Utils';

export function Topbar() {
    const contextFunctions = useContext(AppContext);
    const [chain, setChain] = useState("");

    const getChain = async () => {
        const chain = await contextFunctions.getState().web3.eth.getChainId();
        return chain;
    }

    useEffect(() => {
        getChain().then((chainId) => {
          setChain(chainId);
        });
    }, []);


    return (
        <div className="topbar">
            <div id="wallet-address">{contextFunctions.getAccount().substring(0, 10) + '..'}</div>
            <div id="network-id">
                <div class="circle"></div>
                <div class="network-name">
                    {
                    Web3Utils.getChainName(chain)
                    }
                </div>
            </div>
        </div>
    );
};