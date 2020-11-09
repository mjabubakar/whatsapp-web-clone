import React from "react";
import { Friend } from "../../types";

interface Props {
  friend: Friend;
  prev: string;
  current: string;
}

const List: React.FC<Props> = ({ friend, current, prev }: Props) => {
  return (
    <div
      className="list"
      style={{ background: current === friend.username ? "#ebebeb" : "" }}
    >
      <div className="profilepic">
        <img
          src={friend.profilepic}
          alt={friend.username}
          className="profilepic"
        />
      </div>

      <div className="username">
        <div>{friend.username}</div>

        <div className="lastmessage">{friend.lastmessage}</div>
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            color:
              friend.username === current ||
              prev === friend.username ||
              friend.count === 0
                ? ""
                : "#6dd958",
          }}
          className="lastmsgTime"
        >
          {friend.lastmsgTime}
        </div>
        <>
          <div className="messagecount">
            <div
              className="container"
              style={{
                background:
                  friend.username === current ||
                  prev === friend.username ||
                  friend.count === 0
                    ? ""
                    : "#6dd958",
              }}
            >
              {friend.username === current ||
              prev === friend.username ||
              friend.count === 0 ? (
                ""
              ) : (
                <div>{friend.count}</div>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default List;
