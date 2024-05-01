import { Link } from "react-router-dom";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork, GiSpoon } from "react-icons/gi";

const apiKey = "a4c49f7457484bb98d3853b12e3b461a"; // New API Key

const App = () => {
  return (
    <div>
      <Nav>
        <GiSpoon />
        <Logo to={"/"}>Let me Cook!</Logo>
        <ButtonLink to="/Signup">Signup</ButtonLink>
        <ButtonLink to="/Login">Login</ButtonLink>
        <ButtonLink to="/RecipeList">RecipeList</ButtonLink>

      </Nav>
      
      
      <Pages />
    </div>
  );
};

const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  margin-left: 1rem;
  font-size: 1rem;
  color: #333;
  &:hover {
    color: #666; // Change color on hover if desired
  }
`;

export default App;
