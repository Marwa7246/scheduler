import {useReducer, useEffect} from 'react';

import axios from 'axios'


function useApplicationData(){

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

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = day => dispatch({ type: SET_DAY, day });;

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = function (event) {
    socket.send("ping");
  };

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    if (message.type === "SET_INTERVIEW") {
      dispatch({ type: SET_INTERVIEW, id: message.id, interview: message.interview });
    }

  }

  }, []);


  useEffect(() => {  
    Promise.all ([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
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
   
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview (id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(()=> {
        //console.log('deleted successfully');
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

return {state, setDay, bookInterview, cancelInterview};
}
export default useApplicationData;