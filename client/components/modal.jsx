import React from 'react';
import styles from './styles.css'

//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({deleteEvent, toggle, id, show, start, end, event}) => (
  <div className={show ? styles.modalShow : styles.modalNone} onClick={toggle}>
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button id={id}>Close </button>
        <input type="button" value="DELETE" onClick={() => {deleteEvent(id)}}></input>
        <div>
          start: {start}
        </div>

        <div>
          end: {end}
        </div>

        <div>
          event: {event}
        </div>

      </div>

    </div>
  </div>
)
export default Modal;