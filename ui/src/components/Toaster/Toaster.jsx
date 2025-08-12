import React from 'react';
import './Toaster.scss';

export default function Toaster({ type, message }) {
  return (
    <div className={`toaster toaster-${type}`}>
      {message}
    </div>
  );
}
