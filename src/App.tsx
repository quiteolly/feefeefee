import { useEffect, useState } from 'react';
import './App.css';

import ItemInput from './components/ItemInput/ItemInput';
import SearchInput from './components/SearchInput/SearchInput';
import FormFooter from './components/FormFooter/FormFooter';
import AddItemButton from './components/AddItemButton/AddItemButton';
import { RestaurantInfo, VAT_VALUE } from './data';

export type FormItem = {
	id: string;
	value: string;
}

const REPORT_FORM_URL = 'https://forms.office.com/r/Uw65SN83Uj';
const STORAGE_KEY = 'app-data';

function getNewItem() {
	return {
		id: Math.random().toString().replace('0.', ''),
		value: '',
	}
}

function getFormData() {
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		if (data === null) {
			throw Error('no data found');
		}

		return JSON.parse(data);
	} catch(e) {
		console.error(`Error when reading the data: ${e}`);
	}

	return [
		getNewItem(),
	];
}

function App() {
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState<FormItem[]>(() => getFormData());
	const [autoFocus, setAutoFocus] = useState(false);
	
	useEffect(() => {
		if (autoFocus) setAutoFocus(false);
	}, [autoFocus]);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
		} catch(e) {
			console.error(`Error when saving the data: ${e}`);
		}
	}, [formData]);

	const fee = query.toLowerCase() === 'vat' ? VAT_VALUE : Number(query) / 100;

	function onSearchSubmit(value: RestaurantInfo | string) {
		if (value === null || value === undefined) return;
		if (typeof value === 'string') {
			setQuery(value);
		} else {
			const fee = value.fee === 'vat' ? value.fee : (value.fee * 100).toString();
			setQuery(fee);
		}
	}
	
	function onItemInputChange(item: FormItem) {
		const val = item.value;
		if ((val.match(/[.,]/g) || []).length <= 1) {
			item.value = val.replace(/,/g, '.');
		}
		if (!isNaN(Number(val))) {
			setFormData(
				formData.map(formItem => formItem.id === item.id ? item : formItem)
			);
		}
	}

	function onItemInputRemove(item: FormItem) {
		setFormData(
			formData.filter(formItem => formItem.id !== item.id)
		);
	}

	function onAddItemClick() {
		setAutoFocus(true);
		setFormData([
			...formData,
			getNewItem(),
		]);
	}

	function onClearData() {
		const dialog = confirm('You are clearing the form data. Continue?');
		if (dialog) {
			setFormData([
				getNewItem(),
			]);
		}
	}

	return (
		<main className="App">
			<h1 className="App__heading">
				<img src="/logo.svg" alt="" />
				<div>feefeefee</div>
				{fee !== 0 && (
					<em>+{(fee * 100).toFixed(0)}%</em>
				)}
			</h1>
			<p className="App__intro">
				Calculate prices with service fees included in different Georgian restaurants.
				{' '}
				<a href={REPORT_FORM_URL}>Add a place / Report an error</a>
			</p>
			{/* <ul className="App__langs">
				<li lang="en"><strong>English</strong></li>
				<li lang="ka">ქართული</li>
				<li lang="ru">Русский</li>
			</ul> */}
			<SearchInput onSubmit={onSearchSubmit} />
			{formData.map((item, index) => (
				<ItemInput
					key={`formdata-${item.id}`}
					fee={fee}
					item={item}
					showRemoveButton={formData.length > 1}
					autoFocus={autoFocus && index === formData.length - 1}
					onChange={onItemInputChange}
					onRemove={onItemInputRemove}
				/>
			))}
			<AddItemButton onClick={onAddItemClick} />
			<FormFooter fee={fee} data={formData} onClearData={onClearData} />
			<div>
				<a href={REPORT_FORM_URL}>Add a place / Report an error</a>
			</div>
		</main>
	);
}

export default App;
