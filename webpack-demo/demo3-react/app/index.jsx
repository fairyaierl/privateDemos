import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/scss/bootstrap.scss';
import './index.scss';

import Search from './components/search'
import Plist from './components/plist'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ""
		}
	}

	updateKeyword(name) {
		console.log(this)
		this.setState({
			keyword: name
		})
	}

	render() {
		return (
			<div className="container">
				<section className="jumbotron">
					<h3 className="jumbotron-headering">Search Github User</h3>
					<Search sendAction={this.updateKeyword.bind(this)}></Search>
				</section>
				<Plist keyword={this.state.keyword} />
			</div>
		)
	}
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);