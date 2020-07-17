import React from 'react';

import ImageList from '../ImageList/ImageList';
import ImageSearch from '../ImageSearch/ImageSearch';

const API_KEY = '17505546-2b462b24d052c5672d7474755';

class App extends React.Component {
	state = {
		images: [],
		error: null
	};
	handleMakeRequest = async (e) => {
		e.preventDefault();
		const searchValue = e.target.elements.searchValue.value;
		const request = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchValue}&per_page=15`);
		const results = await request.json();
		if (!searchValue) {
			this.setState({ error: 'Please provide a valid search value.' });
		} else {
			this.setState({ images: results.hits, error: null });
		}
	};
	render() {
		return (
			<div>
				<ImageSearch handleMakeRequest={this.handleMakeRequest} />
				{this.state.error !== null ? (
					<div style={{ color: '#fff', textAlign: 'center' }}>{this.state.error}</div>
				) : (
					<ImageList images={this.state.images} />
				)}
			</div>
		);
	}
}

export default App;
