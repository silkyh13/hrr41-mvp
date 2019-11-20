import React from 'react';

const styles = {
  modalContainer: {
    display: "block",
    position: "absolute",
    top: "10px",
    justifyContent: "center",
  },
  modalContent: {
    fontFamily: "Comic Sans MS",
    fontSize: "larger",
    backgroundColor: "#C74579",
    margin: "100px 500px",
    padding: "20px",
    border: "1px solid #888",
    width: "450px",
    overflow: "hidden",
    minHeight: "350px",
    maxWidth: "450px",
  },
  modalForm: {
    position: "absolute",
    backgroundColor: "#ad5e7e",
    display: "grid",
    height: "260px",
    top: "30%",
    width: "402px",
    textAlign: "center"
  },
  modalNone: {
    display: "none",
  },
  modalShow: {
    position: "fixed",
    paddingTop: "100px",
    left: 0,
    right:0,
    top: 0,
    bottom: 0,
    overflow: "auto",
    backgroundColor: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: "9999",
  }
}
//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({onSubmit, handlestartDate, handleendDate, handleEvent, startDate, currentDate, endDate, deleteEvent, toggle, id, show, start, end, event}) => (
  <div style={show ? styles.modalShow : styles.modalNone}
  className={show ? "modalShow" : "modalNone"} onClick={toggle}>
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <div>
          <div style={styles.trash} className="trash">
            <i className="fa fa-trash" aria-hidden="true" onClick={() => {deleteEvent(id)}}></i>
          </div>
          <div style={styles.exit} className="exit">
            <i className="fa fa-times" aria-hidden="true" id={id}/>
          </div>
        </div>

        <form onSubmit={() =>{onSubmit(id)}} style={styles.modalForm}>
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

          <input type="image" src="http://localhost:1028/images/V.png"  style={styles.update} className="update"/>
        </form>

      </div>
    </div>
  </div>
)
export default Modal;