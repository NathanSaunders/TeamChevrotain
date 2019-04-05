import React, { Component } from "react";
// import brace from 'brace';
import  AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/twilight';
import 'brace/ext/settings_menu'
import 'brace/ext/searchbox'
// import ReactQuill from 'react-quill';
// import snapLogo from '../assets/snap.png';
// import openSocket from 'socket.io-client';
import './Home.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');

// const  socket = openSocket('http://localhost:8000');
class DashboardBody extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      title: '',
      inputValue: '',
      text: '', 
      savedStatus: 'not saving' 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.saveNewTitle = this.saveNewTitle.bind(this);
  }
  class = {};

  // updadates state of text when keys are pressed within editor text input field
  handleChange(value) {
    this.setState({ text: value })
    let data = this.state.text;
    this.props.handleChangeParent(data);
  }


  handleInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  saveNewTitle(event) {
    event.preventDefault();
    let newTitle = this.state.inputValue;
    this.setState({ title: newTitle})
    this.props.handleNewTitleParent(newTitle);
  }

  componentDidMount () {
    const retrievedToken = localStorage.getItem("token");
    if(!retrievedToken == "") {
      document.getElementById("collaborate").style.display = "block";
      console.log('token: ' + retrievedToken)
    }
    // const script = document.createElement("script");
    // script.src = "togetherjs-min.js";
    // //script.async = true;
    // document.head.appendChild(script);
    // // const button=document.createElement("button");
    // // button.innerHTML="start collaborate"
    // // document.body.appendChild(button)
    // // button.addEventListener ("click", function() {
    // //   this.script.TogetherJS(this); return false
    // // });
  }
  

  render() {
    const retrievedEmail = localStorage.getItem('email');

    return (
      <div>
        <div className="container">
          <h6>Hello, {retrievedEmail} </h6>       
        </div>
        <div className='doc-title-input'>
          <input type='text' placeholder='Enter a new title...' value={this.state.inputValue} onChange={this.handleInputValue}></input>
          <input type='submit' value='Save your new title' onClick={this.saveNewTitle}></input>
        </div>
        <AceEditor  
            // var editor = brace.edit("editor")
            // brace.require('brace/ext/settings_menu').init(editor);
            // editor.setTheme("brace/theme/twilight");
            // editor.session.setMode("brace/mode/html");
            // editor.commands.addCommands([{
            // name: "showSettingsMenu",
            // bindKey: {win: "Ctrl-q", mac: "Ctrl-q"},
            // exec: function(editor) {
            //   editor.showSettingsMenu();
            // },
            // readOnly: true
            // }]);
            
            commands={[{
            name: "showSettingsMenu",
            bindKey: {win: "Ctrl-q", mac: "Ctrl-q"},
            exec: function(editor) {
              editor.showSettingsMenu();
            },
            readOnly: true
          }]}
    
          placeholder="Placeholder Text"
          mode="javascript"
          theme="twilight"
          name="blah2"
          ext="searchbox"
          onChange={this.handleChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.text}
          title={this.state.title}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          />
      </div>
    );
  }
}

export default DashboardBody;