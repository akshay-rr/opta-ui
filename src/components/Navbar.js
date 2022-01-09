import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';

import AppContext from '../contexts/AppContext'
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const NavLink = (props) => {
    return (
        (props.active) ?
        <Link to={props.to} class="nav-link active active-screen" aria-current="page">
            {props.children}
        </Link> :
        <Link to={props.to} class="nav-link link-dark" aria-current="page">
            {props.children}
        </Link>
    )
}

export function Navbar(props) {
    const contextFunctions = useContext(AppContext);

    return (
        <div id="navbar-main" class="d-flex flex-column flex-shrink-0 p-3 redbox">
            <Link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none logo">
                <div id="logo"><span class="fs-6">O P T A</span></div>
            </Link>
            <br/>
            <ul class="nav nav-pills flex-column mb-auto">
                <li>
                    <NavLink to="/Dashboard" active={props.active.dashboard}>
                        <i class="bi bi-pie-chart me-2"></i>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Discover" active={props.active.discover}>
                        <i class="bi bi-bounding-box me-2"></i>
                        Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/NFT" active={props.active.nft}>
                        <i class="bi bi-grid me-2"></i>
                        NFT
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/DAO" active={props.active.dao}>
                        <i class="bi bi-bag-plus me-2"></i>
                        DAO
                    </NavLink>
                </li>
                <hr/>
                <li>
                    <NavLink to="#" active={props.active.learn}>
                        <i class="bi bi-bag-plus me-2"></i>
                        Learn
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#" active={props.active.about}>
                        <i class="bi bi-bag-plus me-2"></i>
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#" active={props.active.help}>
                        <i class="bi bi-bag-plus me-2"></i>
                        Help
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}