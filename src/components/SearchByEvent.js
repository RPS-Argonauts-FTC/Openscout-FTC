import { MDBAutocomplete, MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCheckbox, MDBContainer, MDBDatepicker, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBInput, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea, MDBTooltip } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';

export default function SearchByEvent({callbackOnSearch, ...props})
{

    //default date is today with m/d/yyyy format
    const [date, setDate] = useState(new Date().toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}));
    const [region, setRegion] = useState("ALL");
    const [eventType, setEventType] = useState("IR");

    const prettifyTypeText = () => {
        switch(eventType)
        {
              case "I":
                  return "In-Person Events Only";
              case "R":
                  return "Remote Events Only";
              case "IR":
                  return "Remote & In-Person Events";
        }
    }

    console.log(region)

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

    return  <div flex className="text-center" style={{marginTop: 15, backgroundColor: ""}}>
        <div style={{position: "relative"}}>
            <MDBBtn color="link" style={{position: "absolute", top: 0, left: 0, height: 50, borderRadius: 15, paddingLeft: 20, width: "100%", border: "none", backgroundColor: "#252525", color: "#fff", marginBottom: 15}}>
                <center>
                    <MDBIcon icon="calendar" className="me-2" />
                    {date}
                </center>
            </MDBBtn>
            <MDBDatepicker title="Select A Date (mm/dd/yyyy)"  format="mm/dd/yyyy" id="date-picker" inputToggle icon='fas fa-calendar' style={{display: "flex", height: 50, borderRadius: 15, width: "100%", border: "none", backgroundColor: "#252525", color: "#fff", marginBottom: 15, textColor: "#fff", opacity: 0.001}} 
                onChange={(value) => {
                    if (!value) return;
                    setDate(value);
                }}
            />
        </div>
    <MDBAutocomplete id="region-value" placeholder='Region (If in USA prefix state w/ US)' style={{display: "flex", height: 50, borderRadius: 15, paddingLeft: 20, textAlign: "center", width: "100%", border: "none", backgroundColor: "#252525", color: "#fff"}} 
    dataFilter={(value) => {
      return regions.filter((item) => {
        return item.toLowerCase().includes(value.toLowerCase());
      });
    }}
    onSelect={(value) => {
        setRegion(value);
    }}

    onChange={(event) => {
        setRegion(event.target.value);
    }}

    onClose={() => {
        //if the region value is not in the list set region to all
        if(region === "" || !regions.includes(region))
        {
            setRegion("ALL");
            setTimeout(() => {
                document.getElementById("region-value").value = "ALL";
            }, 100);
        }
    }}
    
    />
    <MDBDropdown style={{marginTop: 15}}>
      <MDBDropdownToggle color="link" style={{height: 50, borderRadius: 15, paddingLeft: 20, width: "100%", border: "none", backgroundColor: "#252525", color: "#fff", marginBottom: 15}}>
        {prettifyTypeText()}</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem style={{margin: 15}}  onClick={
            () => {
                setEventType("I");
            }
        }>In-Person Events Only</MDBDropdownItem>
        <MDBDropdownItem style={{margin: 15}}  onClick={
            () => {
                setEventType("R");
            }
        }>Remote Events Only</MDBDropdownItem>
        <MDBDropdownItem style={{margin: 15}} onClick={
            () => {
                setEventType("IR");
            }
        }> Remote & In-Person Events</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
        <div style={{marginTop: 15}}>
        <MDBBtn onClick={() => {
                callbackOnSearch(date, region, eventType);
        }} style={{width: "150px", borderRadius: 15, height: 50, backgroundColor: "#252525", color: "#92dbfc", boxShadow: "none", border: "none"}}><MDBIcon icon="search" className="me-2" />Search</MDBBtn>
        </div>
    </div>
}