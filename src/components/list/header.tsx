import React from "react";
import { Cached, Chat, MoreVert } from "@material-ui/icons";
import { useMyContext } from "../../pages/Home";

interface Props {
  profilepic: any;
}

const Header: React.FC<Props> = ({ profilepic }: Props) => {
  const {
    setNewChat,
    listOptions,
    setListOptions,
    setProfile,
    newChat,
  } = useMyContext();
  return (
    <div className="header list">
      {profilepic && (
        <div onClick={() => setProfile(true)} className="profilepic">
          <img src={profilepic} alt="profilepic" />
        </div>
      )}
      {listOptions && (
        <div className="listoptions">
          <div className="items">New group</div>
          <div className="items">Create room</div>
          <div className="items">Profile</div>
          <div className="items">Archived</div>
          <div className="items">Settings</div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </div>
        </div>
      )}
      <div className="icons">
        <div
          style={{
            padding: "5px",
          }}
        >
          <Cached />
        </div>
        <div
          onClick={() => setNewChat(true)}
          className="icon"
          style={{
            background: newChat ? "#d5d5d5" : "",
            borderRadius: newChat ? "50%" : "",
          }}
        >
          <Chat />
        </div>
        <div
          className="icon"
          style={{
            background: listOptions ? "#d5d5d5" : "",
            borderRadius: listOptions ? "50%" : "",
          }}
          onClick={() => setListOptions(!listOptions)}
        >
          <MoreVert />
        </div>
      </div>
    </div>
  );
};

export default Header;
