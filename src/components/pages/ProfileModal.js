import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useState } from 'react';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('root');
Modal.setAppElement(document.getElementById('root'));

export default function ProfileModal({onShow, modalStatus}) {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

  return (
    <div>
        <button onClick={onShow()}>Open Modal</button>
        <Modal isOpen={modalStatus}  onRequestClose={onShow()} style={customStyles} contentLabel="Example Modal"
        >
{/* 
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={onShow()}>close</button>
        <div>Edit profile</div>
        <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
        </form>
        </Modal>
  </div>
  )
}
