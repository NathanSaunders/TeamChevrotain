import React from 'react'
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.makeSave = this.makeSave.bind(this);
  }

  
  handleChange(value) {
    this.setState({ text: value })
  }

  // gets called when button is clicked to save document
  // simply grabs text value of form and
  // passes it to parent (app) as data
  makeSave() {
    let data = this.state.text;
    this.props.handleSave(data);
  }


  render() {
    return (
      <React.Fragment>
          <ReactQuill   value={this.state.text}
                        onChange={this.handleChange}></ReactQuill>
          <Button       variant="success" 
                        onClick={this.makeSave}
                        >Save Document</Button>
      </React.Fragment>
    )
  }
}


export default Editor;