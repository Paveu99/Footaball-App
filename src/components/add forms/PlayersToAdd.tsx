import styled from "styled-components"
import { Player } from "../../utils/types"
import "../../styles/AddPlayerForm.scss"

type Props = {
  player: Player
  undo: (playerId: string) => void
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
  margin-bottom: 0;
`

export const PlayersToAdd = ({ player, undo }: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div>
        {player.player_name} {player.player_surname}
      </div>
      <StyledButton
        className="submit-button"
        type="button"
        onClick={() => undo(player.id)}
      >
        Undo
      </StyledButton>
    </div>
  )
}
