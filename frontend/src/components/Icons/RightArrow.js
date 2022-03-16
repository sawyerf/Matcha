function RightArrow(props) {
  return (
    <svg
      style={{
        cursor: "pointer",
        display: props.display,
        transform: props.rotate,
      }}
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
    </svg>
  );
}

export default RightArrow;
