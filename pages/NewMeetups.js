import NewMeetUpForm from "../components/meetups/NewMeetupForm";
import { useNavigate } from "react-router-dom";

function NewMeetUpsPage() {
  const navigate = useNavigate();

  function addMeetupHandler(meetupData) {
    fetch(
      "https://meetup-projekt-znovu-default-rtdb.firebaseio.com/meetups.json",
      // standard js function, that allows us to send http request
      // my tam dame tu url nasi realtime databaze na firebase. tam se budou odesilat meetupdata.
      {
        method: "POST", // chceme posilat (post), ne odebirat (get - default)
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate('/'); // it will navigate us to the starting page, after the http request is sent
    });
  }
  return (
    <section>
      <h1>Added meetups</h1>
      <NewMeetUpForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
export default NewMeetUpsPage;
