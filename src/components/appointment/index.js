import React from 'react';

import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";


import useVisualMode from "hooks/useVisualMode";


import 'components/appointment/styles.scss'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment (props) {

  const initial = props.interview ? SHOW : EMPTY;
  const {mode, transition, back} =  useVisualMode(initial);


  console.log('FROM APPOINTMENT COMPONENETS', props)
  const { interviewer, student } = {...props.interview}

  return <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}

    {mode === SHOW && <Show {...interviewer} student={student}/> }
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>back()} /> }




  </article>
}