import React, { Suspense } from 'react';
import { MDBAutocomplete, MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBContainer, MDBDatepicker, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea, MDBTooltip } from 'mdb-react-ui-kit';
import SearchByEvent from '../components/SearchByEvent';
import SearchByTeam from '../components/SearchByTeam';

function Search() {

  const [selection, setSelection] = React.useState("team");

    const searchByTeam = () => {
        window.location.href = "/Team?query=" + document.getElementById("team-query").value;
    }

    const searchByEvent = (date, region, eventType) => {
      var path = "/Events?date=" + date + "&region=" + region + "&eventType=" + eventType;
      window.location.href = path;
    }

  return (
    <div style={{overflow: "hidden"}}>
        <a style={{position: "absolute", bottom: 35, left: 25, color: "#aaa", zIndex: 100}} href="https://github.com/RPS-Argonauts-FTC/Openscout-FTC" target="_blank">GitHub</a>
        <p style={{position: "absolute", bottom: 0, left: 25, color: "#202020", zIndex: 100}}>Special thanks to FTCScout.org for their GraphQL API.</p>
        <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "50vh", backgroundColor: "#202020", zIndex: -1}}/>
        <Suspense>
          <img className="text-center" src="https://media.discordapp.net/attachments/1053480529355354145/1053922509071855696/Group_9_1.png" style={{objectFit: "contain", width: "100%", height: "50vh", marginTop: 5}}/>
        </Suspense>
      <p style={{marginTop: -50, fontSize: 75, color: "#fff", width: "100%", textAlign: "center", letterSpacing: 2}}>OpenScout</p>
      <p style={{textAlign: "center", width: "100%", color: "rgba(255, 255, 255, 0.5)", marginTop: -35}}>{"Events + Performance Analysis + Data AI = Big W"}</p>
      <p style={{position: "absolute", bottom: 0, right: 25, color: "rgba(255, 255, 255, 0.5)"}}>By <a href="https://argonautsftc.org" style={{color: "#92dbfc"}} target="_blank">FTC21630</a></p>
      
      <MDBTabs style={{width: "100%", justifyContent: "center", marginTop: 50}}>
        <MDBTabsItem style={{display: "flex"}}>
          <MDBTabsLink style={{color: selection !== "team" ? "#92dbfc" : "#202020", 
          backgroundColor: selection !== "team" ? "#202020" : "#92dbfc",
          borderTopLeftRadius: 15, 
          height: 50, borderBottomLeftRadius: 15}}  onClick={() => {
            setSelection("team");
          }}
          active={selection === "team"}
          >
            <MDBIcon fas icon='users' className='me-2' /> By Team
          </MDBTabsLink>
          <MDBTabsLink style={{color: selection !== "event" ? "#92dbfc" : "#202020", 
          backgroundColor: selection !== "event" ? "#202020" : "#92dbfc",
          borderTopRightRadius: 15, borderBottomRightRadius: 15}} onClick={() => {
            setSelection("event");
          }}
          active={selection === "event"}
          >
            <MDBIcon fas icon='calendar' className='me-2' /> By Event
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <center>
        <MDBTabsContent style={{marginTop: 30, maxWidth: 750}}>
          <MDBTabsPane show={selection === "team"} style={{width: "100%", height: "", padding: 50, paddingTop: 0, backgroundColor: "#101010", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <SearchByTeam callbackOnSearch={searchByTeam} />            
          </MDBTabsPane>
          <MDBTabsPane show={selection === "event"} style={{width: "100%", padding: 50, paddingTop: 0, backgroundColor: "#101010"}}>
            <SearchByEvent callbackOnSearch={searchByEvent} />
          </MDBTabsPane>
        </MDBTabsContent>
      </center>
    </div>
  );
}

export default Search;
