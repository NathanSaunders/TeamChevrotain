import React, { Component } from "react";
// import brace from 'brace';
import  AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/twilight';
import 'brace/ext/settings_menu'
import 'brace/ext/searchbox'

import './Home.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');


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
  // onChange(newValue) {
  //   console.log('change',newValue);
  // }

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
      <div className="container">
        <div className="container">
          {/* <h6>Hello, {retrievedEmail} </h6>        */}
        </div>
        <div className='doc-title-input'>
          <input type='text' placeholder='Enter File Name...' value={this.state.inputValue} onChange={this.handleInputValue}></input>
          <input type='submit' value='Save File Name' onClick={this.saveNewTitle}></input>
        </div>

        <section id="be-the-first" className="pad-xs">
              <div className="container">
                <div className="row">
                  <div className="col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn" data-wow-delay="0.6s">
                    {/* <h2>Code your Masterpiece!</h2> */}
                    <p className="lead">Work on your app idea simultaneously with colleagues!</p>
                  </div>
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
          value={`function onLoad(editor) {
            console.log("i've loaded");
          }`}
          //value={this.state.text}
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
    </section>


       
      </div>
    );
  }
}

export default DashboardBody;