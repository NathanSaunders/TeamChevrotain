import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./pages/Login"
import './App.css';
/* added import Editor */
import Editor from './components/quill'; 


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleSave = this.handleSave.bind(this)
  }

  // is called by ./components/quill/editor makeSave function
  // receives quill editor data as 'data'
  handleSave(data) {
    this.setState( {
      text: data
    }, () => {
      console.log(`This.state.text: ${this.state.text}`);
    });
  }

  render () {
    return(
      <Router>
        <div>
          <Route path='/' exact component={Login} />

          {/* added route path for editor component */}
          <Route 
            path='/editor' 
            render={(props) => <Editor {...props} handleSave={this.handleSave} />}
          />

        </div>
      </Router>
    )
  }
}

export default App;



