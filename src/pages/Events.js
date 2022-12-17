import React, { useEffect } from 'react';
import { MDBBtn, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardHeader, MDBChip, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea, MDBTooltip } from 'mdb-react-ui-kit';
import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";

function EventCard ({event, ...props}) {
    return <div style={{ width: '75%', backgroundColor: "#202020", marginBottom: 15, paddingBottom: 15, borderRadius: 15}}>
    <details>
        <summary style={{listStyle: "none"}}>
        <div style={{padding: 25, paddingBottom: 10}} className='text-center text-white'>
                <h1>{event.name}</h1>
               <div style={{display: "inline", 
               padding: 5, width:"125px", borderRadius: 25, backgroundColor: "#fff", color: "#000"}}>{event.remote ? <><MDBIcon icon="home" /> Remote</> : <><MDBIcon icon="users" /> In Person</>}
                </div>
        </div>
        <MDBBtnGroup>
            {event.liveStreamURL && <MDBBtn color="link" href={event.event.liveStreamURL} target="_blank">Watch On YT</MDBBtn>}
            <MDBBtn color="link" onClick={() => {
                
            }}>Download Detailed Scouting Report</MDBBtn>
        </MDBBtnGroup>
        </summary>
        <div>
            {event.teams.map((team) => <div style={{padding: 25, paddingTop: 0, paddingBottom: 0}} className='text-center text-white'>
                <hr/>
                <details>
                    <summary style={{listStyle: "none"}}>
                        <h4>{String(team.teamNumber)}</h4>
                    </summary>
                    <div>
                        {
                            team.matches.map((match) => <div>
                                <details>
                                    <summary style={{listStyle: "none"}}>
                                    <b>Match {match.match.matchNum}</b></summary>
                                    <div>
                                        {
                                            match.match.teams.map((team) => <div>
                                                <p>Team {team.teamNumber} {team.station.split("_")[0] === "RED" ? "🟥" : "🔵"} {team.station.split("_")[1]}</p>
                                            </div>)
                                        }
                                    </div>  
                                </details>
                            </div>)
                        }
                        </div>
                    </details>
            </div>)}
        </div>
        </details>
    </div>;
}

function Events() {

    //get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    const region = urlParams.get('region');
    const date = urlParams.get('date');
    let eventType = urlParams.get('eventType');

    switch(eventType) {
        case "IR":
            eventType = "TRAD_AND_REMOTE";
            break;
        case "R":
            eventType = "REMOTE";
            break;
        case "I":
            eventType = "TRAD";
            break;
    }

    console.log(eventType);

    const szn = 2022

    const {loading, error, data} = useQuery(gql`
    {
        eventsSearch(region: ${region},
        start: "${date}",
        end: "${date}", 
        limit: 20, 
        season: ${szn},
        onlyWithMatches: false, 
        eventTypes: ${eventType}){
            liveStreamURL
            name
            remote
            teams {
                teamNumber
                matches {
                    match {
                        matchNum
                        teams {
                        teamNumber
                        station
                        } 
                    }
                }
            }
        }
    }
    `
    );

    console.log(data);    

    return <div>
        <img className="text-center" src="https://media.discordapp.net/attachments/829319361843036200/1049688339458052176/Group_12.png" style={{objectFit: "contain", width: "100%", height: "50vh", zIndex: -100}}/>
        <p style={{position: "absolute", top: 75, fontSize: 75, color: "#fff", width: "100%", textAlign: "center"}}>Results</p>
        <MDBBtn color="dark" style={{position: "absolute", top: 0, width: "100px", left: 0}} onClick = {() => {
            window.location.href = "/";
        }}>
            Back To Search
        </MDBBtn>
        <div className="justify-content-center" style={{position: "absolute", width: "100%", top: 250}}>
            <center style={{zIndex: 100}}>
                {loading ? <p>Loading...</p> : data.eventsSearch.length === 0 ? <p>No results found.</p> : data.eventsSearch.map((event) => <EventCard event={event} />)}
            </center>
        </div>
    </div>;
}

export default Events;