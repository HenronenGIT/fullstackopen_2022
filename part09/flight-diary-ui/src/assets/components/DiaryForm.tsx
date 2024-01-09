import React from "react";

interface Props {
  // setDiaries: (diaries: {}) => void;
  // Define the props for your component here
}

const DiaryForm: React.FC<Props> = (props) => {
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //       event.preventDefault();
  //       const newDiary = {
  //         date: event.target.date.value,
  //         visibility: event.target.visibility.value,
  //         weather: event.target.weather.value,
  //         comment: event.target.comment.value,
  //       };

  //       props.setDiaries(diaries.concat(newDiary));
  //     };
  //   };

  return (
    <div>
      <form>
        <label>Date:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="visibility">Visibility:</label>
        <input type="text" id="visibility" name="visibility" />

        <label htmlFor="weather">Weather:</label>
        <input type="text" id="weather" name="weather" />

        <label htmlFor="comment">Comment:</label>
        <input id="comment" name="comment" />
        {/* <button onSubmit={() => handleSubmit()}>Submit</button> */}
      </form>
    </div>
  );
};

export default DiaryForm;
