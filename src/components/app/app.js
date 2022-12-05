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
				{name: 'Alexey Z.', salary: 4000, increase: true, rise: true, id: 3},
				{name: 'Farberov K.', salary: 3000, increase: false, rise: false, id: 4},
				{name: 'Stafilov M.', salary: 3500, increase: true, rise: false, id: 5}
			],
			term: '',
			filter: 'all'
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

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term})
	}

	filterPost = (items, filter) => {
		switch(filter) {
			case 'rise':
				return items.filter(item => item.rise);
			case 'moreThen1000':
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	}

	onFilterSelect = (filter) => {
		this.setState({filter});

	}

	render() {
		const {data, term, filter} = this.state;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className="app">
	
				<AppInfo 
					empCount={data.length}
					incrCount={data.filter(item => item.increase).length}/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter 
						filter={filter}
						onFilterSelect={this.onFilterSelect}/>
				</div>
			
				<EmployeesList 
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp} />
				<EmployeesAddForm
					onAdd={this.addItem} />
	
			</div>
		);
	}
}

export default App;
