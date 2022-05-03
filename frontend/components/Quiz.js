import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, postAnswer } from "../state/action-creators";

export function Quiz(props) {

  const { quiz } = props

  useEffect(() => {
    if (!props.quiz) {
      props.fetchQuiz();
    }
  }, [props.quiz]);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{quiz.question}</h2>
            
            <div id="quizAnswers">
              {quiz.answers.map(answer => {
                return  <div key={answer.answer_id} className="answer selected">
                {answer.text}
                <button>SELECTED</button>
              </div>
              })}
             

              {/* <div className="answer">
                An elephant
                <button>Select</button>
              </div> */}
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (s) => {
  return {
    quiz: s.quiz,
  };
};

export default connect(mapStateToProps, { fetchQuiz, postAnswer })(Quiz);
