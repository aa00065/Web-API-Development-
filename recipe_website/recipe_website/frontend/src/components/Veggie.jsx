

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [random, setRandom] = useState([]);

  const getRandomRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=a4c49f7457484bb98d3853b12e3b461a&tags=vegetarian&number=10`
      );
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      setRandom(data.recipes);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
    }
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <Wrapper>
      <h3>Let's Eat healthy!! </h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            1024: {
              perPage: 3,
            },
            767: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        {random.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <Card>
              <Link to={`/recipe/${id}`}>
                <p>{title}</p>
                <img src={image} alt={title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0;
  padding: 0 1rem;
  color: white; // Set all text inside the wrapper to white

  h3 {
    color: white; // Ensuring the title is specifically styled to be white
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: opacity 0.3s ease;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: 90%;
    text-align: center;
    font-weight: 600;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0,0,0,0.5);
    border-radius: 12px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%);
  z-index: 3;
  border-radius: 20px;
`;


export default Veggie;
