import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import axios from "axios";
import { Navbar } from "react-bootstrap";
import Btn from "react-bootstrap/Button";
// import icon from "./icon.svg";
import logo from "./logo.svg";
import "./Mypage.css";
import "./nav.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Drawertest({ userId, profile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userprofile, setUserProfile] = useState("");
  const [seatOption, setSeatOption] = useState("");

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/mypage/${userId}`);

      if (response.data) {
        const { name, profile, seat_option } = response.data;
        setUserName(name);
        setUserProfile(profile);
        if (seat_option === -1) setSeatOption("뒷자리");
        else if (seat_option === 1) setSeatOption("앞자리");
        else setSeatOption("랜덤");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
    if (open) {
      fetchUserInfo();
    }
  };

  const handleLogout = () => {
    axios
      .post(`/auth/logout`, {
        userId,
      })
      .then((response) => {
        console.log("로그아웃 완료");
        localStorage.removeItem("token");

        if (response.data.logouturl) {
          window.location.href = response.data.logouturl;
        }
      })
      .catch((error) => {
        console.log("로그아웃 실패 : ", error);
      });
  };

  return (
    <div>
      <Navbar className="navbar-expand-custom main-nav">
        <img
          src={logo}
          style={{ width: "100px", height: "auto", margin: "10px" }}
          alt="Icon"
        />
        <div>
          <img className="profile-img" src={profile} alt="profile"></img>
          <Button
            onClick={toggleDrawer(true)}
            style={{
              margin: "10px",
              fontFamily: "MangoDdobak-B",
              color: "#ffff",
            }}
          >
            My Page
          </Button>
        </div>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
          {/* Drawer 내부에 들어갈 내용 */}
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="mypage">
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="info-drawer"
              >
                <div className="profile">
                  <p>
                    <img src={userprofile} alt="프로필" />
                  </p>
                </div>
                <div className="name-selected">
                  <p>이름: {userName}</p>
                  <p>선택한 자리: {seatOption}</p>
                </div>
              </div>
            </div>
            <div className="logout">
              {/*<p>로그아웃</p>*/}
              <Btn size="sm" variant="outline-primary" onClick={handleLogout}>
                로그아웃
              </Btn>
            </div>
          </div>
        </Drawer>
      </Navbar>
    </div>
  );
}
