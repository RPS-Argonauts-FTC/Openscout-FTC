import React, { useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBContainer, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea } from 'mdb-react-ui-kit';
import { token } from './Secret';

function Team() {

    //get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const teamNumber = urlParams.get('q');

    //fetch data with authorization header
    const fetchData = async () => {

        const response = await fetch("https://ftc-api.firstinspires.org/v2.0/2022/leagues", {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
            mode: 'no-cors'
        });

        //get json data
        const data = await response.json();
        console.log(data);

    };

    useEffect(() => {
        fetchData();
    }, [])
    

    return <><p>{teamNumber}</p></>;
}

export default Team;