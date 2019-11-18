import React from 'react';
import styles from './styles.css'

//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({onSubmit, handlestartDate, handleendDate, handleEvent, startDate, currentDate, endDate, deleteEvent, toggle, id, show, start, end, event}) => (
  <div className={show ? styles.modalShow : styles.modalNone} onClick={toggle}>
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button id={id}>Close </button>
        <input type="button" value="DELETE" onClick={() => {deleteEvent(id)}}></input>

        <form onSubmit={() =>{onSubmit(id)}} className={styles.modalForm}>
          <label>
            start: {start}
            <input type="datetime-local" value={startDate || currentDate} min={currentDate} onChange={handlestartDate}></input>
          </label>

          <label>
            end: {end}
            <input type="datetime-local" value={endDate || currentDate} min={currentDate} onChange={handleendDate}></input>
          </label>

          <label>
            event: {event}
          </label>

          <input type="submit" value="UPDATE" />
        </form>


      </div>

    </div>
  </div>
)
export default Modal;