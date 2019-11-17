import React from 'react';
import styles from './styles.css';

const ListEvents = ({event, onClick}) => (
  <li className={styles.event} onClick={onClick} id={event.id} start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
  {event.event_description}
  </li>
);


export default ListEvents;