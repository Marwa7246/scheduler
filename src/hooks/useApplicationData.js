import {useReducer, useEffect} from 'react';

import axios from 'axios'

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: { 
      return {...state, day: action.day}
    }
    case SET_APPLICATION_DATA: {
      return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
    }
    case SET_INTERVIEW: {
      const appointment = {...state.appointments[action.id], interview: action.interview};
      const appointments = { ...state.appointments, [action.id]: appointment};
      
      const days = state.days.map((item) => {       
        if (item.appointments.includes(action.id)) {
          const spots = item.appointments.map(appointId => appointments[appointId]).filter(app => !app.interview).length;
          console.log('spots:', spots);
          return {...item, spots};
        }         
        return item;
      })

      return {...state, appointments, days};
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function useApplicationData(){
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });;

useEffect(() => {
  const socket = new WebSocket("ws://localhost:8001");
  socket.onopen = function (event) {
    socket.send("ping");
  };

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log(`Message Received: ${message.interview}`)
    if (message.type === "SET_INTERVIEW") {
      console.log('SET INTERVIEW RECEIVED');
      dispatch({ type: SET_INTERVIEW, id: message.id, interview: message.interview });
    }
  }

}, []);


  useEffect(() => {  
    Promise.all ([
      axios({ url: `/api/days`}),
      axios({url: `/api/appointments`}),
      axios({url: `/api/interviewers`})

    ]).then((all) => {

      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
        
      })
  }, 
  []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };  
   
    return axios({url:`/api/appointments/${id}`, method: 'PUT', data: appointment})
      .then(() => {
      console.log('done');
      dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview (id) {

    return axios({url:`/api/appointments/${id}`, method:'DELETE'})
      .then(()=> {
        console.log('deleted successfully');
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

return {state, setDay, bookInterview, cancelInterview};
}
export default useApplicationData;