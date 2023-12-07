import React from "react";

export const CircularIcon = ({ imageUrl }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "9999px",
      }}
    >
      <img
        src={imageUrl}
        alt="Icon"
        className="rounded-full bg-white"
        width={40}
        height={40}
      />
    </div>
  );
};
