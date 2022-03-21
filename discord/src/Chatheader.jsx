import React from "react";
import "./Chatheader.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";

function Chatheader({ channelName }) {
  return (
    <div className="chat__header">
      <div className="chat__headerleft">
        <span>#</span>
        <h2>{channelName}</h2>
      </div>
      <div className="chat__headerright">
        <NotificationsIcon className="chat__headercolor" />
        <EditLocationIcon className="chat__headercolor" />
        <PeopleAltIcon className="chat__headercolor" />
        <div className="chat__headerinput">
          <input type="text" />
          <SearchIcon className="chat__headercolorwhite" />
        </div>
        <SendIcon className="chat__headercolor" />
        <HelpIcon className="chat__headercolor" />
      </div>
    </div>
  );
}

export default Chatheader;
