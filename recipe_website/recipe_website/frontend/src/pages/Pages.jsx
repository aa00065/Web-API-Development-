import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Cuisines from "./Cuisines";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/login"; // Import the Signup component
import Signup from "../pages/signup"; // Import the Login component
import RecipeList from "../pages/RecipeList"
import Recipesaved from "../pages/Recipesaved"



const Pages = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisines/:type" element={<Cuisines />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RecipeList" element={<RecipeList />} />
        <Route path="/Recipesaved/:id" element={<Recipesaved />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
