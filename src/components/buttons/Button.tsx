import styled from "styled-components"
import "../../styles/AddPlayerForm.scss"

type Props = {
  view: string
  onClick?: () => void
  color?: string
  backgroundColor?: string
}

const StyledButton = styled.button<{
  backgroundColor?: string
  color?: string
}>`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.secondaryBackground};
  color: ${(props) => props.color || props.theme.colors.primaryTextColor};
  width: max-content;
`

export const Button = ({ view, onClick, color, backgroundColor }: Props) => {
  return (
    <StyledButton
      className="submit-button"
      type="button"
      onClick={onClick ? () => onClick() : undefined}
      backgroundColor={backgroundColor}
      color={color}
    >
      <strong>{view}</strong>
    </StyledButton>
  )
}
