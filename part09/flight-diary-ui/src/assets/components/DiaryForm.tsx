import React from "react";

interface Props {
  // Define the props for your component here
}

const DiaryForm: React.FC<Props> = (props) => {
  // Add your component logic here

  return (
    <div >
      <form>
        <label htmlFor="name">Date:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="visibility">Visibility:</label>
        <input type="text" id="visibility" name="visibility" />

        <label htmlFor="weather">Weather:</label>
        <input type="text" id="weather" name="weather" />

        <label htmlFor="comment">Comment:</label>
        <input id="comment" name="comment" />
        <button onSubmit={() => {}}>Submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;
