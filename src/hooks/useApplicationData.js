import { useReducer, useEffect } from "react";

import axios from "axios";
import reducer, {
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW,
} from "../reducers/application";

//A custom Hook to provide the state and actions used to change the state.
function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  //Connect to a WebSocket API server
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = function (event) {
      socket.send("ping");
    };

    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      if (message.type === "SET_INTERVIEW") {
        dispatch({
          type: SET_INTERVIEW,
          id: message.id,
          interview: message.interview,
        });
      }
    };
  }, []);

  //Connect to the scheduler API server to get the data and update/delete an interview, and then dispatch it to the reducer
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
export default useApplicationData;
