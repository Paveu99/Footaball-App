import "../styles/Header.scss"

export const Header = () => {
  console.log("header")

  return (
    <div className="header">
      <div className="header__text">
        <strong>FOOTBALL APP ®</strong>
      </div>
      <div className="header__text">Created by Paweł Jarecki</div>
    </div>
  )
}
