import React from "react";
import "./Chatmessage.css";
import { Avatar } from "@mui/material";
//{ timestamp, message, user } {new Date(timestamp?.toDate()).toUTCString()}
//
//src={photoURL}
function Chatmessage({ chatm, photo, timestamp, name }) {
  return (
    <div className="chatmessage">
      <Avatar src={photo} />
      <div className="chat__messageinfo">
        <h3>{name}</h3>
        <p>{chatm}</p>
      </div>
      <div className="chat__messagetime">
        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
      </div>
    </div>
  );
}

export default Chatmessage;
