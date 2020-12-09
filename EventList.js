import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';

import { getEvents } from './api';

const styles = StyleSheet.create({
	list: {
		flex: 1,
		paddingTop: 5,
	},
});

class EventList extends Component {
	static navigationOptions = {
		title: 'Your Events',
		// headerRight: (
		//   <TouchableHighlight
		//     style={styles.addButton}
		//   >
		//     <Text style={styles.addButtonLabel}>+</Text>
		//   </TouchableHighlight>
		// ),
	};

	state = {
		events: [],
	};

	componentDidMount() {
		// getEvents().then(events => this.setState({ events }));

		setInterval(() => {
			this.setState({
				events: this.state.events.map((evt) => ({
					...evt,
					timer: Date.now(),
				})),
			});
		}, 1000);

		this.props.navigation.addListener('didFocus', () => {
			getEvents().then((events) => this.setState({ events }));
		});
	}

	handleAddEvent = () => {
		this.props.navigation.navigate('form');
	};

	render() {
		// console.log('isfocused', this.props.navigation.isFocused);
		return [
			<FlatList
				key='flatlist'
				data={this.state.events}
				style={styles.list}
				keyExtractor={(item) => item.id}
				renderItem={({ item, separators }) => <EventCard event={item} />}
			/>,
			<ActionButton
				key='fab'
				buttonColor='#9b59b6'
				onPress={this.handleAddEvent}
			/>,
		];
	}
}

export default EventList;
