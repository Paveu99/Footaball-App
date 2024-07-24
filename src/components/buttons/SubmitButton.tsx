import styled from "styled-components"
import "../../styles/AddPlayerForm.scss"

type Props = {
  view: string
  disabled: boolean
  onClick?: () => void
}

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const SubmitButton = ({ view, disabled, onClick }: Props) => {
  return (
    <Button
      className="submit-button"
      type="submit"
      disabled={disabled}
      onClick={onClick ? () => onClick() : undefined}
    >
      <strong>{view}</strong>
    </Button>
  )
}
