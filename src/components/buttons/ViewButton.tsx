import styled from "styled-components"
import "../../styles/ViewButton.scss"

type Props = {
  view: string
  onClick: () => void
}

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const ViewButton = ({ view, onClick }: Props) => {
  return (
    <Button className="view-button" onClick={() => onClick()}>
      <strong>{view}</strong>
    </Button>
  )
}
