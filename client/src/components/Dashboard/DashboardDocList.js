import React from 'react'
import axios from 'axios'
import './Home.css'


class DashboardDocList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '', 
      data: '',
    }
    this.getDocFromDB = this.getDocFromDB.bind(this);
    this.getDataFromDb = this.getDataFromDb.bind(this);
  }
  

    componentWillMount(){
        this.getDataFromDb();
    };


    getDataFromDb = () => {
        fetch("/api/getData")
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }))
    };

    getDocFromDB = (id, e) => {
      alert(id)
      
      axios.get('/getDoc', {
          params: {
            _id: id
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
      });
    }


  render() {
    return (
     <div className='docs-list'>
          <ul>
            {/* this renders our list of all docs in the db */}
            {/* and their content */}
            {this.state.data.length <= 0? "NO DB ENTRIES YET": this.state.data.map(data => (
                <li key={data._id}>
                   <span> Title: </span> <p className='link-to-doc' data-id={data._id} onClick={this.getDocFromDB.bind(this, data._id)}>{data.title}</p>
                    <br/>
                   <span> data: </span> {data.content}
                  </li>
               ))}
          </ul>
        </div>
    );
  }
};


export default DashboardDocList;