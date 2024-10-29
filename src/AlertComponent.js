import React from "react";
import styled from "styled-components";

const AlertOverlay = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.type === "error"
      ? "#ff5252"
      : props.type === "success"
        ? "#4caf50"
        : "#2196f3"};
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const Alert = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return <AlertOverlay type={type}>{message}</AlertOverlay>;
};
