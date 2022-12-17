import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea } from 'mdb-react-ui-kit';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Search from './pages/Search';
import Team from './pages/Team';
import Events from './pages/Events';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/Team/" element={<Team />} />
          <Route path="/Events/" element={<Events />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
