import React from 'react';
import './PopupMessage.css'; // Import the CSS file for styles

const PopupMessage = ({ message, onClose }) => {
  if (!message) return null; // Do not render if no message

  return (
    <div className="overlay">
      <div className="popup">
        <p className="message">{message}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;


