import React, { useState } from "react";
import SeatingChart_current from "./SeatingChart_current";
import SeatingChart_live from "./SeatingChart_live";
import SelectButton from "./SelectButton";
import "./Root3.css";

export default function Root3({ userId, order }) {
  const [countData, setCountData] = useState([]);
  return (
    <div className="seat-current-live">
      <div className="live-set">
        <div style={{ display: "flex" }} className="live-title">
          <div>
            <h4 style={{ textAlign: "center" }}>실시간 자리 현황</h4>
          </div>
          <div>
            <SelectButton
              onDataFetched={setCountData}
              userId={userId}
              order={order}
            />{" "}
            {/*id, 기수*/}
          </div>
        </div>
        <div className="live-seat">
          <div className="live-seat-color">
            <SeatingChart_live
              countData={countData}
              userId={userId}
              order={order}
            />{" "}
            {/*id, 기수*/}
          </div>
        </div>
      </div>
      <div className="current-set">
        <div className="current-title">
          <h3>현재 자리</h3>
        </div>
        <div className="curren-seat">
          <div className="current-seat-color">
            <SeatingChart_current userId={userId} order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
