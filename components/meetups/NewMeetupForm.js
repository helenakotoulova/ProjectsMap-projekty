import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetUpForm(props) {
  const titleInputref = useRef();
  const imageInputref = useRef();
  const addressInputref = useRef();
  const descriptionInputref = useRef();

  function submitHandler(event) {
    event.preventDefault(); // bude preventovat to co by browser udelal defaultne
    const enteredTitle = titleInputref.current.value;
    const enteredImage = imageInputref.current.value;
    const enteredAddress = addressInputref.current.value;
    const enteredDescription = descriptionInputref.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea required id="description" rows="5" ref={descriptionInputref}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetUpForm;

// htmlFor je krome className dalsi jine oznaceni oproti klasickemu html - v klas. html je to jen "for"
