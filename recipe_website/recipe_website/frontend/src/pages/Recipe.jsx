import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

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

    return () => {
      isMounted = false; // Clean up the effect
    };
  }, [params.id]);

  const saveRecipe = async () => {
    try {
      await axios.post('http://localhost:4000/api/recipes/save', {
        id: details.id,
        title: details.title,
        image: details.image,
        cuisines: details.cuisines,
        ingredients: details.extendedIngredients.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.original
        })),
        instructions: details.instructions,
        dietaryPreferences: details.dietaryPreferences,
        cookingTime: details.readyInMinutes,
        difficulty: details.difficulty,
        nutritionalInfo: {
          calories: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Calories')?.amount,
          protein: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Protein')?.amount,
          carbs: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Carbohydrates')?.amount,
          fats: details.nutrition?.nutrients.find(nutrient => nutrient.title === 'Fat')?.amount
        },
        healthBenefits: details.healthBenefits,
        ratings: details.averageRating,
        shoppingList: details.shoppingList,
        pricePerServing: details.pricePerServing,
        spoonacularScore: details.spoonacularScore
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving the recipe:', error);
      alert('Failed to save recipe');
    }
  };
  

  return (
    <Wrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
        <Button onClick={saveRecipe}>Save Recipe</Button>
      </div>
      <Info>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients?.map(({ id, original }) => (
              <li key={id}>{original}</li>
            ))}
          </ul>
        )}
        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10rem inherit 5rem;
  display: flex;

  @media (max-width: 1068px) {
    flex-direction: column;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8rem;

    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;

  @media (max-width: 1068px) {
    margin-top: 3rem;
    margin-left: 1rem;
  }
`;

export default Recipe;
