import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetUpsPage() {

  const [isLoading, setIsLoading] = useState(true); // na zacatku chceme, aby se to loadovalo.
  // pockame az budeme mit data.
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://meetup-projekt-znovu-default-rtdb.firebaseio.com/meetups.json" // default is get fata.
    )
      .then((response) => {
        return response.json(); // fetch returns promise
      })
      .then((data) => {
        const meetups = []; // we need to transform data into array
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key], // ... spread operator
          };
          meetups.push(meetup);
        }
        setIsLoading(false); // takhle to ale pobezi furt dal (infinit loop), proto pridame useEffect
        setLoadedMeetups(meetups);
      });
  }, []); // do toho array bychom dali porovnavaci kriterium (resp. dependency criterium, ktery rika, kdy ma ten kod v Useeffect bezet), ale zde nam to pobezi proste jednou,
  // kdyz se ta stranka renderuje

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }


  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
export default AllMeetUpsPage;

/*
u toho useEffectu mam empty array. tzn useEffect pobezi pouze jednou, po initial renderu stranky.
kdyz pak budu mackat re-render button, tak se znovu nespusti. (v consoli neuvidim 'render')
*/
