import { gql, useQuery } from "@apollo/client";
import { MDBDatatable, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

function Stats({finalData})
{

  const tableData = {
    columns: ['Data For ' + finalData.number + " (Per Game Alliance Avg)", 'Value'],
    rows: [
      ['Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.totalPoints, 0) / finalData.matches.length],
      ['Points (No Penalties)', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.totalPointsNp, 0) / finalData.matches.length],
      ['Minor Penalties', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.minorPenalties, 0) / finalData.matches.length],
      ['Major Penalties', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.majorPenalties, 0) / finalData.matches.length],

      ['Auto Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoPoints, 0) / finalData.matches.length],
      ['Auto Cone Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoConePoints, 0) / finalData.matches.length],
      ['Auto Terminal', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoTerminalCones, 0) / finalData.matches.length],
      ['Auto Ground', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoGroundCones, 0) / finalData.matches.length],
      ['Auto Lows', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoLowCones, 0) / finalData.matches.length],
      ['Auto Mediums', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoMediumCones, 0) / finalData.matches.length],
      ['Auto Highs', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoHighCones, 0) / finalData.matches.length],
      ['Auto Parking Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.autoNavigationPoints, 0) / finalData.matches.length],
      //parking success rate

      ['TeleOp Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcPoints, 0) / finalData.matches.length],
      ['TeleOp Terminal', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcTerminalCones, 0) / finalData.matches.length],
      ['TeleOp Ground', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcGroundCones, 0) / finalData.matches.length],
      ['TeleOp Lows', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcLowCones, 0) / finalData.matches.length],
      ['TeleOp Mediums', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcMediumCones, 0) / finalData.matches.length],
      ['TeleOp Highs', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.dcHighCones, 0) / finalData.matches.length],

      ['Endgame Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.endgamePoints, 0) / finalData.matches.length],
      ['Endgame Parking Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.endgameNavigationPoints, 0) / finalData.matches.length],
      //parking success rate

      ['Owned Junctions (Cone)', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.coneOwnedJunctions, 0) / finalData.matches.length],
      ['Owned Junctions (Beacon)', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.beaconOwnedJunctions, 0) / finalData.matches.length],
      ['Ownership Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.ownershipPoints, 0) / finalData.matches.length],
      ['Circuit Points', finalData.matches.reduce((accumulator, currentValue) => accumulator + currentValue.score.circuitPoints, 0) / finalData.matches.length],
      ['Circuit Rate', finalData.matches.reduce((accumulator, currentValue) => accumulator + (currentValue.score.circuit ? 1 : 0), 0) / finalData.matches.length * 100 + "%"],
    ],
  };

  let entirelyNullified = true;

  for(let i = 0; i < tableData.rows.length; i++)
  {
    if(!String(tableData.rows[i][1]).includes(NaN))
    {
      entirelyNullified = false;
      break;
    }
  }

  return <div>
    <hr/>
    <h1>{finalData.number}</h1>
    {!entirelyNullified && <a style={{ color: "#92dbfc" }}>Download As .CSV</a>}
    {!entirelyNullified && <a style={{ color: "#92dbfc", marginInlineStart: 15}}>Generate Scouting Sheet</a>}
    <a style={{ color: "#92dbfc", marginInlineStart: 15}} href={`https://ftcscout.org/teams/${finalData.number}`} target="_blank">View on FTCScout.org</a>
    {!entirelyNullified && <MDBDatatable entries={100} entriesOptions={[100]} style={{backgroundColor: "transparent"}} bordered hover data={tableData} dark />}
    {entirelyNullified && <p>This team hasn't played a match yet</p>}
  </div>
}

export function ScoutByNumber({teamNumber})
{

  const [finalData, setFinalData] = useState(null);

  const {loading, error, data} = useQuery(gql`{
    teamByNumber(number: ${teamNumber})
    {
      name
      number
      schoolName
        rookieYear
      matches (season: 2022)
      {
        match {
          matchDescription
          matchNum
          
          scores {
            __typename 
            ... on MatchScores2022
              {
                red {
                  autoNavigation1
                  autoNavigation2
                  autoTerminalCones
                  autoGroundCones
                  autoLowCones
                  autoMediumCones
                  autoHighCones
                  dcTerminalCones
                  dcGroundCones
                  dcLowCones
                  dcMediumCones
                  dcHighCones
                  endgameNavigated1
                  endgameNavigated2
                  coneOwnedJunctions
                  beaconOwnedJunctions
                  circuit
                  minorPenalties
                  majorPenalties
                  autoNavigationPoints
                  autoConePoints
                  endgameNavigationPoints
                  ownershipPoints
                  circuitPoints
                  autoPoints
                  dcPoints
                  endgamePoints
                  penaltyPoints
                  totalPoints
                  totalPointsNp
                }
                blue {
                  autoNavigation1
                  autoNavigation2
                  autoTerminalCones
                  autoGroundCones
                  autoLowCones
                  autoMediumCones
                  autoHighCones
                  dcTerminalCones
                  dcGroundCones
                  dcLowCones
                  dcMediumCones
                  dcHighCones
                  endgameNavigated1
                  endgameNavigated2
                  coneOwnedJunctions
                  beaconOwnedJunctions
                  circuit
                  minorPenalties
                  majorPenalties
                  autoNavigationPoints
                  autoConePoints
                  endgameNavigationPoints
                  ownershipPoints
                  circuitPoints
                  autoPoints
                  dcPoints
                  endgamePoints
                  penaltyPoints
                  totalPoints
                  totalPointsNp
                }
            }
          }
          
          teams {
            station
            teamNumber
          }
          
          hasBeenPlayed
        }
      }
    }
}`);

    useEffect(() => {
      if (teamNumber === -1)
      {
        return;
      }
    }, [teamNumber])

    useEffect(() => {
      if (data == null || data.teamByNumber == null)
      {
        return;
      }

      let filteredData = {};

      // console.log(data)

      filteredData.name = data.teamByNumber.name;
      filteredData.number = data.teamByNumber.number;
      filteredData.schoolName = data.teamByNumber.schoolName;
      filteredData.rookieYear = data.teamByNumber.rookieYear;
      filteredData.matches = [];

      for (var match of data.teamByNumber.matches)
      {
        match = match.match;

        if (!match.hasBeenPlayed)
        {
          continue;
        }

        var side = match.teams.filter((team) => {if (team.teamNumber === teamNumber) {return team.station}})[0].station.split("_")[0];
        let scoreSided = {};

        switch (side)
        {
          case "RED":
            scoreSided = match.scores.red;
            break;
          case "BLUE":
            scoreSided = match.scores.blue;
            break;
        }

        filteredData.matches.push({
          matchNum: match.matchNum,
          matchDescription: match.matchDescription,
          score: scoreSided,
          side: side
        });
      }

      setFinalData(filteredData);
    }, [data])

    return <>
        <p>{loading ? <p>Getting {teamNumber} - Fetching FTCScout API...</p> : <div><p></p></div>}</p>
        {(finalData && finalData.number !== 21630) && <Stats finalData={finalData} />}
        {(finalData && finalData.number === 21630) && <><hr/><h1>21630 - We aren't just gonna let you use our software against us you know...</h1><p style={{color: "#aaa"}}>Instead, you should scout <a style={{ color: "#92dbfc" }} href="/Team?query=11697">11697.</a></p></>}
      </>
}