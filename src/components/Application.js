import React, { useState, useEffect }  from "react";
import axios from 'axios'

import DayList from "components/DayList"
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";

 export default function Application(props) {
  //const [days, setDays] = useState([]);
  //const [day, setDay] = useState("Monday");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({...state, day})
  //const setDays = days => setState(prev => ({...prev, days}))
  
  ////console.log("dayState:", day);

  const appointments = getAppointmentsForDay(state, state.day);


  const parsedAppointments = appointments.map(oneAppointment => {
    return (<Appointment key={oneAppointment.id} {...oneAppointment} />)
  })      
  
  // ajax request to a remote api to fetch Days

  // useEffect(() => {    
  //   axios({
  //     url: `/api/days`,
  //     method: "GET"
  //   })
  //     .then((response) => {
  //       console.log(response.data); 
  //       //setDays(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     });
  // }, 
  // []);
  // useEffect(() => {  
  //   Promise.all ([
  //     Promise.resolve(axios({ url: `/api/days`})),
  //     Promise.resolve(axios({url: `/api/appointments`}))
  //   ]).then((all) => {console.log(all)})
  // }, 
  // []);

  useEffect(() => {  
    Promise.all ([
      axios({ url: `/api/days`}),
      axios({url: `/api/appointments`}),
      axios({url: `/api/interviewers`})

    ]).then((all) => {
      console.log(all)
    setState(prev => ({days: all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, 
  []);

console.log(state.interviewers)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

        <DayList
          days={state.days}
          day={state.day}
          setDay = {setDay}
        />

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {parsedAppointments}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}


