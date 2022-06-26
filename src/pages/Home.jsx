import '../App.css';
import '../index.css';
import { Topbar } from '../components/Topbar';
import { Link } from 'react-router-dom';
import buy from '../static/images/buy.png';
import choice from '../static/images/choice.png';
import quantity from '../static/images/quantity.png';
import AppContext from '../contexts/AppContext';
import Constants from '../constants/Constants';
import { useContext } from 'react';
import Web3Utils from '../utils/Web3Utils';

function Home() {

    const contextFunctions = useContext(AppContext);
    const chain = Web3Utils.getChainName(contextFunctions.getState().chainId);

    return (
        <div id={'home-container'}>
            <Topbar />
            <div id={'home-content'}>
                <div className='logo'>O P T A . F I N A N C E</div>
                <div className='row'>
                    <div className='col-4 home-content-child'>
                        <img src={choice} width={50} className={'home-img'} />
                        <small>Select tokens</small>
                    </div>
                    <div className='col-4 home-content-child'>
                        <img src={quantity} width={50} className={'home-img'} />
                        <small>Choose quantity</small>
                    </div>
                    <div className='col-4 home-content-child'>
                        <img src={buy} width={50} className={'home-img'} />
                        <small>Purchase</small>
                    </div>
                </div>
                <div className='row'>
                    
                    <div id={'button-container-row'} className='col-12'>
                        {
                            (Constants.SUPPORTED_CHAIN_IDS.includes(Number(contextFunctions.getState().chainId))) ?
                            <Link to="/Buy">
                                <button className='btn btn-dark'>Let's Go</button>
                            </Link> :
                            <button className='btn btn-dark' disabled>Coming Soon</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;