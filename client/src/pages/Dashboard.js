import React, { Component } from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardBody from '../components/Dashboard/DashboardBody';
import DashboardDocList from '../components/Dashboard/DashboardDocList';

class Dashboard extends Component {
	constructor() {
		super()
		this.state = {};
		this.CheckToken = this.CheckToken.bind(this);
	}
	
	componentDidMount() {
		this.CheckToken()
	}

	CheckToken = () => {
		const retrievedToken = localStorage.getItem("token");
		console.log(retrievedToken)
		if(retrievedToken === null) {
			this.props.history.push("/");
		}
	} 
	
	render() {
		return (
			<div>
				<DashboardHeader 
					enableDocsList={this.props.enableDocsList}
					handleDashboardSave={this.props.handleDashboardSave}
					savedStatus={this.props.savedStatus}
				/>
				{
                !this.props.displayDocsList ?
                (
                    <DashboardBody 
						handleChangeParent={this.props.handleChangeParent}
						handleNewTitleParent={this.props.handleNewTitleParent}
						/>
                )
                :  	<DashboardDocList />
            	}
			</div>
		);
	}
}

export default Dashboard;
