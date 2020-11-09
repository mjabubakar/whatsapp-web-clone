import React from "react";
import { ArrowBack } from "@material-ui/icons";
import { useMutation } from "@apollo/client";
import { useMyContext } from "../../pages/Home";
import { Users } from "../../types";
import SearchBar from "../searcbar";
import { START_CONVERSATION } from "../../gql";

interface Props {
  users: Users;
}

const NewChat: React.FC<Props> = ({ users }: Props) => {
  const [start] = useMutation(START_CONVERSATION);
  const {
    setNewChat,
    setId,
    setDisplayChat,
    setCurrent,
    userSearch,
  } = useMyContext();
  return (
    <div className="newchat">
      <div className="chatheader">
        <div className="back">
          <div style={{ cursor: "pointer" }} onClick={() => setNewChat(false)}>
            <ArrowBack />
          </div>
          <div className="text">New Chat</div>
        </div>
      </div>
      <div className="searchContainer">
        <SearchBar component="users" />
      </div>

      <div className="usersList">
        {users &&
          users.allUsers.map(({ profilepic, username, bio, online }, id) => {
            return (
              <div
                key={id}
                onClick={() => {
                  start({
                    variables: { username },
                  }).then(({ data }) => {
                    setId(data.startConversation);
                  });

                  setCurrent({
                    username,
                    online,
                    profilepic,
                  });
                  setDisplayChat(true);
                  setNewChat(false);
                }}
                className="userContainer"
              >
                {userSearch ? (
                  <>
                    {username
                      .toLowerCase()
                      .includes(userSearch.toLowerCase()) && (
                      <div className="user">
                        <div className="profilepic">
                          <img src={profilepic} alt={username} />
                        </div>
                        <div className="text">
                          <div>{username}</div>
                          <div className="bio">{bio}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="user">
                    <div className="profilepic">
                      <img src={profilepic} alt={username} />
                    </div>
                    <div className="text">
                      <div>{username}</div>
                      <div className="bio">{bio}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewChat;
