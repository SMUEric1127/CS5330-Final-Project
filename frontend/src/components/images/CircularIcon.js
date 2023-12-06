import React from "react";

export const CircularIcon = ({ imageUrl }) => {
  return (
    <div className="rounded-full overflow-hidden">
      <img
        src={imageUrl}
        alt="Icon"
        className="object-cover"
        width={40}
        height={40}
      />
    </div>
  );
};
