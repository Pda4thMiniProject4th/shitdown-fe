import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import SeatingRow from "./Row";

const SeatingChart_current = ({ orders }) => {
  const [userNames, setUserNames] = useState([]); // 사용자 이름을 저장할 배열
  const [loggedInUserId, setLoggedInUserId] = useState("2"); // ID: 2
  const rows = 8; // 총 8개의 행
  const seatsPerRow = 6; // 각 행당 6개의 좌석

  useEffect(() => {
    // 서버에서 사용자 이름을 가져오는 함수
    const fetchUserNames = async () => {
      try {
        console.log({ orders });
        const response = await axios.get(`/seats/current/${{ orders }.orders}`); // API 경로 수정 필요
        // const response = await axios.get("/seats/current/10"); // API 경로 수정 필요
        console.log(response.data);
        setUserNames(response.data); // 응답 데이터를 상태로 저장
      } catch (error) {
        console.error("Failed to fetch user names:", error); // 에러 처리
      }
    };

    fetchUserNames(); // 함수 실행
  }, [orders]);

  const seats = Array.from({ length: 49 }, (_, index) => ({
    seatNumber: index + 1,
    userName: userNames[index] || "Empty",
  }));

  const seatingPlan = [];
  for (let i = 1; i < seats.length; i += seatsPerRow) {
    seatingPlan.push(seats.slice(i, i + seatsPerRow));
  }

  return (
    <Container>
      {seatingPlan.map((row, index) => (
        <SeatingRow key={index} seats={row} loggedInUserId={loggedInUserId} />
        //loggedInUserId={"2"}
      ))}
    </Container>
  );
};

export default SeatingChart_current;
