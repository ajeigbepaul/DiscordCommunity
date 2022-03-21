import React, { useState } from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import "./Input.css";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import GifIcon from "@mui/icons-material/Gif";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";

function Input() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const handlechange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <>
      <AddCircleOutline />
      <form onSubmit={handleSubmit}>
        <input
          disabled={!channelId}
          type="text"
          value={input}
          placeholder={`message #${channelName}`}
          onChange={handlechange}
        />
        <button type="submit" className="chat__inputbtn">
          Send nessage
        </button>
      </form>
      <div className="chaticons">
        <CardGiftcardIcon />
        <GifIcon />
        <InsertEmoticon className="chaticons__hover" />
      </div>
    </>
  );
}

export default Input;
