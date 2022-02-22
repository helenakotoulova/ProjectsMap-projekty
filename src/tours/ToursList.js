import classes from "./ToursList.module.css";
import { useState } from "react";

const ToursList = ({ allTours }) => {
  const [shortVersion, setShortVersion] = useState(true);
  const [tours, setTours] = useState(allTours);

  const deleteHandler = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (tours.length === 0) {
      return <p style={{textAlign:'center', color: 'maroon', font:'inherit', fontWeight:'bold', fontSize: '2rem', marginTop: '5rem'}}>No Tours to Display!</p>
  }

  return (
    <ul className={classes.list}>
      {tours.map((tour) => (
        <li key={tour.id} className={classes.card}>
          <img src={tour.image} alt="Tour" />
          <div className={classes.info}>
            <div className={classes.subInfo}>
              <span className={classes.name}>{tour.name}</span>
              <span className={classes.price}>{tour.price} $</span>
            </div>
            <p className={classes.text}>
              {shortVersion ? tour.info.slice(0, 200).concat("...") : tour.info}
              <button
                className={classes.readMoreBtn}
                onClick={() => setShortVersion((prevState) => !prevState)}
              >
                {shortVersion ? "Read More" : "Show Less"}
              </button>
            </p>
          </div>
          <div className={classes.actions}>
            <button
              onClick={deleteHandler.bind(null, tour.id)}
              className={classes.notInterestedBtn}
            >
              Not Interested
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ToursList;
