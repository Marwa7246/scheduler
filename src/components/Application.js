import React, { useState, useEffect }  from "react";
import axios from 'axios'

import DayList from "components/DayList"
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterview, getIterviewersForDay } from "helpers/selectors";
import useApplicationData from '../hooks/useApplicationData'



import "components/Application.scss";

 export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

{
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });
  
  // const setDay = day => setState({...state, day})



  // function bookInterview(id, interview) {

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   //console.log('NEWAPPOINTs', appointments)
  //   //console.log('bookInterview:', id, interview);

  //     return axios({url:`/api/appointments/${id}`, method: 'PUT', data: appointment})
  //       .then(() => {
  //       console.log('done');
  //       setState(prev => ({...prev,  appointments:appointments}));
  //     })
  
  // }

  // function cancelInterview (id) {

  //   return axios({url:`/api/appointments/${id}`, method:'DELETE'})
  //     .then(()=> console.log('deleted successfully'))


  // }

  // useEffect(() => {  
  //   Promise.all ([
  //     axios({ url: `/api/days`}),
  //     axios({url: `/api/appointments`}),
  //     axios({url: `/api/interviewers`})

  //   ]).then((all) => {
  //       setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:all[2].data}))
  //     })
  // }, 
  // []);
}


  const interviewers = getIterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);
  // console.log('getAppointmentsForDay', appointments)
  // const appWithInterview = appointments.filter(elem => elem.interview);
  // console.log('spots', appointments.length-appWithInterview.length)

  const schedule = appointments.map(oneAppointment => {
    const interviewFound = getInterview(state, oneAppointment.interview);
    
    return (<Appointment 
      key={oneAppointment.id}
      {...oneAppointment} 
      interview= {interviewFound}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />)

  });

 




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
        {schedule}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}


