import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
// set up the variable in state
  const [questions, setQuestions] = useState([]);
//fetch the questions and then assign them to the state variable after the page has loaded
      useEffect(
       () =>
       fetch('http://localhost:4000/questions')
       .then((r)=> r.json())
       .then((questions)=> {
         setQuestions(questions);
       })  
      )
//create the ability to delete a question from the data
       function deleteQ(id) {
         fetch('http://localhost:4000/questions/${id}', {
           method:"DELETE", 
         })
         .then((r)=> r.json())
         .then(
           () => 
           {const updatedQuestions = questions.filter((q)=> q.id !== id);
           setQuestions(updatedQuestions);
       });
       }
// create the way to handle the answer change
       function handleChanges(id, correctIndex) {
       fetch('http://localhost:4000/questions/${id}', {
         method: "PATCH", headers: {
           "Content-Type" : "application/json", 
         }, 
         body: JSON.stringify({ correctIndex}),
       })
       .then((r)=> r.json())
       .then((updatedQuestion)=> {
         const updatedQuestions = questions.map((q)=>{
           if (q.id=== updatedQuestion.id) 
           return updatedQuestion; 
           return q
         });
         setQuestions(updatedQuestions);
       });
      }

    const questionItems = questions.map( (q) => (
      <QuestionItem key={q.id} question={q} onDeleteClick={deleteQ} onAnswerChange={handleChanges} />
    ));
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
