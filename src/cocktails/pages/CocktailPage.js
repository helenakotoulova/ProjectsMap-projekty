import CocktailList from "../CocktailList";

const CocktailPage = () => {
  return (
    <section>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom:'0' }}>Our cocktails</h1>
      <CocktailList />
    </section>
  );
};

export default CocktailPage;
