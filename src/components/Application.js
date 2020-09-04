import React, { useState, useEffect }  from "react";
import axios from 'axios'

import DayList from "components/DayList"
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterview, getIterviewersForDay } from "helpers/selectors";

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
  

  const interviewers = getIterviewersForDay(state, state.day);

  console.log('interviewers', interviewers);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev,  appointments:appointments}))
    console.log('NEWAPPOINTs', appointments)

      axios({url:`/api/appointments/`, method: 'POST', data: {appointments}})
        .then(() => {
        console.log('done')
      })
    
    

    // const interviewerObj= interviewers.find(ele => ele.id===interview.interviewer);
    // interview = {...interview, interviewer: interviewerObj };

    console.log('bookInterview:', id, interview);
  }

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(oneAppointment => {
    const interviewFound = getInterview(state, oneAppointment.interview);
    
    // return (<Appointment 
    //   key={oneAppointment.id}
    //   id={oneAppointment.id} 
    //   time={oneAppointment.time}
    //   interview= {interviewFound}
    // />)
    return (<Appointment 
      key={oneAppointment.id}
      {...oneAppointment} 
      interview= {interviewFound}
      interviewers={interviewers}
      bookInterview={bookInterview}

    />)

  });

 


  useEffect(() => {  
    Promise.all ([
      axios({ url: `/api/days`}),
      axios({url: `/api/appointments`}),
      axios({url: `/api/interviewers`})

    ]).then((all) => {
      //console.log('From UserEffect: ', all)
    setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })
  }, 
  []);


//console.log('Schedule:', schedule)

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


