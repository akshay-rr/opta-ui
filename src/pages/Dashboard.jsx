import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Topbar } from '../components/Topbar';
import { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext'

const navbarActive = {
  dashboard: 1,
  discover: 0,
  construct: 0,
  manage: 0,
  help: 0
};

function Dashboard() {
  const contextFunctions = useContext(AppContext);
  const state = contextFunctions.getState();

  useEffect(() => {
    console.log(state);
  });

  return (
    <div className="main">
      <div className="dynamic-main">
        <Navbar active={navbarActive}/>
        <div className="container redbox">
          <Topbar/>
          <div>
            Dashboard
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;