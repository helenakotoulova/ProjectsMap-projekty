import { useState, useEffect, useCallback } from "react";
import classes from "./CocktailList.module.css";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const { drinks } = data;
      /* const loadedCocktails = [];
      for (const key in drinks) {
        loadedCocktails.push({ ...data[key] });
      }*/
      setCocktails(drinks);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <section className={classes.section}>
      {/*<SearchForm term={term} setTerm={setTerm} />*/}
      <SearchForm cocktails={cocktails}/>
      {/*<ul className={classes.list}>
        {filtered.map((cocktail) => (
          <li key={cocktail.idDrink} className={classes.cocktail}>
            <img src={cocktail.strDrinkThumb} />
            <div className={classes.info}>
              <h3>{cocktail.strDrink}</h3>
              <h4>{cocktail.strAlcoholic}</h4>
              <p>{cocktail.strGlass}</p>
              <Link to={`/cocktails/${cocktail.idDrink}`}>Details</Link>
            </div>
          </li>
        ))}
        </ul>*/}
    </section>
  );
};
export default CocktailList;
