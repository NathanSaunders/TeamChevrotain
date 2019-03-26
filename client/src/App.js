import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./pages/Login"
import './App.css';
import Editor from './components/quill'; 
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '', 
      text: ''
    }
    this.handleNewDocTitle = this.handleNewDocTitle.bind(this)
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("/api/getData")
      // .then(data => data.json())
      // .then(res => this.setState({ data: res.data }))
      .then(res => res.text())          // convert to plain text
      .then(text => console.log(text))  // then log it out
  }

  
  // is called by ./components/quill/editor makeSave function
  // receives quill editor data as 'data'
  handleNewDocTitle(title) {
    this.setState( {
      title: title,
      // text: data
    }, () => {
      // our put method that uses our backend api
      axios.post("http://localhost:8080/api/putData", {
        title: this.state.title,
        // content: this.states.text
      });
    });
  }

  handleUpdate(title, data) {
    this.setState( {
      title: title,
      text: data
    }, () => {
      console.log(`This.state.text: ${this.state.text}`);
      // our put method that uses our backend api
      axios.post("http://localhost:8080/api/updateData", {
        title: this.state.title,
        content: this.states.text
      });
    });
  }

  render () {
    return(
      <Router>
        <div>
          <Route path='/' exact component={Login} />
          <Route 
            path='/editor' 
            render={(props) => <Editor {...props} handleNewDocTitle={this.handleNewDocTitle} />}
          />
        </div>
      </Router>
    )
  }
}

export default App;

 

