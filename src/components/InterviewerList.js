import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  console.log('props', props);

 const { interviewers, value, onChange }= props
 console.log('interviewer', value);

//  const parsedInterviewers = interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} /> )

 
 const parsedInterviewers = interviewers.map(oneInterviewer => ( 
    <InterviewerListItem 
        key={oneInterviewer.id} 
        {...oneInterviewer} 
        selected={oneInterviewer.id  === value} 
        setInterviewer={event => onChange(oneInterviewer.id) }
        />
      ));


 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}