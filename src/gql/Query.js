import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
    query GetTeams{
        teamsSearch(limit: 20, searchText: "argonauts")
        {
        name
        schoolName
        }
    }
`