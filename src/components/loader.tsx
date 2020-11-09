import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="outer">
      <div className="middle">
        <div style={{ margin: "auto" }} className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
