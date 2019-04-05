import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
// import Editor from "./components/quill";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      title: "",
      text: "",
      editorActive: false,
      doc_id: "",
      savedStatus: '',
      displayDocsList: false
    };
    this.handleChangeParent = this.handleChangeParent.bind(this);
    this.handleDashboardSave = this.handleDashboardSave.bind(this);
    this.handleSaveStatusParent = this.handleSaveStatusParent.bind(this);
    this.enableDocsList = this.enableDocsList.bind(this);
    this.handleNewTitleParent = this.handleNewTitleParent.bind(this);
    // this.handleNewDocTitleParent = this.handleNewDocTitleParent.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }


  // gets called by DashboardBody
  // udates state of text with data param
  handleChangeParent(data) {
    this.setState({ text: data })
    console.log(`State from APP PARENT: ${this.state.text}`);
  }

  handleDashboardSave() {
    this.handleSaveStatusParent('Loading...')

    let title = this.state.title;
    let content = this.state.text;
    let data = {title, content};
    
    fetch('/api/savetext', {
      method: 'POST',
      mode: "cors",
      referrer: "no-referrer",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        return response.json();
    }).then(data => {
        console.log(data);
        this.handleSaveStatusParent('Saved!')
      })
  }


  handleSaveStatusParent(status){
    this.setState({savedStatus: status})
    if (status === 'Saved!'){
      setTimeout(() => {
        this.setState({savedStatus: ''})
      },2000)
    }
  }


  enableDocsList() {
    this.setState({ displayDocsList: true});
  }

  // gets called by DashboardBody.js
  handleNewTitleParent(newTitle) {
    console.log(`New Title (inside App): ${newTitle}`);
    this.setState({title: newTitle});
  }

  // is called by ./components/quill/editor makeSave function
  // receives quill editor data as 'data'
  // handleNewDocTitleParent(title) {
  //   this.setState(
  //     {
  //       title: title
  //       // text: data
  //     },
  //     () => {
  //       // our put method that uses our backend api
  //       axios
  //         .post("http://localhost:8080/api/putData", {
  //           title: this.state.title
  //           // content: this.states.text
  //         })
  //         .then(response => {
  //           /* here */
  //           /* now i have the id of the newly-created document */
  //           /* need to pass this id as a param to editor somehow so that */
  //           /* it can render editor as a non-generic component */
  //           this.setState({ doc_id: response.data._id });
  //         });
  //     }
  //   );
  // }

  // handleUpdate(doc_id, data) {
  //   this.setState(
  //     {
  //       doc_id: doc_id,
  //       text: data
  //     },
  //     () => {
  //       console.log(`This.state.text: ${this.state.text}`);
  //       console.log(`This.state.doc_id: ${this.state.doc_id}`);
  //       // our put method that uses our backend api
  //       axios.post("http://localhost:8080/api/updateData", {
  //         _id: this.state.doc_id,
  //         content: this.state.text
  //       });
  //     }
  //   );
  // }

  render() {
    const { data } = this.state;

    return (
      <Router>        
        <div>
            <Route path="/" exact component={Login} />
            {/* <Route path="/editor"  render={props => (<Editor {...props}
                  handleNewDocTitleParent={this.handleNewDocTitleParent}
                  handleUpdate={this.handleUpdate}
                  doc_id={this.state.doc_id}
                  />)}  /> */}
             {/* <Route path="/dashboard" exact component={Dashboard} /> */}
             <Route path="/dashboard" render={props => (<Dashboard {...props}
                  savedStatus={this.state.savedStatus}
                  enableDocsList={this.enableDocsList}
                  handleNewTitleParent={this.handleNewTitleParent}
                  displayDocsList={this.state.displayDocsList}
                  handleNewDocTitleParent={this.handleNewDocTitleParent}
                  handleChangeParent={this.handleChangeParent}
                  handleDashboardSave={this.handleDashboardSave}
                  handleUpdate={this.handleUpdate}
                  doc_id={this.state.doc_id}
                  />)}  />
        </div>
   </Router>
    );
  }
}

export default App;
