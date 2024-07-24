import styled from "styled-components"
import "../../styles/AddPlayerForm.scss"

type Props = {
  view: string
  disabled: boolean
}

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const SubmitButton = ({ view, disabled }: Props) => {
  return (
    <Button className="submit-button" type="submit" disabled={disabled}>
      <strong>{view}</strong>
    </Button>
  )
}
