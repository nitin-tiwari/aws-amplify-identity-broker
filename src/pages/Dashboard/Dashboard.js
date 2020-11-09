/*
* Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
* SPDX-License-Identifier: MIT
*
* Licensed under the MIT License. See the LICENSE accompanying this file
* for the specific language governing permissions and limitations under
* the License.
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { API } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';

//Branded Theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../branding';

import AppTiles from './appTiles';
import Header from '../../components/AppBar/AppBar';
import AppSnackbar from '../../components/Snackbar/Snackbar';

import './dashboard.css';

/*
 * Localization
 */
const strings = {
	en: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_ERROR_MESSAGE: "An error has occurred",
	},
	fr: {
		DASHBOARD_TITLE: "Tableau de bord",
		DASHBOARD_ERROR_MESSAGE: "Une erreur est survenue",
	},
	de: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_ERROR_MESSAGE: "Ist ein Fehler aufgetreten",
	},
	nl: {
		DASHBOARD_TITLE: "Dashboard",
		DASHBOARD_ERROR_MESSAGE: "Er is een fout opgetreden",
	}
}
I18n.putVocabularies(strings);

const mapStateToProps = (state) => {
	return {
		auth: state.app.auth,
		lang: state.app.lang
	}
}

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registeredClients: [],
			snackBarOps: {
				type: 'info',
				open: false,
				vertical: 'top',
				horizontal: 'center',
				autoHide: 0,
				message: ''
			}
		}
	}

	componentDidMount() {
		this.getClients();
	}

	/*
	 * API call to get the Apps (Clients) for Single Sign On (SSO)
	 * Each App will shown with Logo, Name and a Link to LogbackUri
	 */
	getClients() {
		const apiName = 'amplifyIdentityBrokerApi';
		const path = '/clients';

		API
			.get(apiName, path)
			.then(response => {
				this.setState({ registeredClients: response });
			})
			.catch(err => {
				console.log(err);
				this.setState({
					snackBarOps: {
						type: 'error',
						open: true,
						vertical: 'top',
						horizontal: 'center',
						autoHide: 3000,
						message: I18n.get("DASHBOARD_ERROR_MESSAGE")
					}
				});
			});
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				{this.state.snackBarOps.open && (
					<AppSnackbar ops={this.state.snackBarOps} />
				)}

				<Header
					auth={this.props.auth}
					pageTitle={I18n.get("DASHBOARD_TITLE")}
					lang={this.props.lang}
					routeTo={(newPath) => this.props.history.push(newPath)}
				/>

				<AppTiles appClients={this.state.registeredClients} />
			</MuiThemeProvider>
		)
	}
}

export default withRouter(connect(mapStateToProps, {})(Dashboard));