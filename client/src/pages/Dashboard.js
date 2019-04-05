import React, { Component } from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardBody from '../components/Dashboard/DashboardBody';
import DashboardDocList from '../components/Dashboard/DashboardDocList';

class Dashboard extends Component {
	state = {};

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
