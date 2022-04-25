import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Profile";

const useStyles = makeStyles({
  matchCard: {
    width: "200px",
    height: "50px",
    marginBottom: "10px",
    position: "relative",
    cursor: "pointer",
    display: "flex",
  },
});

const UserMenuMessage = ({
  matchDisplay,
  otherProfileData,
  setOtherProfileData,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState();

  useEffect(async () => {
    const res = await axios.get("/users/matchs");
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
    }
    setMessageList(res.data);
  }, [localStorage.getItem("token")]);

  const readMessage = (data) => {
    setOtherProfileData(data);
    navigate("/message");
  };

  return (
    <div
      style={{
        margin: "20px",
        marginTop: "10px",
        display: matchDisplay ? "none" : "flex",
        justifyContent: "space-between",
        maxHeight: "calc(100% - 30px)",

        flexFlow: "wrap",
        overflowX: "hidden",
      }}
    >
      {messageList &&
        messageList.map((data, key) => {
          return (
            <div key={key}>
              <div
                className={classes.matchCard}
                onClick={() => readMessage(data)}
              >
                <img
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "16px",
                  }}
                  src={
                    data && data.images && data.images[0]
                      ? data.images[0]
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFhQ-2EAoeS6qbmv4PeqGPsw7oa1uPmaVow&usqp=CAU"
                  }
                  alt="ImageUser"
                />
                <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {data.userName}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "grey",
                      marginTop: "5px",
                    }}
                  >
                    {data && data.message && data.message.msg
                      ? data.message.msg.substr(0, 15)
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserMenuMessage;
