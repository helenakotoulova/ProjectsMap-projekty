import { useState, useEffect } from "react";
import classes from "./Cocktail.module.css";
import { Link } from "react-router-dom";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
//https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}

const Cocktail = ({id}) => {
  const [cocktail, setCocktail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const { drinks } = data;
      setCocktail(drinks[0]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={classes.section}>
       <article className={classes.cocktail}>
            <img src={cocktail.strDrinkThumb} />
            <div className={classes.info}>
              <h3>{cocktail.strDrink}</h3>
              <h4>{cocktail.strAlcoholic}</h4>
              <p>{cocktail.strGlass}</p>
              <p>Instructions: {cocktail.strInstructions}</p>
              <Link to='/cocktails'>Back</Link>
            </div>
       </article>
    </section>
  );
};
export default Cocktail;
