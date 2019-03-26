import React from 'react'
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '', 
      newTitle: '',
      myKey: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmitTitle = this.handleSubmitTitle.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  // gets called when button is clicked to save document
  // simply grabs text value of form and
  // passes it to parent (app) as data


  /* here */
  /* getting this error when trying to post update to editor */
  /* × TypeError: Cannot read property 'state' of undefined */
  /* need to get the newTitle from state to pass this as a parma to handleUpdate in App.js */
  handleUpdate() {
    let title = this.state.newTitle;
    let data = this.state.text;
    this.props.handleUpdate(title, data);
  }

  // this updates the state of title from the input field
  handleChangeTitle(event) {
    console.log(event.currentTarget.value);
    this.setState({ newTitle: event.currentTarget.value })
  }


  // handles new title form submit
  handleSubmitTitle(event) {
      alert(this.state.newTitle)
      event.preventDefault()
      let title = this.state.newTitle;
      this.props.handleNewDocTitle(title);
  }

/* --------------------------------------here--------------------------------------  */
/* get handlUpdate to recognize what the form title is when saving (updating) editor */
/* then we need to change the axios.post call in app to be 'update', for saving documents */

  render() {
    return (
      <React.Fragment>
          <ReactQuill   value={this.state.text}
                        onChange={this.handleChange}></ReactQuill>
          <Button       variant="success" 
                        onClick={this.handleUpdate}
                        >Save Document</Button>
          <form onSubmit={this.handleSubmitTitle}>
            <input type="text" 
                   value={this.state.meyKey}
                   onChange={this.handleChangeTitle}  />
            <input type="submit" value="Submit" />
          </form>
      </React.Fragment>
    )
  }
}

export default Editor;