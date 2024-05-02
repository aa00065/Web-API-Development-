import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${searchTerm}`);
  };

  return (
    <Form onSubmit={submitHandler}>
      <SearchContainer>
        <StyledFaSearch />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
        />
      </SearchContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SearchContainer = styled.div`
  position: relative;
  width: min(550px, 90%);
  margin: 0 auto;
`;

const StyledFaSearch = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  font-size: 1.2rem;
  border-radius: 20px;
  border: none;
  outline: none;
  background: linear-gradient(35deg, #494949, #313131);
  color: #fff;
  transition: background 0.3s ease;

  &:focus {
    background: linear-gradient(35deg, #313131, #494949);
  }

  &::placeholder {
    color: #ccc;
  }
`;

export default Search;
