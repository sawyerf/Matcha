function RedCross(props) {
  return (
    <svg
      style={{ cursor: "pointer", marginTop: "-5px" }}
      width="70"
      height="70"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8286 9.17139L9.17176 14.8282"
        stroke="#FF0000"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.17139 9.17139L14.8282 14.8282"
        stroke="#FF0000"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default RedCross;
