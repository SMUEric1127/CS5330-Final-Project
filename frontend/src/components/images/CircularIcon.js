import React from "react";

export const CircularIcon = ({ imageUrl }) => {
  return (
    <div className="w-11 h-11 rounded-full overflow-hidden">
      <img src={imageUrl} alt="Icon" className="w-full h-full object-cover" />
    </div>
  );
};
