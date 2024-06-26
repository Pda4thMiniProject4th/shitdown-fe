import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./Root3.css";

const SelectButton = ({ onDataFetched, userId, order }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");

  const fetchUserInfo = async () => {
    try {
      //const id = 106; //테스트
      let reason = ""; //테스트

      if (selectedOption === -2) {
        reason = inputText;
      }
      const response = await axios.post("/seats/live", {
        //id,
        id: userId,
        seat_option: selectedOption,
        reason,
      });
      console.log(response.data);
      if (response.data) {
        //const response2 = await axios.get("/users/3");
        const response2 = await axios.get(`/users/${order}`);
        console.log("aaa", order);
        if (response2.data) {
          const fetchedData = response2.data;
          onDataFetched(fetchedData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (e) => {
    const option = Number(e.target.value);
    setSelectedOption(option);
    if (option === -2) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setInputText(null);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Form.Select
        aria-label="Default select example"
        defaultValue={0}
        style={{ width: "100px" }}
        onChange={handleSelectChange}
      >
        <option value={0}>랜덤</option>
        <option value={1}>앞자리</option>
        <option value={-2}>뒷자리</option>
      </Form.Select>
      <Button className="custom-button" onClick={fetchUserInfo}>
        확정
      </Button>{" "}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>뒷자리 선택 사유를 입력하세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Control
            type="text"
            placeholder="이유를 입력하세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="custom-button" onClick={() => setShowModal(false)}>
            확정
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectButton;
