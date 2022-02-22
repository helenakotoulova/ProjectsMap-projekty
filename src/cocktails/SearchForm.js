import classes from "./SearchForm.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchForm = ({ cocktails }) => {
  const [term, setTerm] = useState("");
  const [filtered, setFiltered] = useState(cocktails);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setFiltered(
      cocktails.filter((cocktail) => {
        let cocktailUpper = cocktail.strDrink.toUpperCase();
        let termUpper = term.toUpperCase();
        return cocktailUpper.startsWith(termUpper);
      })
    );

    /*setFiltered(cocktails.filter((cocktail) => {
        /*const editedFirstLetter = term.charAt(0).toUpperCase();
        let editedTerm = term.slice(1);
        editedTerm = editedFirstLetter.concat(editedTerm);
        console.log(term,editedTerm)
        return cocktail.strDrink.startsWith(editedTerm);
      })
    );*/
  }, [term]);

  return (
    <section>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Search your favorite cocktail!</label>
        <input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </form>
      <ul className={classes.list}>
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
      </ul>
    </section>
  );
};

export default SearchForm;

/* NEBO:
const SearchForm = ({onFilter}) => {
    useEffect(()=> {
        onFilter(term)
    }, [term])

    return (
         <input type='text' value={term} onChange={(event)=> setTerm(event.target.value)} />
    )
}
*/
