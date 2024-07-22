import "../../styles/Players.scss"
import styled from "styled-components"

const PlayersSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Players = () => {
  return (
    <div className="players">
      <PlayersSegment className="players__segment">
        <h3>Players list:</h3>
      </PlayersSegment>
      <PlayersSegment className="players__segment"></PlayersSegment>
      <PlayersSegment className="players__segment">
        <h3>Add player:</h3>
        <div>Hej</div>
        <div>Hej</div>
        <div>Hej</div>
        <div>Hej</div>
      </PlayersSegment>
    </div>
  )
}
