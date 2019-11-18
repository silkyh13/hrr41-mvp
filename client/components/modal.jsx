import React from 'react';
import styles from './styles.css'

//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({onSubmit, handlestartDate, handleendDate, handleEvent, startDate, currentDate, endDate, deleteEvent, toggle, id, show, start, end, event}) => (
  <div className={show ? styles.modalShow : styles.modalNone} onClick={toggle}>
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.button}>
          <div className={styles.trash}>
            <i className="fa fa-trash" aria-hidden="true" onClick={() => {deleteEvent(id)}}></i>
          </div>
          <div className={styles.exit}>
            <i className="fa fa-times" aria-hidden="true" id={id}/>
          </div>
        </div>

        <form onSubmit={() =>{onSubmit(id)}} className={styles.modalForm}>
          <label>
            Event: {event}
          </label>
          <label>
            Start: {start}
            <input type="datetime-local" value={startDate || currentDate} min={currentDate} onChange={handlestartDate}></input>
          </label>
          <label>
            End: {end}
            <input type="datetime-local" value={endDate || currentDate} min={currentDate} onChange={handleendDate}></input>
          </label>

          <input type="submit" value="UPDATE" className={styles.update}/>
        </form>

      </div>
    </div>
  </div>
)
export default Modal;