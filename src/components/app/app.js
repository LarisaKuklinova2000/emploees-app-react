import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'Ivan L.', salary: 800, increase: false, rise: true, id: 1},
				{name: 'Denis P.', salary: 1200, increase: false, rise: false, id: 2},
				{name: 'Alexey Z.', salary: 4000, increase: true, rise: false, id: 3},
				{name: 'Farberov K.', salary: 3000, increase: false, rise: false, id: 4},
				{name: 'Stafilov M.', salary: 3500, increase: true, rise: false, id: 5}
			]
		}
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

	addItem = (name, salary) => {
		let maxId = 5;
		const newItem = {
			name: name,
			salary: salary,
			increase: false,
			rise: false,
			id: ++maxId
		}
		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		});
	}
	
    onToggleProp = (id, prop) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [prop]: !item[prop]}
				}
				return item;
			})
		}))
    }

	render () {
		return (
			<div className="app">
	
				<AppInfo 
					empCount={this.state.data.length}
					incrCount={this.state.data.filter(item => item.increase).length}/>
	
				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
			
				<EmployeesList 
					data={this.state.data}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp} />
				<EmployeesAddForm
					onAdd={this.addItem} />
	
			</div>
		);
	}
}

export default App;
