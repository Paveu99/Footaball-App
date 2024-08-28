import styled from "styled-components"
import "../styles/Base.scss"
import { Headline } from "../components/headline/Headline"
import { Stats } from "./deeper views/Stats"

const StatsView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const StatsBase = () => {
  return (
    <StatsView className="base">
      <Headline text="Statistics" />
      <Stats />
    </StatsView>
  )
}
