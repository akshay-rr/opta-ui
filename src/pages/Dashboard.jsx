import '../App.css';
import '../static/css/Dashboard.css';
import '../static/css/sidebar.css';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Topbar } from '../components/Topbar';

const navbarActive = {
  dashboard: 1,
  discover: 0,
  construct: 0,
  manage: 0,
  help: 0
};

function Dashboard() {

  return (
    <div class="main">
      <main>
        <Navbar active={navbarActive}/>
        <div className="container">
          <Topbar/>
          <div>
            Dashboard
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Dashboard;