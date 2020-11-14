import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import MessagesContainer from "./messages";
import { Messages } from "../../types";
import { MESSAGES, SEND_MESSAGE } from "../../gql";
import { AttachFile, EmojiEmotions, MicNoneSharp } from "@material-ui/icons";
import { useMyContext } from "../../pages/Home";
import Loader from "../loader";

const Chat: React.FC = () => {
  const { id } = useMyContext();
  const [message, setMessage] = useState("");
  const [send] = useMutation(SEND_MESSAGE, {
    variables: {
      id,
      message,
    },
  });
  const data = useQuery<Messages>(MESSAGES, {
    variables: { id },
  });

  useEffect(() => {
    setMessage("");
  }, [id]);

  const { setShow } = useMyContext();

  return (
    <div style={{ position: "fixed" }} className="chat">
      {data.loading && !data.data && <Loader />}
      <MessagesContainer data={data} />
      <div className="sendmessage">
        <div style={{ width: "5%", textAlign: "right" }}>
          <EmojiEmotions />
        </div>
        <div style={{ width: "5%", textAlign: "center" }}>
          <AttachFile />
        </div>
        <form
          style={{ width: "83%" }}
          onSubmit={(e) => {
            e.preventDefault();
            setShow(false);
            message && send();
            setMessage("");
          }}
        >
          <input
            placeholder="Write your message."
            type="text"
            value={message}
            onChange={(e) => {
              e.preventDefault();
              setMessage(e.target.value);
            }}
          />
        </form>

        <div style={{ width: "7%", textAlign: "center" }}>
          <MicNoneSharp />
        </div>
      </div>
    </div>
  );
};

export default Chat;
