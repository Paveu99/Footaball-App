import styled from "styled-components"
import "../styles/Base.scss"
import { Headline } from "../components/headline/Headline"

const StatsView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const Stats = () => {
  console.log("stats")

  return (
    <StatsView className="base">
      <Headline text="Statistics" />
    </StatsView>
  )
}
