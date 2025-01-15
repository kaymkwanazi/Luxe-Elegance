import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button onClick={onClose} className="text-right text-red-500">Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;