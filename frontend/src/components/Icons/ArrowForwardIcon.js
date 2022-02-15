function ArrowForwardIcon(props) {
  return (
    <svg
      className={props.className}
      width={props.width || "18"}
      height={props.height || "18"}
      style={{ transform: "rotate(180deg)" }}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91699 7H11.0837"
        stroke={props.color || "#000000"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 2.9165L11.0833 6.99984L7 11.0832"
        stroke={props.color || "#000000"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowForwardIcon;
