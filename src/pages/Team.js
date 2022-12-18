import React, { useEffect } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBTextArea,
} from "mdb-react-ui-kit";
import { gql, useQuery } from "@apollo/client";
import { ScoutByNumber } from "../code/ScoutingReport";

function TeamCard({ data, runIndepthSearch, setRunIndepthSearch, ...props }) {
    return (
        <div
            style={{
                width: "75%",
                backgroundColor: "#202020",
                marginBottom: 15,
                paddingBottom: 15,
                borderRadius: 15,
            }}
        >
            <details>
                <summary style={{ listStyle: "none" }}>
                    <h1 style={{ color: "white", paddingTop: 15 }}>
                        {data.name}
                    </h1>
                    <p style={{ color: "#aaa" }}>
                        {data.schoolName} - Since {data.rookieYear}
                    </p>
                </summary>
                <hr />
                <div>
                    {data.matches.map((match) => (
                        <details>
                            <summary style={{ listStyle: "none" }}>
                                <h4>Match {match.match.matchDescription}</h4>
                            </summary>
                            <div>
                                {match.match.teams &&
                                    match.match.teams.map((team) => (
                                        <div>
                                            <p>
                                                Team {team.teamNumber}{" "}
                                                {team.station.split("_")[0] ===
                                                "RED"
                                                    ? "🟥"
                                                    : "🔵"}{" "}
                                                {team.station.split("_")[1]}
                                            </p>
                                        </div>
                                    ))}
                                <p>🟥: {match.match.scores.red.totalPoints}</p>
                                <p>🔵: {match.match.scores.blue.totalPoints}</p>
                            </div>
                        </details>
                    ))}
                </div>
                <a
                    style={{ color: "#92dbfc" }}
                    onClick={() => {
                        if (runIndepthSearch !== -1) {
                            return;
                        }
                        setRunIndepthSearch(data.number);
                    }}
                >
                    View Detailed Scouting Report
                </a>
            </details>
        </div>
    );
}

function Team() {
    const [runIndepthSearch, setRunIndepthSearch] = React.useState(-1);

    //get query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const teamQuery = urlParams.get("query");
    const { loading, error, data } = useQuery(gql`
    {
        teamsSearch(limit: 100, searchText: "${teamQuery}") {
          name
          schoolName
          rookieYear
          number
          matches(season: 2022) {
            match {
                matchDescription
                teams {
                    teamNumber
                    station
                }
              scores {
                __typename
                ... on MatchScores2022 {
                  red {
                    totalPoints
                  }
                  blue {
                    totalPoints
                  }
                }
              }
            }
          }
        }
      }
    `);

    console.log(data);

    return (
        <div>
            <MDBModal show={runIndepthSearch !== -1} onHide={() => setRunIndepthSearch(-1)}>
                <MDBModalDialog size="xl">
                    <MDBModalContent
                        style={{ backgroundColor: "#303030", color: "white" }}
                    >
                        <MDBModalHeader>
                            <h1>Detailed Scouting Report</h1>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <ScoutByNumber
                                teamNumber={runIndepthSearch}
                                setRunIndepthSearch={setRunIndepthSearch}
                            />
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <img
                className="text-center"
                src={
                    data && data.teamsSearch.length !== 0
                        ? "https://media.discordapp.net/attachments/1053480529355354145/1053923846442467368/Group_12_1.png"
                        : "https://media.discordapp.net/attachments/1053480529355354145/1053923852087996466/Group_13.png"
                }
                style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "50vh",
                    zIndex: -100,
                }}
            />
            <p
                style={{
                    position: "absolute",
                    top: 75,
                    fontSize: 75,
                    color: "#fff",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {loading || (data && data.teamsSearch.length !== 0)
                    ? "Results"
                    : "No Results Found"}
            </p>
            <MDBBtn
                color="dark"
                style={{
                    position: "absolute",
                    top: 0,
                    width: "100px",
                    left: 0,
                }}
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                Back To Search
            </MDBBtn>
            <div
                className="justify-content-center"
                style={{ position: "absolute", width: "100%", top: 250 }}
            >
                <center>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data.teamsSearch.map((team) => (
                            <TeamCard
                                data={team}
                                runIndepthSearch={runIndepthSearch}
                                setRunIndepthSearch={setRunIndepthSearch}
                            />
                        ))
                    )}
                </center>
            </div>
        </div>
    );
}

export default Team;
