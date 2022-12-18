import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export function ScoutByNumber({teamNumber})
{

  const [finalData, setFinalData] = useState(null);

  const {loading, error, data} = useQuery(gql`{
    teamByNumber(number: ${teamNumber})
    {
      name
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

    console.log(finalData)

    if (loading) return <p>Getting {teamNumber} - Loading...</p>;

    return <div><p>Getting {teamNumber} - Querying Gameplay Analyzer AI...</p></div>;
}