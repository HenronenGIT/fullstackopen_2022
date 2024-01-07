import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((part, key) => (
        <Part key={key} part={part} />
      ))}
    </>
  );
};

export default Content;
