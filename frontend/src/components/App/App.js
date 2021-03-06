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
import Login from "../LogIn/logIn";
import Register from "../Register/register";
import Profile from "../Profile/profile";
import AuthService from "../../repository/auth";

class App extends Component {


  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.state = {
      questions: [],
      tags: [],
      selectedQuestion: {},
        answers: [],
        currentTags: [],
        currentAnswer: {},
        currentUser: {},
        searchedTags: [],
        currentPage: 1,
        postsPerPage: 3,
        indexOfLastPost: 3,
        indexOfFirstPost: 0,
        currentPosts: this.questions?.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)
    }
  }

  setCurrentPage(page) {
      this.setState({
          currentPage: page,
          indexOfLastPost: page * this.state.postsPerPage,
          indexOfFirstPost: page * this.state.postsPerPage - this.state.postsPerPage,
          currentPosts: this.state.questions?.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)
      });
      window.scrollTo(0, 0);
      console.log(page * this.state.postsPerPage);
      console.log(this.state.indexOfLastPost);
  }

  render() {
    return (
        <Router>
          <Header logOut={this.logOut} currentUser={this.state.currentUser} isAddMode={this.isAdd}/>
          <main>
            <div className={"container"}>
              <Route path={"/questions/form/:id"} exact render={(props) =>
                  <QuestionsForm
                  tags={this.state.tags}
                  searchedTags={this.state.searchedTags}
                  isAddMode={this.state.selectedQuestion === undefined}
                  currentUser={this.state.currentUser}
                  onAddQuestion={this.addQuestion}
                                 onEditQuestion={this.editQuestion}
                  onSubmitted={this.loadQuestions}
                  props={props}/> }/>
                  <Route path={"/questions/:id/details"} exact render={(props) =>
                      <QuestionDetails question={this.state.selectedQuestion}
                                       answers={this.state.answers}
                                       tags={this.state.currentTags}
                                       answer={this.state.currentAnswer}
                                       onAddAnswer={this.addAnswer}
                                       onAnswerEdit={this.getAnswer}
                                       onAnswerDelete={this.deleteAnswer}
                                       onEditAnswer={this.editAnswer}
                                       likeAnswer={this.likeAnswer}
                                       dislikeAnswer={this.dislikeAnswer}
                                       likeQuestion={this.likeQuestionFromDetails}
                                       dislikeQuestion={this.dislikeQuestionFromDetails}
                                       currentUser={this.state.currentUser}
                                       props={props}/>}/>
              <Route path={"/questions"} exact render={() =>
                  <Questions questions={this.state.questions}
                             currentPage={this.state.currentPage}
                             firstIndex={this.state.indexOfFirstPost}
                             lastIndex={this.state.indexOfLastPost}
                             postsPerPage={this.state.postsPerPage}
                             totalPosts={this.state.questions.length}
                             onDelete={this.deleteQuestion}
                             onEdit={this.getQuestion}
                             showQuestionDetails={this.getAnswersFromQuestionId}
                             likeQuestion={this.likeQuestion}
                             dislikeQuestion={this.dislikeQuestion}
                             currentUser={this.state.currentUser}
                             paginate={this.setCurrentPage}/> }/>
              <Route path={"/tags"} exact render={() =>
                  <Tags tags={this.state.tags}
                        onAddTag={this.addTag}
                        deleteTag={this.deleteTag}/> } />
                <Route path="/login" exact render={(props) =>
                    <Login setCurrentUser={this.setCurrentUser} props={props}/> } />
                <Route exact path="/register" component={Register} />
                <Route path="/profile" exact render={() =>
                    <Profile currentUser={this.state.currentUser}/> } />
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

  editAnswer = (id, explanation, likes, dislikes, questionId, userId) => {
      FinkiQAService.editAnswer(id, explanation, likes, dislikes, questionId, userId)
          .then(() => {
          this.getAnswersFromQuestionId(questionId);
      });
  }

  addAnswer = (explanation, likes, dislikes, questionId, username) => {
      FinkiQAService.addAnswer(explanation, likes, dislikes, questionId, username)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

  likeAnswer = (id, questionId, userId) => {
      FinkiQAService.likeAnswer(id, userId)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

  dislikeAnswer = (id, questionId, userId) => {
      FinkiQAService.dislikeAnswer(id, userId)
          .then(() => {
              this.getAnswersFromQuestionId(questionId);
          });
  }

    likeQuestion = (id, userId) => {
        FinkiQAService.likeQuestion(id, userId)
            .then(() => {
                this.loadQuestions();
            });
    }

    dislikeQuestion = (id, userId) => {
        FinkiQAService.dislikeQuestion(id, userId)
            .then(() => {
                this.loadQuestions();
            });
    }

    likeQuestionFromDetails = (id, userId) => {
        FinkiQAService.likeQuestion(id, userId)
            .then(() => {
                this.loadQuestions();
                this.getQuestion(id);
            });
    }

    dislikeQuestionFromDetails = (id, userId) => {
        FinkiQAService.dislikeQuestion(id, userId)
            .then(() => {
                this.loadQuestions();
                this.getQuestion(id);
            });
    }

    findTagsContaining = (pattern) => {
        FinkiQAService.findTagsContaining(pattern)
            .then((data) => {
                this.setState({
                    searchedTags: data.data
                });
            });
    }


    isAdd = (boolean) => {
      if (boolean) {
          this.setState({
              selectedQuestion: {}
          })
      }
  }

    getQuestion = (id) => {
        FinkiQAService.getQuestion(id)
            .then((data) => {
                this.setState({
                    selectedQuestion: data.data
                });
            });
    }

    setCurrentUser = (user) => {
      this.setState({
          currentUser: user
      });
    }

    logOut() {
        AuthService.logout();
    }

  componentDidMount() {
      const user = AuthService.getCurrentUser();

      if (user) {
          this.setState({
              currentUser: user
          });
      }

      console.log(this.state.currentUser);
    this.loadQuestions();
    this.loadTags();
  }

}

export default App;
