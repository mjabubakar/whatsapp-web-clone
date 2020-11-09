import React from "react";
import { MoreVert, Search } from "@material-ui/icons";
import { useMyContext } from "../../pages/Home";

const Header: React.FC = () => {
  const { current } = useMyContext();
  return (
    <div className="header chat">
      {current.profilepic && (
        <div className="profilepic">
          {current.profilepic && (
            <img src={current.profilepic} alt={current.username} />
          )}
        </div>
      )}

      <div className="text">
        <div style={{ fontSize: "1em" }}>{current.username}</div>
        <div className="online">
          {current.online === "Online" ? "Online" : current.online}
        </div>
      </div>

      <div className="icons">
        <div>
          <Search />
        </div>
        <div>
          <MoreVert />
        </div>
      </div>
    </div>
  );
};

export default Header;
