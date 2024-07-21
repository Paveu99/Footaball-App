import styled from "styled-components"
import "../styles/Footer.scss"

const StyledFooter = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const Footer = () => {
  console.log("footer")

  return (
    <StyledFooter className="footer">
      <footer className="footer__text">All rights belong to the creator</footer>
    </StyledFooter>
  )
}
