import React from "react";
import moment from "moment";



class Calendar extends React.Component {


  weekdays = moment.weekdays();
  abbrevdays = moment.weekdaysShort(); //Sun, Mon, Tue

  render() {

      let weekdays = this.abbrevdays.map((day) => {
          return (
              <td key={day} className="week-day">{day}</td>
          )
      });


      return (
          <div className="calendar-container" style={this.style}>
              <table className="calendar">
                  <thead>

                  </thead>
                  <tbody>
                      <tr>
                          {weekdays}
                      </tr>
                  </tbody>
              </table>

          </div>

      );
  }
}

export default Calendar;