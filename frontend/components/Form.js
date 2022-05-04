import React from 'react'
import { connect } from 'react-redux'
import { setMessage, inputChange, resetForm, postQuiz } from '../state/action-creators'

export function Form(props) {
  const onChange = evt => {
    const { id, value } = evt.target
    props.inputChange({ id, value })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(props.question_text, props.true_answer, props.false_answer);
  }

  const isEnabled = props.question_text.trim().length && props.true_answer.trim().length && props.false_answer.trim().length 

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.question_text} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.true_answer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.false_answer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!isEnabled}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = s => {
  return {
    question_text: s.form.newQuestion,
    true_answer: s.form.newTrueAnswer,
    false_answer: s.form.newFalseAnswer,
  }
}


export default connect(mapStateToProps, { setMessage, inputChange, resetForm, postQuiz })(Form)
