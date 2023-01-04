import { MDBBadge, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

export default function SearchByTeamsMultiple({ callbackOnSearch, ...props }) {
    return (
        <div flex className="text-center" style={{ marginTop: 15 }}>
            <textarea
                id="team-queries"
                placeholder='Eg: "21630, 11697" in format of "team1, team2, team3, etc."'
                style={{
                    fontSize: 14,
                    display: "flex",
                    height: 50,
                    minHeight: 50,
                    borderRadius: 20,
                    borderBottomRightRadius: 0,
                    paddingLeft: 20,
                    paddingTop: 15,
                    width: "100%",
                    border: "none",
                    backgroundColor: "#252525",
                    color: "white",
                }}
                onKeyDown={(e) => {
                    console.log(e.key)
                    if (e.key === "Enter") {
                        callbackOnSearch();
                    }
                }}
            />
            <div style={{ marginTop: 15, position: "relative"}}>
                <MDBBtn
                    onClick={() => {
                        callbackOnSearch();
                    }}
                    style={{
                        width: "150px",
                        borderRadius: 15,
                        height: 50,
                        backgroundColor: "#252525",
                        color: "#92dbfc",
                        boxShadow: "none",
                        border: "none",
                    }}
                >
                    <MDBIcon icon="search" className="me-2" />
                        Search
                    </MDBBtn>
                <MDBBadge color="warning" pill notification style={{position: "absolute", top: 0, marginLeft: -20, marginTop: -5, paddingInlineStart: 5, paddingInlineEnd: 5}}>
                    BETA
                </MDBBadge>
            </div>
        </div>
    );
}
