import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Searched = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=66ff906cd6fc4f3dba34e375df936e59&query=${search}`
    );
    const data = await resp.json();
    return data.results;
  };

  useEffect(() => {
    if (params.search) {
      getSearchedRecipes(params.search).then((data) => {
        setSearchedRecipes(data);
        setSearchTerm(params.search);
      });
    }
  }, [params.search]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${searchTerm}`);
  };

  return (
    <>
      <SearchForm onSubmit={submitHandler}>
        
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
        />
      </SearchForm>
      <Grid>
        {searchedRecipes.map(({ title, id, image }) => (
          <Card key={id}>
            <Link to={`/recipe/${id}`}>
              <img src={image} alt={title} />
              <h4>{title}</h4>
            </Link>
          </Card>
        ))}
      </Grid>
    </>
  );
};

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  svg {
    position: absolute;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }
`;

const Input = styled.input`
  width: min(500px, 80%);
  padding: 10px 10px 10px 40px;
  font-size: 1.2rem;
  border-radius: 20px;
  border: none;
  outline: none;
  background: linear-gradient(35deg, #494949, #313131);
  color: #fff;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  padding: 1rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 2rem;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 2rem 2rem;
  }
`;

export default Searched;
