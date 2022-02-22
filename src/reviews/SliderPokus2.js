import data from "./data";
import classes from "./SliderPokus2.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const checkNumber = (number) => {
  if (number === data.length) {
    return 0;
  } else if (number < 0) {
    return data.length - 1;
  } else {
    return number;
  }
};

const SliderPokus2 = () => {
  const [index, setIndex] = useState(0);

  const nextHandler = () => {
    const number = index + 1;
    const checkedNumber = checkNumber(number);
    setIndex(checkedNumber);
  };

  const prevHandler = () => {
    const number = index - 1;
    const checkedNumber = checkNumber(number);
    setIndex(checkedNumber);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const number = index + 1;
      const checkedNumber = checkNumber(number);
      setIndex(checkedNumber);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <section>
      <h1 className={classes.header}>
        <span
          style={{ color: "orange", fontWeight: "bold", marginRight: "1rem" }}
        >
          /
        </span>
        Reviews
      </h1>
      <div className={classes.mainSection}>
        {data.map((person, personIndex) => {
          let position = "nextSlide";
          if (index === personIndex) {
            position = "activeSlide";
          } else if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === data.length - 1)
          ) {
            position = "prevSlide";
          }
          return (
            <article
              key={person.id}
              className={`${classes.article} ${classes[position]}`}
            >
              <div className={classes.imageContainer}>
                <img
                  src={person.image}
                  alt={person.name}
                  className={classes.img}
                />
              </div>
              <h3>{person.name}</h3>
              <h4>{person.title}</h4>
              <p>{person.quote}</p>
            </article>
          );
        })}
      </div>
      <div>
        <FaChevronLeft onClick={prevHandler} className={classes.left} />
        <FaChevronRight onClick={nextHandler} className={classes.right} />
      </div>
      <div className={classes.sliderButtons}>
        {data.map((item, itemIndex) => {
          return <button onClick={()=> setIndex(itemIndex)} key={itemIndex} style={{backgroundColor: (index===itemIndex)? 'orange': 'transparent'}}>{item.index}</button>;
        })}
      </div>
    </section>
  );
};

export default SliderPokus2;
