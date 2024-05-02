import { Link } from "react-router-dom";
import Pages from "./pages/Pages";
import styled, { createGlobalStyle } from "styled-components";
import { GiKnifeFork, GiSpoon } from "react-icons/gi";

const apiKey = "a4c49f7457484bb98d3853b12e3b461a"; // New API Key

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #121212; // Dark background for the entire page
    color: #e0e0e0; // Light text for contrast
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Nav>
        <GiSpoon style={{ color: "#4caf50" }} />
        <Logo to={"/"}>Let me Cook!</Logo>
        <ButtonLink to="/Signup">Signup</ButtonLink>
        <ButtonLink to="/Login">Login</ButtonLink>
        <ButtonLink to="/RecipeList">RecipeList</ButtonLink>
      </Nav>
      <Pages />
    </>
  );
};

const Nav = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #333; // Darker shade for nav
  box-shadow: 0 4px 2px -2px gray; // Subtle shadow for depth

  svg {
    font-size: 2.5rem;
    color: #4caf50; // Color for icons
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 500;
  font-family: "Lobster Two", cursive;
  color: #ffffff;
  margin: 0 20px;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  margin-left: 1rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: #e0e0e0;
  background: #424242; // Dark button backgrounds
  border-radius: 10px; // Rounded corners for buttons
  &:hover {
    background: #616161; // Slightly lighter on hover
    color: #ffffff;
  }
`;

export default App;
