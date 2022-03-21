import React, { useEffect, useState } from "react";
import "./SideBar.css";
import Streams from "./Streams";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PhoneIcon from "@mui/icons-material/Phone";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import db from "./firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

function SideBar() {
  const user = useSelector(selectUser);
  const logOut = () => {
    auth.signOut();
  };
  const [channel, setChannel] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "channels"), (snapshot) => {
      setChannel(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);
  // db.collection("channels")
  //.onSnapshot((snapshot) => {
  //setMessage(snapshot.docs.map((doc) => doc.data()));
  // });
  const handleAddchannel = async () => {
    const channelName = prompt("enter a new channel name");
    if (channelName) {
      const collectionRef = collection(db, "channels");
      const payload = { channelName: channelName };
      await addDoc(collectionRef, payload);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2>{user.displayName}</h2>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__body">
        <div className="sidebar__streamheader">
          <ExpandMoreIcon />
          <h2>Text Channel</h2>
          <AddIcon onClick={handleAddchannel} />
        </div>
        {channel.map(({ channel, id }) => (
          <Streams key={id} id={id} channelName={channel.channelName} />
        ))}
      </div>
      <div className="sidebar__connect">
        <SignalCellularAltIcon className="sidebar__connectcolor" />
        <div className="sidebarconnect__info">
          <h3>Voice Connected</h3>
          <p>stream</p>
        </div>
        <div className="sidebarconnect__icongroup">
          <SettingsIcon fontSize="medium" />
          <PhoneIcon fontSize="medium" />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={logOut} />
        <div className="sidebar__profilebody">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileicon">
          <MicIcon fontSize="small" />
          <HeadsetIcon fontSize="small" />
          <SettingsIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
