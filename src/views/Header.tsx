import styled from "styled-components"
import "../styles/Header.scss"
import { Theme } from "../utils/types"

type Props = {
  themeChange: () => void
  theme: Theme
}

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
  transition:
    background-color 0.3s,
    color 0.3s;
`

const ThemeSwitchButton = styled.button`
  background-color: ${(props) => props.theme.colors.switchBgc};
  color: ${(props) => props.theme.colors.primaryTextColor};
  &:hover {
    background-color: ${(props) => props.theme.colors.switchBgcHover};
  }
`

export const Header = ({ themeChange, theme }: Props) => {
  return (
    <StyledHeader className="header">
      <div className="header__text">
        <strong style={{ marginLeft: "15px" }}>FOOTBALL APP ®</strong>
      </div>
      <div className="header__container">
        <div className="container">
          <ThemeSwitchButton
            onClick={themeChange}
            className="theme-toggle-button"
          >
            {theme === "light" ? "Light" : "Dark"}
          </ThemeSwitchButton>
        </div>
        <div>Created by Paweł Jarecki</div>
      </div>
    </StyledHeader>
  )
}
