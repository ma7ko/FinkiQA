import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import FinkiQAService from '../../repository/finkiqaRepository';
import Header from '../Header/header';
import Questions from '../Questions/QuestionsList/questions';
import QuestionsForm from "../Questions/QuestionsForm/questionsForm";
import QuestionDetails from "../Questions/QuestionDetails/questionDetails";
import Tags from "../Tags/TagsList/tags";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      tags: [],
      selectedQuestion: {},
        answers: [],
        currentTags: [],
        currentAnswer: {}
    }
  }

  render() {
    return (
        <Router>
          <Header isAddMode={this.isAdd}/>
          <main>
            <div className={"container"}>
              <Route path={"/questions/add"} exact render={() =>
                  <QuestionsForm question={this.state.selectedQuestion}
                  tags={this.state.tags} isAddMode={this.state.selectedQuestion === undefined}
                  onAddQuestion={this.addQuestion}
                                 onEditQuestion={this.editQuestion}/> }/>
                  <Route path={"/questions/:id/details"} exact render={(props) =>
                      <QuestionDetails question={this.state.selectedQuestion}
                                       answers={this.state.answers}
                                       tags={this.state.currentTags}
                                       answer={this.state.currentAnswer}
                                       onAddAnswer={this.addAnswer}
                                       onAnswerEdit={this.getAnswer}
                                       onAnswerDelete={this.deleteAnswer}
                                       likeAnswer={this.likeAnswer}
                                       dislikeAnswer={this.dislikeAnswer}
                                       props={props}/>}/>
              <Route path={"/questions"} exact render={() =>
                  <Questions questions={this.state.questions}
                             onDelete={this.deleteQuestion}
                             onEdit={this.getQuestion}
                             showQuestionDetails={this.getAnswersFromQuestionId}
                             likeQuestion={this.likeQuestion}
                             dislikeQuestion={this.dislikeQuestion}/> }/>
              <Route path={"/tags"} exact render={() =>
                  <Tags tags={this.state.tags}
                        onAddTag={this.addTag}
                        deleteTag={this.deleteTag}/> } />
              <Redirect to={"/questions"}/>
            </div>
          </main>

        </Router>
    )
  }


  loadQuestions = () => {
    FinkiQAService.fetchQuestions()
        .then((data) => {
            console.log(data);
          this.setState({
            questions: data.data
          });
        });
  }

  loadTags = () => {
    FinkiQAService.fetchTags()
        .then((data) => {
          this.setState({
            tags: data.data
          });
        });
  }

  addQuestion = (title, description, likes, dislikes, username, tags) => {
      FinkiQAService.addQuestion(title, description, likes, dislikes, username, tags)
          .then(() => {
              this.loadQuestions();
          });
  }
    editQuestion = (id, title, description, likes, dislikes, username, tags) => {
        FinkiQAService.editQuestion(id, title, description, likes, dislikes, username, tags)
            .then(() => {
                this.loadQuestions();
            });
    }

  addTag = (name) => {
      FinkiQAService.addTag(name)
          .then(() => {
              this.loadTags();
          });
  }

  deleteQuestion = (id) => {
      FinkiQAService.deleteQuestion(id)
          .then(() => {
              this.loadQuestions();
          })
  }

  getQuestion = (id) => {
      FinkiQAService.getQuestion(id)
          .then((data) => {
              this.setState({
                  selectedQuestion: data.data
              });
          });
  }

  getTagsFromQuestionId = (id) => {
      FinkiQAService.getTagsByQuestionId(id)
          .then((data) => {
              this.setState({
                  currentTags: data.data
              });
          });
  }

  getAnswersFromQuestionId = (id) => {
      this.getQuestion(id);
      FinkiQAService.getAnswersByQuestionId(id)
          .then((data) => {
              this.setState({
                  answers: data.data
              });
          });
  }

  getAnswer = (id) => {
      FinkiQAService.getAnswerById(id)
          .then((data) => {
              this.setState({
                  currentAnswer: data.data
              });
          });
  }

  deleteAnswer = (id, questionId) => {
      FinkiQAService.deleteAnswer(id)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

  deleteTag = (id) => {
      FinkiQAService.deleteTag(id)
          .then(() => {
              this.loadTags();
              this.loadQuestions();
          });
  }

  addAnswer = (explanation, likes, dislikes, questionId, username) => {
      FinkiQAService.addAnswer(explanation, likes, dislikes, questionId, username)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

  likeAnswer = (id, questionId) => {
      FinkiQAService.likeAnswer(id)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

  dislikeAnswer = (id, questionId) => {
      FinkiQAService.dislikeAnswer(id)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

    likeQuestion = (id) => {
        FinkiQAService.likeQuestion(id)
            .then(() => {
                this.loadQuestions();
            });
    }

    dislikeQuestion = (id) => {
        FinkiQAService.dislikeQuestion(id)
            .then(() => {
                this.loadQuestions();
            });
    }

    isAdd = (boolean) => {
      if (boolean) {
          this.setState({
              selectedQuestion: {}
          })
      }
  }

  componentDidMount() {
    this.loadQuestions();
    this.loadTags();
  }

}

export default App;
