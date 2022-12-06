import React, { useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea } from 'mdb-react-ui-kit';
import { token } from './Secret';
import { useQuery } from '@apollo/client';
import { GET_TEAMS } from '../gql/Query';

function TeamCard (props) {
    return <MDBCard style={{ width: '75%', backgroundColor: "#202020", marginBottom: 15}}>
        <MDBCardHeader className='text-center text-white'>
            <h1>{props.name}</h1>
            <p style={{color: "#aaa"}}>{props.schoolName}</p>
        </MDBCardHeader>
        <MDBCardBody>
        </MDBCardBody>
    </MDBCard>;
}

function Team() {

    //get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const teamQuery = urlParams.get('q');
    const {loading, error, data} = useQuery(GET_TEAMS);

    console.log(data);    

    return <div>
        <img className="text-center" src="https://media.discordapp.net/attachments/829319361843036200/1049549797662666762/Group_12.png" height="50%" width="100%" style={{objectFit: "contain"}}/>
        <p style={{marginTop: -50, fontSize: 75, color: "#fff", width: "100%", textAlign: "center"}}>Results for "{teamQuery}"</p>
        <div className="justify-content-center" style={{marginTop: 50, width: "100%"}}>
            {loading ? <p>Loading...</p> : data.teamsSearch.map((team) => <TeamCard {...team} />)}
        </div>
    </div>;
}

export default Team;