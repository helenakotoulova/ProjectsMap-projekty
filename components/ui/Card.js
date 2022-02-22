import classes from "./Card.module.css";

function Card(props) {
  return <div className={classes.card}>
      {props.children}
      </div>;
}

export default Card;

// to props.children tam musi byt aby se udelaly ty veci co jsou v meetupitems.js obalene Card
