import data from "./data";
import classes from "./Reviews.module.css";
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const Reviews = () => {
  const checkIndex = (number) => {
    if (number === -1) {
      return data.length - 1;
    } else if (number === data.length) {
      return 0;
    } else {
      return number;
    }
  };
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(randomPerson, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  const randomPerson = () => {
    let number = Math.floor(Math.random() * data.length);
    if (number === index) {
      number++;
    }
    const checkedNumber = checkIndex(number);
    setIndex(checkedNumber);
  };

  const prevHandler = () => {
    setIndex((prevIndex) => {
      const number = prevIndex - 1;
      const checkedNumber = checkIndex(number);
      setIndex(checkedNumber);
    });
  };

  const nextHandler = () => {
    setIndex((prevIndex) => {
      const number = prevIndex + 1;
      const checkedNumber = checkIndex(number);
      setIndex(checkedNumber);
    });
  };

  return (
    <section className={classes.section}>
      <h1 className={classes.header}>
        <span
          style={{ color: "orange", fontWeight: "bold", marginRight: "1rem" }}
        >
          /
        </span>
        Reviews
      </h1>
      <ul className={classes.list}>
        {data.map((person, personIndex) => {
          if (personIndex === index) {
            return (
              <li key={person.id} className={classes.card}>
                <div className={classes.imageContainer}>
                  <img src={person.image} className={classes.image} />
                  <span className={classes.badge}>
                    <FaQuoteRight />
                  </span>
                </div>
                <h3>{person.name}</h3>
                <h4>{person.title}</h4>
                <p>{person.quote}</p>
                <div>
                  <FaQuoteRight
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                      fontSize: "2rem",
                    }}
                  />
                </div>
              </li>
            );
          }
        })}
      </ul>
      <div className={classes.surpriseActions}>
        <button className={classes.surpriseBtn} onClick={randomPerson}>
        Surprise Me!
      </button>  
      </div>
      
      <div className={classes.carouselActions}>
          {data.map((item,itemIndex)=> {
              return (
                   <button key={itemIndex} onClick={()=> setIndex(itemIndex)} style={(itemIndex === index)? {backgroundColor:'orange'} :{}} className={classes.carousel}></button>)
          })
         }
      </div>
      <div>
        <FaChevronLeft onClick={prevHandler} className={classes.left} />
        <FaChevronRight onClick={nextHandler} className={classes.right} />
      </div>
    </section>
  );
};

export default Reviews;
