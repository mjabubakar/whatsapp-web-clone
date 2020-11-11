import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { LATEST_MESSAGE, SET_COUNT } from "../../gql";
import { useMyContext } from "../../pages/Home";

interface Iprops {
  data: any;
}
const Messages: React.FC<Iprops> = (props) => {
  const convertToTime = (createdAt: number) => {
    const date = new Date(createdAt);
    let hours: any = date.getHours();
    let time = "AM";
    let minutes: any = date.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours > 12) {
      hours = hours - 12;
      time = "PM";
    } else if (hours < 1) {
      hours = "12";
      time = "AM";
    }

    return hours + ":" + minutes + " " + time;
  };

  function days(t: number) {
    const date = new Date(t);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let minutes: any = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let currentDate = new Date();
    if (
      `${day}/${month}/${year}` ===
      `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`
    ) {
      return "TODAY";
    }
    currentDate.setDate(currentDate.getDate() - 1);

    if (date > currentDate) return `YESTERDAY`;

    return `${day}/${month + 1}/${year}`;
  }

  const { id, current } = useMyContext();
  const [setcount] = useMutation(SET_COUNT, {
    variables: {
      id,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [props.data.data]);
  useEffect(() => {
    props.data.subscribeToMore({
      document: LATEST_MESSAGE,
      variables: {
        id,
      },
      //@ts-ignore
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        setcount();
        return {
          directMessages: [
            ...prev.directMessages,
            subscriptionData.data.directMessageSent,
          ],
        };
      },
    });
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    setcount();
  }, [setcount]);
  return (
    <>
      {props.data.error && <div></div>}
      <div className="messages">
        {props.data.data &&
          //@ts-ignore
          props.data.data.directMessages.map((data, id) => {
            return (
              <div key={id}>
                <div
                  style={{
                    textAlign:
                      data.sentBy === current.username &&
                      data.message !== "official"
                        ? "left"
                        : data.message === "official"
                        ? "center"
                        : "right",
                  }}
                  key={id}
                >
                  <div
                    className="messageContainer"
                    style={{
                      background:
                        data.sentBy === current.username &&
                        data.message !== "official"
                          ? "#ffffff"
                          : data.message === "official"
                          ? "#e1f3fb"
                          : "#dbf4c6",
                      borderRadius: data.message === "official" ? "10px" : "",
                      fontSize: data.message === "official" ? "0.8em" : "",
                    }}
                  >
                    <div className="text">
                      {data.message !== "official" ? (
                        <>
                          <div className="message">{data.message}</div>
                          <div className="time">
                            {convertToTime(parseInt(data.time))}
                          </div>
                        </>
                      ) : (
                        <div style={{}}>{days(parseInt(data.time))}</div>
                      )}
                      <div ref={messagesEndRef}></div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Messages;
