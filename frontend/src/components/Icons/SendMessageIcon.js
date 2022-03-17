import React from "react";

function SendMessageIcon(props) {
  return (
    <svg
      width={props.width || 22}
      height={props.height || 22}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
      style={{ cursor: "pointer", marginTop: "6px", marginLeft: "10px" }}
    >
      <g clipPath="url(#clip0_9928_7590)">
        <path
          d="M13.75 1.75L6.875 8.625"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 1.75L9.375 14.25L6.875 8.625L1.25 6.125L13.75 1.75Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9928_7590">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SendMessageIcon;
