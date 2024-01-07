interface PartProps {
  part: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    requirements?: string[];
    backgroundMaterial?: string;
    kind: string;
  };
}

const Part = (props: PartProps) => {
  const getPart = (part: any) => {
    switch (part.kind) {
      case "basic":
        return (
          <>
            <p>{part.description}</p>
          </>
        );
      case "group":
        return (
          <>
            <p>project exercises {part.groupProjectCount}</p>
          </>
        );
      case "special":
        return (
          <>
            <p>{part.description}</p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </>
        );
      case "background":
        return (
          <>
            <p>{part.description}</p>
            <p>background material: {part.backgroundMaterial}</p>
          </>
        );
    }
  };
  return (
    <>
      <h3>
        {props.part.name} {props.part.exerciseCount}
      </h3>
      {getPart(props.part)}
    </>
  );
};

export default Part;
