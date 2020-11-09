import React from "react";
import { useQuery } from "@apollo/client";
import { ArrowBack } from "@material-ui/icons";
import { useMyContext } from "../pages/Home";
import { DETAILS } from "../gql";
import { userDetails } from "../types";

type Props = {
  pic: string;
};

const Profile: React.FC<Props> = ({ pic }: Props) => {
  const { data } = useQuery<userDetails>(DETAILS);
  const { setProfile } = useMyContext();
  return (
    <div style={{ background: "#ededed" }} className="newchat">
      <div className="chatheader">
        <div className="back">
          <div style={{ cursor: "pointer" }} onClick={() => setProfile(false)}>
            <ArrowBack />
          </div>
          <div className="text">Profile</div>
        </div>
      </div>

      <div className="upload">
        <div
          className="image"
          style={{
            backgroundImage: `url(${pic})`,
          }}
        ></div>
      </div>
      <div className="details">
        <div className="headertext">Your Name</div>
        <div className="content">
          <div style={{ flex: 3 }}>{data?.userDetails.fullname}</div>
        </div>
      </div>
      <div className="warning">
        <div>
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </div>
      </div>
      <div className="details">
        <div className="headertext">About</div>
        <div className="content">
          <div style={{ flex: 3 }}>
            {data?.userDetails.bio || "Hey there! I am using WhatsApp."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
