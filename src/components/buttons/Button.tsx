import styled from "styled-components"
import "../../styles/AddPlayerForm.scss"

type Props = {
  view: string
  onClick?: () => void
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const Button = ({ view, onClick }: Props) => {
  return (
    <StyledButton
      className="submit-button"
      type="button"
      onClick={onClick ? () => onClick() : undefined}
    >
      <strong>{view}</strong>
    </StyledButton>
  )
}
