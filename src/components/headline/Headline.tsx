import "../../styles/Headline.scss"

type Props = {
  text: string
}

export const Headline = ({ text }: Props) => {
  return (
    <div className="headline">
      <h1 className="headline__text">{text}</h1>
    </div>
  )
}
