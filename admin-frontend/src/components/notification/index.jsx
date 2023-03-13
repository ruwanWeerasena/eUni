import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  let { message, type, open, remainingTime, autoClose, random } = useSelector(
    (state) => state.notification
  );

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);

    if (autoClose) {
      setTimeout(() => {
        setIsOpen(false);
      }, remainingTime);
    }
  }, [autoClose, open, random]);

  const closeNotification = (e) => {
    setIsOpen(false);
  };

  const getFontColor = (t) => {
    let color = "green";

    switch (t) {
      case "info":
        color = "green";
        break;
      case "error":
        color = "red";
        break;
      case "warning":
        color = "orange";
        break;
    }

    return color;
  };

  return (
    <>
      {isOpen && (
        <div style={{ color: getFontColor(type)}}>
          {message}
          {!autoClose && <button onClick={closeNotification}>close</button>}
        </div>
      )}
    </>
  );
};

export default Notification;
