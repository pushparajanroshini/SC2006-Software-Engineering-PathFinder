import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useHistory
} from 'react-router-dom';



import './App.css';
import Header from './header';
import Main from './Component';
import ManageWallet from './Wallet';
import Login from './Login';
import TripHist from './TripHistory';
import ManageProfile from './Profile';
import Register from './Register';
import Logout from './Logout';
import Current from './CurrentUser';
import ForgetPw from './ForgetPw';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<MainPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ManageProfile" element={<Profile />} />
          <Route path="/TripHistory" element={<TripHistory />} />
          <Route path="/ManageWalletBalance" element={<ManageWalletBalance />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Current" element={<Current />} />
          <Route path="/ForgetPw" element={<ForgetPw/>} />

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

const MainPage = () => {
  return (
    <iframe src="https://www.onemap.gov.sg/minimap/minimap.html?mapStyle=Default&zoomLevel=15&latLng=1.38111875111583,103.849736066713&ewt=JTNDcCUzRSUzQ3N0cm9uZyUzRVBsZWFzZSUyMGVudGVyJTIweW91ciUyMHRleHQlMjBpbiUyMHRoZSUyMGluJTIwdGhlJTIwUG9wdXAlMjBDcmVhdG9yLiUzQyUyRnN0cm9uZyUzRSUyMCUzQ2JyJTIwJTJGJTNFJTNDYnIlMjAlMkYlM0UlM0NpbWclMjBzcmMlM0QlMjJodHRwcyUzQSUyRiUyRnd3dy5vbmVtYXAuZ292LnNnJTJGd2ViLWFzc2V0cyUyRmltYWdlcyUyRmxvZ28lMkZvbV9sb2dvXzI1Ni5wbmclMjIlMjAlMkYlM0UlMjAlM0NiciUyMCUyRiUzRSUzQ2JyJTIwJTJGJTNFJTNDYSUyMGhyZWYlM0QlMjJodHRwcyUzQSUyRiUyRnd3dy5vbmVtYXAuZ292LnNnJTJGJTIyJTNFT25lTWFwJTNDJTJGYSUzRSUzQyUyRnAlM0U=&popupWidth=200&showPopup=true" height="480" width="480" scrolling="no" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
  );
};
const About = () => {
  return (
    <Main />
  );
};
const Contact = () => {
  return (
    <Main />
  );
};
const Profile = () => {
  return (
    <ManageProfile />
  );
};
const TripHistory = () => {
  return (
    <TripHist />
  );
};

const ManageWalletBalance = () => {
  return (
    <ManageWallet />
  );
};

const userLogin = () => {
  return (
    <Login />
    
  );
};

const userRegister = () => {
  return (
    <Register />
  );
};
/*
const Logout = () => {
  return (
    <Main />
  );
};
*/
export default App;