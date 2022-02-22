import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ToursList from "./ToursList";

const url = "https://course-api.com/react-tours-project";

const Tours = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const loadedData = [];
      for (const key in data) {
        loadedData.push({ ...data[key] });
      }
      setTours(loadedData);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(()=> {
      fetchTours();
  },[])

  if (isLoading) {
      return <LoadingSpinner />
  }

  return (
    <>
      <h1 style={{textAlign:'center', marginBottom: '0'}}>Our Tours</h1>
      <div style={{width: '6rem', backgroundColor:'lightblue', height:'0.2rem', margin:'0.1rem auto 1rem'}}></div>
      <ToursList allTours={tours}/>
    </>
  );
};

export default Tours;
