import "../../styles/Stats.scss"
import styled from "styled-components"
import { LatestGame } from "./LatestGame"
import { TopTeams } from "../../components/lists/teams/TopTeams"
import { Chart } from "./Chart"

const StatsSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Stats = () => {
  return (
    <div className="stats">
      <StatsSegment className="latest">
        <h3>Last played game:</h3>
        <LatestGame />
      </StatsSegment>
      <StatsSegment className="top_3">
        <h3>Top teams with most goals:</h3>
        <TopTeams />
      </StatsSegment>
      <StatsSegment className="statistics">
        <h3>Number of games:</h3>
        <Chart />
      </StatsSegment>
    </div>
  )
}
