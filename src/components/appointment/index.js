import React, { useEffect } from 'react';

import Header from "components/appointment/Header";
import Empty from "components/appointment/Empty";
import Show from "components/appointment/Show";
import Form from "components/appointment/Form";
import Status from "components/appointment/Status";
import Confirm from "components/appointment/Confirm";
import Error from "components/appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import 'components/appointment/styles.scss'


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment (props) {

  const initial = props.interview ? SHOW : EMPTY;
  const {mode, transition, back} =  useVisualMode(initial);

 
  function save(name, interviewer) {  
    transition(SAVING);  
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(()=>transition(SHOW) )
      .catch(error => transition(ERROR_SAVE, true));    
    
  }

  function destroy() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))

  }

  const { interviewer, student } = {...props.interview};
  //console.log(props.interview)

  useEffect(() => {
    if (mode === EMPTY && props.interview){
      transition(SHOW);
    } else if (mode === SHOW && !props.interview){
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);



  return <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)}/>}
    {mode === SHOW  && props.interview && <Show {...interviewer} student={student} onDelete={() => transition(CONFIRM)}  onEdit={() => transition(EDIT)}/>}
    {mode === CREATE  && <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save}/> }
    {mode === SAVING  && <Status message="Saving..."/>}
    {mode === DELETING  && <Status message="Deleting..."/>}
    {mode === CONFIRM  && <Confirm message= "Delete the appointment?"  onCancel={()=>back()} onConfirm={destroy}/>}
    {mode === EDIT && <Form interviewers={props.interviewers} interviewer={interviewer && interviewer.id} name={student} onCancel={()=>back()} onSave={save}/>}
    {mode === ERROR_DELETE && <Error  message="Could not delete appointment." onClose={()=> back()}/>}
    {mode === ERROR_SAVE && <Error  message="Could not save appointment." onClose={()=> back()}/>}

  </article>
}