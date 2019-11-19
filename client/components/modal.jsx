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
    backgroundColor: "#C74579",
    margin: "100px 500px",
    padding: "20px",
    border: "1px solid #888",
    width: "398px",
    overflow: "hidden",
    minHeight: "290px",
    maxHeight: "290px",
    maxWidth: "398px",
  },
  modalForm: {
    position: "absolute",
    backgroundColor: "#ad5e7e",
    display: "grid",
    height: "220px",
    top: "30%",
    width: "25.5%",
  },
  trash: {
    fontSize: "20px",
    position: "absolute",
    display: "flex",
    padding: "3px 10px",
    top: "110px",
    marginLeft: "270px",
    paddingRight: "10px",
    borderRadius: "50px",
    backgroundColor: "white",
    color: "black",
    border: "3px solid black",
    transition: "border 0.2s ease",
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
  },
  update: {
      fontSize: "14px",
      position: "absolute",
      display: "flex",
      padding: "3px 10px",
      top: "-38px",
      marginLeft: "180px",
      paddingRight: "10px",
      borderRadius: "50px",
      backgroundColor: "white",
      color: "black",
      border: "3px solid black",
      transition: "border 0.2s ease",
  },
  exit: {
    fontSize: "20px",
    position: "absolute",
    display: "flex",
    padding:" 3px 10px",
    marginLeft:" 325px",
    borderRadius:" 50px",
    top: "110px",
    backgroundColor: "white",
    color: "black",
    border: "3px solid black",
    transition: "border 0.2s ease",
  }
}
//cannot combine css of modalShow and modalContainer because it grey box doesnt cover the whole screen
const Modal = ({onSubmit, handlestartDate, handleendDate, handleEvent, startDate, currentDate, endDate, deleteEvent, toggle, id, show, start, end, event}) => (
  <div style={show ? styles.modalShow : styles.modalNone}
  className={show? "modalShow" : "modalNone"} onClick={toggle}>
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <div>
          <div style={styles.trash}>
            <i className="fa fa-trash" aria-hidden="true" onClick={() => {deleteEvent(id)}}></i>
          </div>
          <div style={styles.exit}>
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

          <input type="submit" value="UPDATE" style={styles.update}/>
        </form>

      </div>
    </div>
  </div>
)
export default Modal;