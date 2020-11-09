import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Chat from "./chat/container";
import List from "./list/container";
import { Friends, userDetails, Users } from "../types";
import { DETAILS, FRIENDS_UPDATE, GET_FRIENDS, USERS } from "../gql";
import ListHeader from "./list/header";
import ChatHeader from "./chat/header";
import SearchBar from "./searcbar";
import "../styles/home.scss";
import { useMyContext } from "../pages/Home";
import NewChat from "./list/newChat";
import Profile from "./profile";
import Loader from "./loader";

const Container: React.FC = () => {
  const { subscribeToMore, refetch, data, loading } = useQuery<Friends>(
    GET_FRIENDS
  );
  const [state, setState] = useState(true);
  const usersQuery = useQuery<Users>(USERS);
  const profilepic = useQuery<userDetails>(DETAILS).data?.userDetails
    .profilepic;

  const {
    setId,
    displayChat,
    setDisplayChat,
    current,
    setCurrent,
  } = useMyContext();
  const [prev, setPrev] = useState("");

  useEffect(() => {
    setState(false);
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: FRIENDS_UPDATE,
      //@ts-ignore
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        setPrev("");
        refetch();
      },
    });
  }, [data, subscribeToMore, refetch]);
  const { friendSearch, newChat, profile } = useMyContext();
  return (
    <div className="container">
      {state && loading ? (
        <Loader />
      ) : newChat ? (
        <div className="listcontainer">
          {/* @ts-ignore */}
          <NewChat users={usersQuery.data} />
        </div>
      ) : (
        <>
          {profile ? (
            <div style={{ background: "#ededed" }} className="listcontainer">
              <Profile pic={profilepic || ""} />
            </div>
          ) : (
            <div className="listcontainer">
              <ListHeader profilepic={profilepic} />
              <div className="searchContainer">
                <SearchBar component="friends" />
              </div>
              <div className="friends">
                {data?.friends.map((friend, id) => {
                  return (
                    <div
                      className="friend"
                      onClick={() => {
                        setDisplayChat(true);
                        setPrev(current.username);
                        setCurrent({
                          username: friend.username,
                          online: friend.online,
                          profilepic: friend.profilepic,
                        });
                        setId(friend.conversationId);
                        refetch();
                      }}
                      key={id}
                    >
                      {friendSearch ? (
                        <>
                          {friend.username
                            .toLowerCase()
                            .includes(friendSearch.toLowerCase()) &&
                            friend.lastmessage !== "" && (
                              <List
                                friend={friend}
                                current={current.username}
                                prev={prev}
                              />
                            )}
                        </>
                      ) : (
                        friend.lastmessage !== "" && (
                          <List
                            friend={friend}
                            current={current.username}
                            prev={prev}
                          />
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {displayChat ? (
        <div style={{ width: "65vw" }}>
          <ChatHeader />
          <Chat />
        </div>
      ) : (
        <div className="none"></div>
      )}
    </div>
  );
};

export default Container;
