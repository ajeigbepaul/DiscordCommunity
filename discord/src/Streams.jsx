import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";
import "./Streams.css";

function Streams({ id, channelName }) {
  const dispatch = useDispatch();
  const handleChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
  };

  return (
    <div className="streams">
      <div className="streams__body" onClick={handleChannel}>
        <span className="streams__info">#</span> {channelName}
      </div>
    </div>
  );
}

export default Streams;
