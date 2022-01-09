import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Topbar } from '../components/Topbar';

const navbarActive = {
  dashboard: 0,
  discover: 0,
  nft: 1,
  dao: 0,
  learn: 0,
  about: 0,
  help: 0
};

function NFT() {

  return (
    <div className="main">
      <div className="dynamic-main">
        <Navbar active={navbarActive}/>
        <div className="container redbox">
          <Topbar/>
          <div>
            NFT
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default NFT;