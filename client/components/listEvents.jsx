import React from 'react';

const styles = {
  event: {
    fontFamily: "Comic Sans MS",
    textAlign: "inherit",
    fontSize: "18px",
    color: "#C74579",
    letterSpacing: "5px",
  }
}

const ListEvents = ({event, onClick}) => (
  <li style={styles.event} onClick={onClick} id={event.id} start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
  {event.event_description}
  </li>
);


export default ListEvents;