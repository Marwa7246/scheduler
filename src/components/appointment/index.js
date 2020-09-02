import React from 'react';

import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";

import 'components/appointment/styles.scss'



export default function Appointment (props) {
//console.log(props)
const { interviewer, student } = {...props.interview}

  return <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? <Show {...interviewer} student={student}/> : <Empty/>}
  </article>
}