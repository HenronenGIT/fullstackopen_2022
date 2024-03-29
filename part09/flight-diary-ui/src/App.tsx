import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

type IDiary = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

type INewDiaryEntry = Omit<IDiary, "id">;

const baseUrl = "http://localhost:3001/api/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<IDiary[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [newDiary, setNewDiary] = useState<INewDiaryEntry>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  useEffect(() => {
    axios.get(baseUrl).then((resp) => setDiaries(resp.data));
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios
      .post<IDiary>(baseUrl, newDiary)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        } else {
          console.error(error);
        }
      });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, date: event.target.value });
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDiary({ ...newDiary, visibility: event.target.value });
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, weather: event.target.value });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, comment: event.target.value });
  };

  return (
    <>
      <div>
        <h2>Add new</h2>
        <div className="errorMessage">
          {notification && <p>{notification}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newDiary.date}
              onChange={handleDateChange}
            />

            <fieldset>
              <legend>Visibility:</legend>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="great"
                  onChange={handleVisibilityChange}
                />
                Great
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="good"
                  onChange={handleVisibilityChange}
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="ok"
                  onChange={handleVisibilityChange}
                />
                OK
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="poor"
                  onChange={handleVisibilityChange}
                />
                Poor
              </label>
            </fieldset>

            <div>
              <fieldset>
                <legend>Weather:</legend>
                <label>
                  <input
                    type="radio"
                    name="weather"
                    value="sunny"
                    onChange={handleWeatherChange}
                  />
                  Sunny
                </label>
                <label>
                  <input
                    type="radio"
                    name="weather"
                    value="rainy"
                    onChange={handleWeatherChange}
                  />
                  Rainy
                </label>
                <label>
                  <input
                    type="radio"
                    name="weather"
                    value="cloudy"
                    onChange={handleWeatherChange}
                  />
                  Cloudy
                </label>
                <label>
                  <input
                    type="radio"
                    name="weather"
                    value="stormy"
                    onChange={handleWeatherChange}
                  />
                  Stormy
                </label>
                <label>
                  <input
                    type="radio"
                    name="weather"
                    value="windy"
                    onChange={handleWeatherChange}
                  />
                  Windy
                </label>
              </fieldset>
            </div>

            <label htmlFor="comment">Comment:</label>
            <input id="comment" name="comment" onChange={handleCommentChange} />
            <div>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>

      <h2>Diary entries</h2>
      {diaries.map((d, key) => (
        <div key={key}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
          <p>comment: {d.comment}</p>
        </div>
      ))}
    </>
  );
};

export default App;
