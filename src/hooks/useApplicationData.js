import {useReducer, useEffect} from 'react';

import axios from 'axios'


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function changeSpots (state, action) {
  const days = state.days.map((item) => {       
    if (item.name===state.day && !action.interview) {
      return {...item, spots: item.spots+1 }
    } 
    if (item.name===state.day && action.interview && !state.appointments[action.id].interview) {
      return {...item, spots: item.spots-1 } 
    }       
    return item
  })
  return days;
}

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
      
      const days = changeSpots (state, action)

      return {...state, appointments, days}
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
    Promise.all ([
      axios({ url: `/api/days`}),
      axios({url: `/api/appointments`}),
      axios({url: `/api/interviewers`})

    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers});
        
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