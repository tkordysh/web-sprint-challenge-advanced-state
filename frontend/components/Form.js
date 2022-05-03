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
    props.postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input  maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input  maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input  maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = s => {
  return {
    form: s.form,
    infoMessage: s.infoMessage
  }
}


export default connect(mapStateToProps, { setMessage, inputChange, resetForm, postQuiz })(Form)
