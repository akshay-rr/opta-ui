import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { useContext, useEffect, useState } from 'react';
import { ParcelCard } from '../components/ParcelCard';
import AppContext from '../contexts/AppContext'
import ParcelDao from '../dao/ParcelDao';
import { Navbar } from '../components/Navbar';
import { Topbar } from '../components/Topbar';
import Footer from '../components/Footer';

const navbarActive = {
  dashboard: 0,
  discover: 1,
  construct: 0,
  manage: 0,
  help: 0
};


function Discover() {
  const contextFunctions = useContext(AppContext);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    getBaskets().then(() => {
      console.log('Success');
    });
  }, []);

  const getBaskets = async () => {
    ParcelDao.getParcels().then((parcelList) => {
      setParcels(parcelList);
    }); 
  };

  return (
    <div className="main">
      <main>
        <Navbar active={navbarActive}/>
        <div className="container">
          <Topbar/>
          <div>
            {
              parcels.map(item => {
                return (
                  <ParcelCard key={item.id} id={item.id} parcel={item}/>
                );
              })
            }
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Discover;