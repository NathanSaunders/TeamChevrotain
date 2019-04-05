import React from 'react'
import snapLogo from '../../assets/snap.png';
import openSocket from 'socket.io-client';
import './Home.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');


const  socket = openSocket('http://localhost:8000');


class DashboardHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '', 
      savedStatus: '' 
    }
    this.handleChange = this.handleChange.bind(this);
    this.callDashboardHandleSave = this.callDashboardHandleSave.bind(this);
    this.navigateToDocs = this.navigateToDocs.bind(this);
  }
  
  
  componentDidMount(){
      fetch('/api/gettext')
        // .then(res => res.json())
        .then(data => this.setState({ text: data }));
        socket.on('subscribeToText', (text) => {
          this.setState({text: text});
        });
    };

  handleChange(value) {
    let status = '';
    if (value.length !== this.state.text.length) {
        console.log("I am Emitting");
        socket.emit('toText', value);
      };
      this.setState({text: value, savedStatus: status});
      console.log(this.state.text);
  };


  // calls DashboardHandlSave in parent App.js
  callDashboardHandleSave() {
    this.props.handleDashboardSave();
  }

  // calls function to enable render of DocsList
  navigateToDocs() {
    this.props.enableDocsList();
  }

  render() {
    let savedStatus = this.props.savedStatus;

    let saveStatusRender = () => {
      if (savedStatus === ''){
        return '';
      } else {
        return savedStatus;
      }
    }
    
    return (
      <div>
        <div className="top-nav">
          <div className="snap-logo">
            <img src={snapLogo} alt='snap Logo' />
          </div>
          <div className="find-db-docs">
            <p className='docs' onClick={this.navigateToDocs}>Get Documents</p>
          </div>
          <p className="save-status">{ saveStatusRender() }</p>
          <div onClick={this.callDashboardHandleSave} className="save-button">
            Save
          </div>        
        </div>     
      </div>
    );
  }
};

export default DashboardHeader;
