import React, { Component } from 'react';

import Homepage from '../components/HomePage/home';


class Home extends Component {
	constructor() {
		super()	
	}	
	componentDidMount() {
	console.log("home loaded")
	}	
	render() {
		return (			
				<Homepage 					
				/>				
		);
	}
}

export default Home;
