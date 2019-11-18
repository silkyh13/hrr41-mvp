import React from 'react';
import styles from './styles.css'

//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({onSubmit, handlestartDate, handleendDate, handleEvent, startDate, currentDate, endDate, deleteEvent, toggle, id, show, start, end, event}) => (
  <div className={show ? styles.modalShow : styles.modalNone} onClick={toggle}>
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>

        <div>
        <i className="fa fa-times" id={styles.exit} aria-hidden="true" />
          <i className="fa fa-trash" id={styles.trash} aria-hidden="true" onClick={() =>
            {deleteEvent(id)}}></i>
        </div>

        <form onSubmit={() =>{onSubmit(id)}} className={styles.modalForm}>
          <label>
            event: {event}
          </label>
          <label>
            start: {start}
            <input type="datetime-local" value={startDate || currentDate} min={currentDate} onChange={handlestartDate}></input>
          </label>
          <label>
            end: {end}
            <input type="datetime-local" value={endDate || currentDate} min={currentDate} onChange={handleendDate}></input>
          </label>

          <input type="submit" value="UPDATE" id={styles.update}/>
        </form>

      </div>
    </div>
  </div>
)
export default Modal;