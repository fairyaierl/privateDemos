import React from 'react';

import get from '../utils/ajax'

export default class Plist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			firstView: true,
			list: []
		};
	}

	componentWillReceiveProps(nextProps) {
		let keyword = nextProps.keyword;
		this.setState({
			loading: true,
			firstView: false
		});
		let url = `https://api.github.com/search/users?q=${keyword}`;
		get(url).then((data) =>{
			this.setState({
				loading: false,
				list: data.items
			})
		}).catch((error)=>{
			console.error(error);
		})
	}

	render() {
		const { loading, firstView, list } = this.state;

		const renderCont = () => {
			if (loading) {
				return ""
			}
		}

		if (firstView) {
			return (<h2>Please enter name to search.</h2>)
		}

		if (loading) {
			return (<h2>loading</h2>)
		} else {
			if(list.length==0){
				return (<h2>No result</h2>)
			}else{
				return (
					<div className="row">
						{list.map( (people)=>{
							return (
								<div className="card" key={people.login}>
									<img src={people.avatar_url} style={{width: '50px'}}/>
									<p className="card-next">{people.login}</p>
								</div>
								)

						})}
					</div>)
			}
		}
	}
}