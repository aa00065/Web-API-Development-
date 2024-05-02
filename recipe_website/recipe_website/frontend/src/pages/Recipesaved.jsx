import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Recipesaved = () => {
  const [details, setDetails] = useState({});
  const params = useParams();

  const fetchDetails = async () => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=66ff906cd6fc4f3dba34e375df936e59`
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return {};
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchDetails().then((data) => {
      if (isMounted) setDetails(data);
    });
    return () => { isMounted = false; };
  }, [params.id]);

  const removeRecipe = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/recipes/${details.id}`);
      alert('Recipe removed successfully!');
    } catch (error) {
      console.error('Error removing the recipe:', error);
      alert('Failed to remove recipe');
    }
  };

  return (
    <Wrapper>
      <ContentArea>
        <ImageWrapper>
          <img src={details.image} alt={details.title} />
        </ImageWrapper>
        <Info>
          <h2>{details.title}</h2>
          <Button onClick={removeRecipe}>Remove Recipe</Button>
          <Section>
            <SectionTitle>Ingredients</SectionTitle>
            <ul>
              {details.extendedIngredients?.map(({ id, original }) => (
                <li key={id}>{original}</li>
              ))}
            </ul>
          </Section>
          <Section>
            <SectionTitle>Instructions</SectionTitle>
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          </Section>
        </Info>
      </ContentArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 1 1 40%;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;

const Info = styled.div`
  flex: 1 1 60%;
  padding-left: 20px;
  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #FFF;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #555;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #FFD700;
  margin-bottom: 10px;
`;

export default Recipesaved;
