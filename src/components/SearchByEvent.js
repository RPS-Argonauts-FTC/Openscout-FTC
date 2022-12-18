import {
    MDBAutocomplete,
    MDBBadge,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCheckbox,
    MDBContainer,
    MDBDatepicker,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon,
    MDBInput,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
    MDBTextArea,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

export default function SearchByEvent({ callbackOnSearch, ...props }) {
    //default date is today with m/d/yyyy format
    const [date, setDate] = useState(
        new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    );
    const [region, setRegion] = useState("ALL");
    const [eventType, setEventType] = useState("IR");

    const prettifyTypeText = () => {
        switch (eventType) {
            case "I":
                return "In-Person Events Only";
            case "R":
                return "Remote Events Only";
            case "IR":
                return "Remote & In-Person Events";
        }
    };

    useEffect(() => {
        document.getElementById("dummy-input").value = region;
    }, []);

    //all regions of FTC events according to FTCScout.org API
    const regions = `
ALL
NORTH
SOUTH
INTERNATIONAL
AU
BR
CAAB
CABC
CAON
CAQC
CMPZ2
CN
CY
EG
GB
IL
IN
JM
KZ
LY
MX
NG
NL
ONADOD
QA
RO
RU
TH
TW
USAK
USAL
USAR
USARL
USAZ
USCA
USCALA
USCANO
USCASD
USCHS
USCO
USCT
USDE
USFL
USGA
USHI
USIA
USID
USIL
USIN
USKY
USLA
USMA
USMI
USMN
USMOKS
USMS
USMT
USNC
USND
USNH
USNJ
USNM
USNV
USNY
USNYEX
USNYLI
USNYNY
USOH
USOK
USOR
USPA
USRI
USSC
USTN
USTX
USTXCE
USTXHO
USTXNO
USTXSO
USTXWP
USUT
USVT
USWA
USWI
USWY
ZA`.split("\n");

    return (
        <div
            flex
            className="text-center"
            style={{ marginTop: 15, backgroundColor: "" }}
        >
            <div style={{ position: "relative" }}>
                <MDBBtn
                    color="link"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: 50,
                        borderRadius: 15,
                        paddingLeft: 20,
                        width: "100%",
                        border: "none",
                        backgroundColor: "#252525",
                        color: "#fff",
                        marginBottom: 15,
                    }}
                >
                    <center>
                        <MDBIcon icon="calendar" className="me-2" />
                        {date}
                    </center>
                </MDBBtn>
                <MDBDatepicker
                    title="Select A Date (mm/dd/yyyy)"
                    format="mm/dd/yyyy"
                    id="date-picker"
                    inputToggle
                    icon="fas fa-calendar"
                    style={{
                        display: "flex",
                        height: 50,
                        borderRadius: 15,
                        width: "100%",
                        border: "none",
                        backgroundColor: "#252525",
                        color: "#fff",
                        marginBottom: 15,
                        textColor: "#fff",
                        opacity: 0.001,
                    }}
                    onChange={(value) => {
                        if (!value) return;
                        setDate(value);
                    }}
                />
            </div>
            <div
                style={{
                    position: "relative",
                    height: 50,
                    marginTop: 15,
                    marginBottom: 20,
                }}
            >
                <input
                    id="dummy-input"
                    readOnly
                    style={{
                        fontSize: 12,
                        position: "absolute",
                        width: "100%",
                        height: "50px",
                        left: 0,
                        top: 2,
                        borderRadius: 15,
                        backgroundColor: "#252525",
                        border: "none",
                        color: "#fff",
                        paddingLeft: 20,
                        textAlign: "center",
                    }}
                />
                <MDBAutocomplete
                    id="region-value"
                    placeholder="Region (If in USA prefix state w/ US)"
                    style={{
                        position: "absolute",
                        height: 50,
                        width: "100%",
                        backgroundColor: "#fff",
                        color: "#fff",
                        opacity: 0.001,
                    }}
                    dataFilter={(value) => {
                        return regions.filter((item) => {
                            return item
                                .toLowerCase()
                                .includes(value.toLowerCase());
                        });
                    }}
                    onSelect={(value) => {
                        setRegion(value);
                        document.getElementById("dummy-input").value = value;
                    }}
                    onChange={(event) => {
                        setRegion(event.target.value.toUpperCase());
                        document.getElementById("dummy-input").value =
                            event.target.value.toUpperCase();
                    }}
                    onClose={() => {
                        //if the region value is not in the list set region to all
                        if (region === "" || !regions.includes(region.toUpperCase())) {
                            setRegion("ALL");
                            document.getElementById("dummy-input").value =
                                "ALL";
                        }
                    }}
                />
                <div style={{width: "100%",
                        backgroundColor: "#101010", position: "absolute", top: -1, height: 3}} />
            </div>
            <MDBDropdown style={{ marginTop: 15 }}>
                <MDBDropdownToggle
                    color="link"
                    style={{
                        height: 50,
                        borderRadius: 15,
                        paddingLeft: 20,
                        width: "100%",
                        border: "none",
                        backgroundColor: "#252525",
                        color: "#fff",
                        marginBottom: 15,
                    }}
                >
                    {prettifyTypeText()}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem
                        style={{ margin: 15 }}
                        onClick={() => {
                            setEventType("I");
                        }}
                    >
                        In-Person Events Only
                    </MDBDropdownItem>
                    <MDBDropdownItem
                        style={{ margin: 15 }}
                        onClick={() => {
                            setEventType("R");
                        }}
                    >
                        Remote Events Only
                    </MDBDropdownItem>
                    <MDBDropdownItem
                        style={{ margin: 15 }}
                        onClick={() => {
                            setEventType("IR");
                        }}
                    >
                        {" "}
                        Remote & In-Person Events
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
            <div style={{ marginTop: 15, position: "relative"}}>
                <MDBBtn
                    onClick={() => {
                        callbackOnSearch(date, region, eventType);
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
