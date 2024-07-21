import { Views } from "../../utils/types"
import { ViewButton } from "../buttons/ViewButton"
import "../../styles/Switch.scss"

type Props = {
  changeView: (view: Views) => void
}

export const Switch = ({ changeView }: Props) => {
  return (
    <div className="switch">
      <ViewButton onClick={() => changeView("a")} view="Players" />
      <ViewButton onClick={() => changeView("b")} view="Teams" />
      <ViewButton onClick={() => changeView("c")} view="Games" />
      <ViewButton onClick={() => changeView("d")} view="Stats" />
    </div>
  )
}
