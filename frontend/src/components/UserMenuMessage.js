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

const UserMenuMessage = ({ matchDisplay }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState([1, 2, 3]);

  useEffect(async () => {
    /*const res = await axios.get("/users/matchs");
    if ("error" in res.data) {
      console.log("Error: ", res.data.message);
    }
    setMessageList(res.data);*/
  }, []);

  const readMessage = (data) => {
    //setOtherProfileData(data);
    //if (otherProfileData) navigate("/message");
  };

  return (
    <div
      style={{
        margin: "20px",
        marginTop: "10px",
        display: matchDisplay ? "none" : "flex",
        justifyContent: "space-between",
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
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFhQ-2EAoeS6qbmv4PeqGPsw7oa1uPmaVow&usqp=CAU"
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
                    Johnny
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "grey",
                      marginTop: "5px",
                    }}
                  >
                    {"message message message message message message".substr(
                      0,
                      15
                    )}
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
