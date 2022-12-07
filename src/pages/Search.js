import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea } from 'mdb-react-ui-kit';

function Search() {

  const [selection, setSelection] = React.useState("team");

    const searchByTeam = () => {
        window.location.href = "/Team?q=" + document.getElementById("team-query").value;
    }

  return (
    <div style={{overflow: "hidden"}}>
        <p style={{position: "absolute", bottom: 0, left: 25, color: "grey", zIndex: 100}}>Special thanks to FTCScout.org for their API.</p>
        <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "50vh", backgroundColor: "#202020", zIndex: -1}}/>
      <img className="text-center" src="https://media.discordapp.net/attachments/829319361843036200/1049493682329501818/Group_8_1.png" style={{objectFit: "contain", width: "100%", height: "50vh"}}/>
      <p style={{marginTop: -50, fontSize: 75, color: "#fff", width: "100%", textAlign: "center"}}>FTC - UAV</p>
      <p style={{textAlign: "center", width: "100%", color: "rgba(255, 255, 255, 0.5)", marginTop: -35}}>Simplistic yet effective scouting software.</p>
      {/* <hr /> */}
      
      <MDBTabs style={{width: "100%", justifyContent: "center", marginTop: 50}}>
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
            <MDBIcon fas icon='calendar' className='me-2' /> By Event
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent style={{marginTop: 50}}>
        <MDBTabsPane show={selection === "team"} style={{width: "100%", height: "", padding: 50, paddingTop: 0, backgroundColor: "#101010", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          {/* <h3 style={{color: "#fff"}} className="text-center">Team # or Team Name </h3> */}
          <div flex className="text-center"  style={{marginTop: 15}}>
          <input id="team-query" placeholder='Eg: "21630" or "Argonauts"' style={{display: "flex", height: 50, borderRadius: 20, paddingLeft: 20, width: "100%", border: "none", backgroundColor: "#252525", color: "white"}} 
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    searchByTeam();
                }
            }}
          />
          <div style={{marginTop: 25}}>
            <MDBBtn onClick={() => {
                searchByTeam();
            }}style={{width: "150px", borderRadius: 15, height: 50, backgroundColor: "#252525", color: "#92dbfc", boxShadow: "none", border: "none"}}><MDBIcon icon="search" className="me-2" />Search</MDBBtn>
          </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={selection === "event"} style={{width: "100%", height: "", padding: 50, paddingTop: 0, backgroundColor: "#101010", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          {/* <h3 style={{color: "#fff"}} className="text-center">Event Date / Name </h3> */}
          <div flex className="text-center" style={{marginTop: 15}}>
          <input placeholder='Eg: "December 6th Upper League Meet"' style={{display: "flex", height: 50, borderRadius: 20, paddingLeft: 20, width: "100%", border: "none", backgroundColor: "#252525", color: "white"}} />
          <div style={{marginTop: 25}}>
            <MDBBtn style={{width: "150px", borderRadius: 15, height: 50, backgroundColor: "#252525", color: "#92dbfc", boxShadow: "none", border: "none"}}><MDBIcon icon="search" className="me-2" />Search</MDBBtn>
          </div>
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

export default Search;
