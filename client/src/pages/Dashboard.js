import React, { Component } from 'react';
import axios from 'axios';
import DashboardHeader from 'DashboardHeader';
import DashboardBody from 'DashboardBody';

class Dashboard extends Component {
	state = {};

	render() {
		return (
			<div>
				<DashboardHeader />
				<DashboardBody />
			</div>
		);
	}
}

export default Dashboard;
