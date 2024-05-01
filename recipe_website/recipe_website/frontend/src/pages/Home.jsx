import Random from "../components/Random";
import Veggie from "../components/Veggie";
import Search from "../components/Search";
import Category from "../components/Category";

import { motion } from "framer-motion";

const Home = () => {
  return (
    
    <motion.div>
      <Search />
      <Category />
      <Random />
      <Veggie />
    </motion.div>
  );
};

export default Home;
