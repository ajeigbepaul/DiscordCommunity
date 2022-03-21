import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Chatheader from "./Chatheader";
import Chatmessage from "./Chatmessage";
import { selectUser } from "./features/userSlice";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import "./Input.css";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import GifIcon from "@mui/icons-material/Gif";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector } from "react-redux";
import db from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const inputRef = useRef("");
  const scrollRef = useRef(null);
  const [message, setMessage] = useState([]);
  //needed when you want to listen to a statechange in the database and fetch

  useEffect(() => {
    const messageRef = collection(db, "channels", channelId, "messages");
    onSnapshot(query(messageRef, orderBy("timestamp", "asc")), (snapshot) => {
      setMessage(snapshot.docs.map((doc) => doc.data()));
    });
  }, [channelId]);

  const scrollToView = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    let input = inputRef.current.value;
    if (input !== "") {
      const messagesRef = collection(db, "channels", channelId, "messages");
      const payload = {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photo,
        email: user?.email,
      };
      await addDoc(messagesRef, payload);
    }

    input = "";
    scrollToView();
  };
  return (
    <div className="chat">
      <Chatheader channelName={channelName} />
      <div className="chat__message">
        {message.map(({ name, message, timestamp, photoURL }) => (
          <Chatmessage
            name={name}
            chatm={message}
            timestamp={timestamp}
            photo={photoURL}
          />
        ))}

        <div ref={scrollRef} className="pb-16" />
      </div>

      <div className="chat__input">
        <AddCircleOutline />
        <form>
          <input
            disabled={!channelId}
            type="text"
            placeholder={
              !channelId ? "select a channel" : `message #${channelName}`
            }
            // onChange={handlechange}
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <div className="chaticons">
          <CardGiftcardIcon />
          <GifIcon />
          <InsertEmoticon className="chaticons__hover" />
        </div>
        {/* <Input /> */}
      </div>
    </div>
  );
}

export default Chat;
