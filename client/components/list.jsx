import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ListEvents from './listEvents.jsx'
import Modal from './modal.jsx'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      event: '',
      clickedEvent: {},
      show: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(e, id) {
    e.preventDefault();

    let start = this.props.convert(this.state.startDate);
    let end = this.props.convert(this.state.endDate);
    let current = this.props.convert(this.props.currentDate)

    let defined = (date) => {
      if (date.length > 18) {
        return date
      }
      return current
    }
    axios.put('/api/schedule/' + id, {
      event_start: defined(start),
      event_end: defined(end)
    })
    .then((response) => {
      this.setState((state) => ({ show: !state.show }))
      console.log(response);
      this.props.componentDidMount();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleDelete(id) {

    axios.delete('/api/schedule/' + id)
    .then((response) => {
      this.setState((state) => ({ show: !state.show }))
      console.log(response);
      this.props.componentDidMount();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  toggleModal = (event) => {
    let defined = event.target.getAttribute('id');
    if (defined) {
      this.setState((state) => ({ show: !state.show }));
    }

  }
  //for modal
  onClick = (event) => {
    let element = event.target;
    let start = this.props.convert(element.getAttribute('start_date'));
    let end = this.props.convert(element.getAttribute('end_date'));
    this.setState({
      clickedEvent: {
        start: start,
        end: end,
        clickedE: element.getAttribute('event'),
        id: element.getAttribute('id')
      },
      show: true
    })
  }
  handlestartDate = (event) => {
    this.setState({startDate: event.target.value});
  }

  handleendDate = (event) =>{
    this.setState({endDate: event.target.value});
  }

  handleEvent = (event) => {
    this.setState({event: event.target.value});
  }

  render () {
    const {show, startDate, endDate, event } = this.state;
    const {start, end, clickedE, id} = this.state.clickedEvent;
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let groupKey = 0;
    let groups = this.props.data.reduce(function (output, curr) {
    var monthYear = monthNames[new Date(curr.event_start).getUTCMonth()] + " " + ((new Date(curr.event_start).getYear()) + 1900); //April 2020

      (output[monthYear] ? output[monthYear].data.push(curr)
      : output[monthYear] = {group: String(groupKey++), data: [curr]}
      );
      return output;
    }, {});

    return (
      <div className="list">
        <Modal toggle={this.toggleModal} show={show} id={id} start={start} end={end} event={clickedE}  deleteEvent={this.handleDelete} startDate={startDate} currentDate={this.props.currentDate} endDate={endDate} onSubmit={this.handleUpdate} handlestartDate={this.handlestartDate} handleendDate={this.handleendDate} handleEvent={this.handleEvent}/>


        {Object.keys(groups).map( (header, index) => {
          let currentMonth = this.props.month;
          let currentYear = this.props.year;
          let yearAndMonth = currentMonth + ' ' + currentYear;
          // NOV 2019  === NOV 2019
            if (header === yearAndMonth) {
              return (
                <div className="event" key={index} >
                  <h2>{header}</h2>
                  <ol  className="list">
                    {groups[header].data.map((event, index) => {
                        return (
                          <ListEvents
                          key={index}
                          onClick={this.onClick}
                          event={event}
                          />
                        );
                      })
                    }
                  </ol>
                </div>);
            }
          })
        }

      </div>
    )
  }

}
export default List;

