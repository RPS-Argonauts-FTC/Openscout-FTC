import { MDBBadge, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

export default function SearchByTeam({ callbackOnSearch, ...props }) {
    return (
        <div flex className="text-center" style={{ marginTop: 15 }}>
            <input
                id="team-query"
                placeholder='Eg: "21630" or "Argonauts"'
                style={{
                    display: "flex",
                    height: 50,
                    borderRadius: 20,
                    paddingLeft: 20,
                    width: "100%",
                    border: "none",
                    backgroundColor: "#252525",
                    color: "white",
                }}
                onKeyDown={(e) => {
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
