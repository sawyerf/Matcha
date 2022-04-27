import { useState, useEffect, useRef, useContext } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#F1F1F1",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    height: "70vh",
    borderRadius: "16px",
    marginTop: "70px",
    padding: "20px",
    position: "relative",
    marginRight: "20px",
    marginLeft: "20px",
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

const Message = ({
  otherProfileData,
  myProfileData,
  setNotifMessage,
  messageToPush,
  setMessageToPush,
  setErrorMsg,
}) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [discussion, setDiscussion] = useState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (messageToSend !== "" && messageToSend !== null) {
      const res = await axios
        .post("/message/send", {
          username: otherProfileData.username,
          message: messageToSend,
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
    }
    await setMessageToSend("");
  };

  useEffect(async () => {
    if (otherProfileData) {
      const res = await axios
        .get("/message/room", {
          params: { username: otherProfileData.username },
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
      setDiscussion(res.data);
    }
  }, [otherProfileData]);

  useEffect(async () => {
    if (
      (messageToPush &&
        messageToPush.from &&
        messageToPush.from === otherProfileData.username) ||
      (messageToPush &&
        messageToPush.from &&
        messageToPush.from === myProfileData.username)
    ) {
      let discussionCpy = discussion;
      discussionCpy.push(messageToPush);
      setDiscussion([...discussionCpy]);
      setMessageToPush(null);
    }
  }, [messageToPush]);

  useEffect(() => {
    scrollToBottom();
  }, [discussion]);

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.root}>
        <div className={classes.card}>
          <h3 style={{ marginBottom: "10px" }}>
            Message avec {otherProfileData && otherProfileData.username}
          </h3>
          <div style={{ overflow: "scroll", height: "85%" }}>
            {discussion &&
              discussion.map((data, key) => {
                return (
                  <div key={key}>
                    <div
                      className={
                        data.from === otherProfileData.username
                          ? classes.theirMessage
                          : classes.myMessage
                      }
                    >
                      <p className={classes.messages}>{data.msg} </p>
                    </div>
                  </div>
                );
              })}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ marginTop: "10px", width: "100%", display: "flex" }}>
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
              onChange={(e) =>
                e.nativeEvent.inputType === "insertLineBreak"
                  ? setMessageToSend("")
                  : setMessageToSend(e.target.value)
              }
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
