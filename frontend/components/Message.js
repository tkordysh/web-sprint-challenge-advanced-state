import React from 'react'
import { connect } from 'react-redux'

export function Message(props) {
  return <div id="message">{props.message}</div>
}



export default connect(s => ({message: s.infoMessage}))(Message)
