import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ListEvents from './listEvents.jsx'
import Modal from './modal.jsx'

const styles = {
  list: {
    // position: "absolute",
    paddingLeft: "90px",
    // maxWidth: "600px",
    fontWeight: "bolder"
  },
  h1: {
    fontFamily: "Comic Sans MS",
    color: "black",
    paddingLeft: "30px"
  },
  event: {
    overflow: "scroll",
    height: "600px",
    borderStyle: "groove",
    borderColor: "#ad5e7e",
    width: "55%",
    marginLeft: "10%",
    backgroundColor: "white",
    opacity: "0.55",
    borderRadius: "25px",
    marginTop: "30px"
  },
  inputForm: {
    fontFamily: "Comic Sans MS",
    display: "flex",
    flexFlow: "column",
    margin: "50px 0px 0px 50px",
  },
  inputLabel : {
    border: "0",
    backgroundColor: "antiquewhite",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
    borderRadius: "10px",
    margin: "0px 10px 0px 10px",
    width: "260px"
  },
  inputEvent : {
    border: "0",
    backgroundColor: "antiquewhite",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
    borderRadius: "10px",
    width: "250px",
    height: "100px",
    padding: "5px 0 74px 0",
    margin: "12px"
  }
}
let convert = (date) => {
  let saveDate = date.slice(0, 10)
  let saveTime = ' ' + date.slice(11, 19);
  let converted = saveDate + saveTime;
  return converted;
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: '',
      startDate: '',
      endDate: '',
      event: '',
      data:[],
      clickedEvent: {},
      show: false
    }
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleUpdate(id) {
    let start = convert(this.state.startDate);
    let end = convert(this.state.endDate);
    axios.put('/api/schedule/' + id, {
      event_start: start,
      event_end: end
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  handleDelete(id) {

    axios.delete('/api/schedule/' + id)
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    this.componentDidMount();
  }

  toggleModal = (event) => {
    let defined = event.target.getAttribute('id');
    if (defined) {
      this.setState((state) => ({ show: !state.show }));
    }

  }
  onClick = (event) => {
    let element = event.target;
    let start = convert(element.getAttribute('start_date'));
    let end = convert(element.getAttribute('end_date'));

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
    console.log(event.target.value)
    this.setState({startDate: event.target.value});
  }

  handleendDate = (event) =>{
    console.log(event.target.value)
    this.setState({endDate: event.target.value});
  }

  handleEvent = (event) => {
    this.setState({event: event.target.value});
  }

  handleDelete(id) {
    axios.delete('/api/schedule/' + id)
    .then(response => {
      this.setState((state) => ({ show: !state.show }))
      console.log(response);
    });
    this.componentDidMount();
  }

  handleSubmit(event) {
    event.preventDefault();
    let start = convert(this.state.startDate);
    let end = convert(this.state.endDate);

    axios.post('/api/schedule', {
      event_start: start,
      event_end: end,
      event_description: this.state.event
    })
    .then((response) => {
      console.log('response.data', response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    this.componentDidMount();
  }

  componentDidMount() {
    let moments  = moment().format()
    let day = moments.slice(0, 19);

    axios.get('/api/schedule')
    .then((results) => {
      const compareDate = function (a,b) {
        return (new Date(a.event_start)) - (new Date(b.event_start));
      }
      const sorted = results.data.sort(compareDate);
      this.setState({data: sorted, currentDate: day})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    const {show, startDate, currentDate, endDate, event } = this.state;
    const {start, end, clickedE, id} = this.state.clickedEvent;
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let groupKey = 0;
    let groups = this.state.data.reduce(function (output, curr) {
    var monthYear = monthNames[new Date(curr.event_start).getUTCMonth()] + " " + ((new Date(curr.event_start).getYear()) + 1900); //April 2020

      (output[monthYear] ? output[monthYear].data.push(curr)
      : output[monthYear] = {group: String(groupKey++), data: [curr]}
      );
      return output;
    }, {});

    return (
      <div className="form">
        <Modal toggle={this.toggleModal} show={show} id={id} start={start} end={end} event={clickedE}  deleteEvent={this.handleDelete} startDate={startDate} currentDate={currentDate} endDate={endDate} onSubmit={this.handleUpdate} handlestartDate={this.handlestartDate} handleendDate={this.handleendDate} handleEvent={this.handleEvent}/>

        <div className="inputFormContainer">
          <form onSubmit={this.handleSubmit} style={styles.inputForm}>
            <label>
              Start:
              <input type="datetime-local" value={startDate || currentDate} min={currentDate}  onChange={this.handlestartDate} style={styles.inputLabel}></input>
            </label>
            <label>
              End:
              <input type="datetime-local" value={endDate || currentDate} min={currentDate} onChange={this.handleendDate} style={styles.inputLabel}></input>
            </label>
            <label>
              Event:
              <input type="text" placeholder="event" value={event || ''} onChange={this.handleEvent} style={styles.inputEvent}/>
            </label>
            <input className="submit"type="submit" value="Submit" />
          </form>



          {Object.keys(groups).map( (month, index) => {
            let currentMonth = this.props.month;
            let currentYear = this.props.year;
            let yearAndMonth = currentMonth + ' ' + currentYear;
              if (month === yearAndMonth) {
                return (
                  <div key={index} style={styles.event}>
                    <h1 style={styles.h1}>{month}</h1>
                    <ol style={styles.list}>
                      {groups[month].data.map((event, index) => {
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



      </div>
    )
  }

}
export default Form;