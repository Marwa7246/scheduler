import {useState, useEffect} from 'react';
import axios from 'axios'

//import { getAppointmentsForDay } from "helpers/selectors";


function useApplicationData(){


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    spots: 5
  });


  const setDay = day => setState({...state, day});
     // console.log(state.days )

  function changeSpots (state, day, change){
    const selectedDay = state.days.find(e => e.name===day);
    const i = state.days.findIndex(e => e.name===day);
    const y = {...selectedDay, spots: selectedDay.spots-change};
    const allDays = [...state.days];
    allDays[i] =y;
    return allDays;
  }

  // function increaseSpots (state, day){
  //   const selectedDay = state.days.find(e => e.name===day);
  //   const i = state.days.findIndex(e => e.name===day);
  //   const y = {...selectedDay, spots: selectedDay.spots+1};
  //   const allDays = [...state.days];
  //   allDays[i] =y;
  //   return allDays;
  // }


  useEffect(() => {  
    Promise.all ([
      axios({ url: `/api/days`}),
      axios({url: `/api/appointments`}),
      axios({url: `/api/interviewers`})

    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments:all[1].data, interviewers:all[2].data}))
      })
  }, 
  []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const days =  (!state.appointments[id].interview) ? changeSpots(state, state.day, 1) : [...state.days]
    
    return axios({url:`/api/appointments/${id}`, method: 'PUT', data: appointment})
      .then(() => {
      console.log('done');
      setState(prev => ({...prev,  appointments, days: days}));
    })

  }

  function cancelInterview (id) {

    const appointment = {...state.appointments[id], interview: null};
    const appointments = { ...state.appointments, [id]: appointment};
    
    const days = changeSpots(state, state.day, -1);


    return axios({url:`/api/appointments/${id}`, method:'DELETE'})
      .then(()=> {
        console.log('deleted successfully');
        setState(prev => ({...prev, appointments, days}));
      });



  }



return {state, setDay, bookInterview, cancelInterview};
}
export default useApplicationData;