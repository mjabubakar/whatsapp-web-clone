import React, { useState } from "react";
import { ArrowBack, Search } from "@material-ui/icons";
import { useMyContext } from "../pages/Home";

interface Props {
  component: string;
}

const SearchBar: React.FC<Props> = ({ component }: Props) => {
  const [state, setState] = useState(false);
  const {
    friendSearch,
    setFriendSearch,
    userSearch,
    setUserSearch,
  } = useMyContext();

  return (
    <div
      className="searchbarContainer"
      style={{ background: state ? "white" : "" }}
    >
      <div className="searchbar">
        <div className="searchicon">
          {state ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => component === "users" && setState(false)}
            >
              <ArrowBack style={{ width: 25, color: "#5dbcd2" }} />
            </div>
          ) : (
            <Search style={{ width: 20 }} />
          )}
        </div>
        <div style={{ width: "85%" }}>
          <input
            onFocus={() => setState(true)}
            onBlur={() => component === "friends" && setState(false)}
            autoFocus={component === "users" ? true : false}
            placeholder={state ? "" : "Search or start new chat"}
            className="searchinput"
            value={component === "users" ? userSearch : friendSearch}
            onChange={(e) =>
              component === "users"
                ? setUserSearch(e.target.value)
                : setFriendSearch(e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
