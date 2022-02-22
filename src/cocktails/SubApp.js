import { Routes, Route } from "react-router";
import About from "./pages/About";
import CocktailDetail from "./pages/CocktailDetail";
import CocktailPage from "./pages/CocktailPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./ui/Layout";

const SubApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cocktails" element={<CocktailPage />} />
        <Route path="/cocktails/:cocktailId" element={<CocktailDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default SubApp;
