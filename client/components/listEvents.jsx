import React from 'react';

const ListEvents = ({event, onClick}) => {
  return (
    <li className="individualEvent" onClick={onClick} id={event.id} start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
    {event.event_description}
    </li>
  )
}


export default ListEvents;