import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea } from 'mdb-react-ui-kit';

function App() {

  const [selection, setSelection] = React.useState("team");

  return (
    <div style={{backgroundColor: "#202020", height: "100vh", width: "100vw", overflow: "hidden"}}>
      {/* <div style={{height: 500, backgroundColor: "#202020", display: "flex", justifyContent: "center", alignItems: "center"}}> */}
      <p style={{padding: 15, fontSize: 75, color: "#fff", width: "100%", textAlign: "center"}}>UAV</p>
      <p style={{textAlign: "center", width: "100%", color: "rgba(205, 205, 205, 0.75)", marginTop: -35}}>Look for stats of team that you are interested in.</p>
      {/* <hr /> */}
      
      <MDBTabs style={{width: "100%", justifyContent: "center"}}>
        <MDBTabsItem style={{display: "flex"}}>
          <MDBTabsLink style={{color: "#92dbfc", 
          backgroundColor: selection !== "team" ? "#303030" : "#fff",
          borderTopLeftRadius: 20, 
          height: 50, borderBottomLeftRadius: 20}}  onClick={() => {
            setSelection("team");
          }}
          active={selection === "team"}
          >
            <MDBIcon fas icon='users' className='me-2' /> By Team
          </MDBTabsLink>
          <MDBTabsLink style={{color: "#92dbfc", 
          backgroundColor: selection !== "event" ? "#303030" : "#fff",
          borderTopRightRadius: 20, borderBottomRightRadius: 20}} onClick={() => {
            setSelection("event");
          }}
          active={selection === "event"}
          >
            <MDBIcon fas icon='users' className='me-2' /> By Event
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent style={{position: "fixed", width: "100%", top: 0, left: 0}}>
        <MDBTabsPane show={selection === "team"} style={{width: "100%", height: "100vh", padding: 20, backgroundColor: "#101010", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <h3 style={{color: "#fff"}}>Team # or Team Name </h3>
          <div flex className="text-center">
          <input placeholder='Eg: "21630" or "Argonauts"' style={{display: "flex", height: 50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, paddingLeft: 20, width: "100%", border: "none", backgroundColor: "#252525", color: "white"}} />
          <div style={{position: "absolute", top: 0, right: 0}}>
            <MDBBtn style={{width: "150px", borderBottomRightRadius: 20 ,height: 50, backgroundColor: "#252525", color: "#92dbfc", boxShadow: "none", border: "none"}}><MDBIcon icon="search" className="me-2" />Search</MDBBtn>
          </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={selection === "event"}>
          <p>Event</p>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default App;
