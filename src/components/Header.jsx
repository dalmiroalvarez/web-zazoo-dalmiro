import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 1em 0;
  margin-bottom: 1em;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 2rem;
  color: white;

  @media (max-width: 768px) { 
    font-size: 1.5rem;
    padding: 0.8em 0;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.6em 0;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        The Zazoo Project
      </Link>
    </HeaderContainer>
  );
};

export default Header;
