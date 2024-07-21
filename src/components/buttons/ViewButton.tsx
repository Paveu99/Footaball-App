import "../../styles/ViewButton.scss"

type Props = {
  view: string
  onClick: () => void
}

export const ViewButton = ({ view, onClick }: Props) => {
  return (
    <button className="view-button" onClick={() => onClick()}>
      <strong>{view}</strong>
    </button>
  )
}
