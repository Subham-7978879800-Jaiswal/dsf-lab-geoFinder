import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function AutoHideToast() {
  const [show, setShow] = useState(true);
  return (
    <Row
      style={{
        position: "absolute",
        left: "50%",
        width: "50%",
        transform: "translateY(10px)",
        zIndex: "10000000",
      }}
    >
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"></strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body>The File is saved in the required Directory!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default React.memo(AutoHideToast);
