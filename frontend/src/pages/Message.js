import { useState, useEffect, useRef } from "react";
import UserMenu from "../components/UserMenu";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SendMessageIcon from "../components/Icons/SendMessageIcon";

const useStyles = makeStyles({
  root: {
    width: "calc(100vw - 250px)",
    backgroundColor: "#F1F1F1",
    textAlign: "-webkit-center",
  },
  card: {
    backgroundColor: "white",
    width: "510px",
    height: "70vh",
    borderRadius: "16px",
    marginTop: "70px",
    padding: "20px",
    position: "relative",
  },
  matchCard: {
    width: "250px",
    height: "400px",
    marginLeft: "20px",
  },
  myMessage: {
    width: "fit-content",
    marginLeft: "auto",
    margin: "5px",
    padding: "3px",
    position: "relative",
    borderRadius: "8px",
    background: "orange",
    maxWidth: "50%",
  },
  theirMessage: {
    width: "fit-content",
    marginRight: "auto",
    margin: "5px",
    padding: "3px",
    position: "relative",
    borderRadius: "8px",
    background: "lightgrey",
    maxWidth: "50%",
  },
  messages: {
    textAlign: "left",
    margin: "5px",
  },
});

const Message = ({ otherProfileData }) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [discussion, setDiscussion] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    console.log(messageToSend);
    setMessageToSend("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [discussion]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <h3 style={{ marginBottom: "10px" }}>Message avec User</h3>
          <div style={{ overflow: "scroll", height: "85%" }}>
            {discussion &&
              discussion.map((data, key) => {
                return (
                  <div key={key}>
                    <div className={classes.myMessage}>
                      <p className={classes.messages}>
                        my qsdfqsd qsdf qsdf qsdf qsdf e is here
                      </p>
                    </div>
                    <div className={classes.theirMessage}>
                      <p className={classes.messages}>Their message is here</p>
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ marginTop: "10px", width: "90%", display: "flex" }}>
            <textarea
              style={{
                resize: "none",
                width: "100%",
                height: "27px",
                fontSize: "16px",
                padding: "3px",
                borderRadius: "8px",
              }}
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
            />
            <SendMessageIcon onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
