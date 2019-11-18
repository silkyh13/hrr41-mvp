import React from 'react';
import styles from './styles.css';

const ListEvents = ({event, onClick}) => {
  //characters 5, 6 to get the month number


  return (

      <li className={styles.event} onClick={onClick} id={event.id}
  start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
    {event.event_start} {event.event_description}
  </li>
  )


  }


export default ListEvents;
  //characters 5, 6 to get the month number
  // console.log(event.event_start.slice(5,7), 'moooo')
  //make an array with the months according to the index
  // let months = ['nothing', 'January', 'February', 'March', 'April', 'May', 'June', "July", 'August', 'September', 'October', 'November', 'December']
  // let index = Number(event.event_start.slice(5,7));

//   return (
//     <li className={styles.event} onClick={onClick} id={event.id}
// start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
// {event.event_description}
// </li>
// );