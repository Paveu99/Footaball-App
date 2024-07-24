import styled from "styled-components"
import "../../styles/AddPlayerForm.scss"

type Props = {
  view: string
  onClick?: () => void
}

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const DeleteButton = ({ view, onClick }: Props) => {
  return (
    <Button
      className="submit-button"
      type="button"
      onClick={onClick ? () => onClick() : undefined}
    >
      <strong>{view}</strong>
    </Button>
  )
}
