import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss'

 
export default function InterviewerList(props) {
  console.log(typeof props.interviewers);

 

  //console.log('props', props);

 const { interviewers, value, onChange }= props
 //console.log('interviewer', value);

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};