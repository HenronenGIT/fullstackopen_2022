import axios from "axios";
import { useEffect, useState } from "react";
import DiaryForm from "./assets/components/DiaryForm";

interface IDiary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<IDiary[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((resp) => setDiaries(resp.data));
  }, []);

  return (
    <>
      <DiaryForm />
      <h2>Diary entries</h2>
      {diaries.map((d, key) => (
        <div>
          <h3 key={key}>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
          <p>comment: {d.comment}</p>
        </div>
      ))}
    </>
  );
};

export default App;
