import { MDBBtn } from "mdb-react-ui-kit";

export default function Multiple (){

    const urlParams = new URLSearchParams(window.location.search);
    const teams = urlParams.get("query").split(",");

    return (
        <div>
            <MDBBtn
                color="dark"
                style={{
                    width: "100px",
                }}
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                Back To Search
            </MDBBtn>
            {
                teams.map((team) => {
                    return <div>
                        <a target="_blank" href={`/Team?query=${team}`}>{team}</a>
                    </div>;
                })
            }
        </div>
    );
};