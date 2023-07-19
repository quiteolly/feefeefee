import { useState } from 'react';
import AccessibleAutocomplete from 'accessible-autocomplete/react';
import data, { RestaurantInfo, VAT_VALUE } from '../../data';

import './SearchInput.css';

type SearchInputProps = {
	onSubmit: (value: string | RestaurantInfo) => void;
}

export default function SearchInput({
	onSubmit,
}: SearchInputProps) {
	const [value, setValue] = useState('');

	function compareItemName(query: string, name: string) {
		const original = name.toLowerCase().replace(/-/g, ' ');
		const val = query.toLowerCase().replace(/-/g, ' ');
		return original.includes(val);
	}

	function filterResults(query: string, item: RestaurantInfo) {
		return !query
		// Compare to languages
		|| compareItemName(query, item['en'])
		|| compareItemName(query, item['ru'])
		|| compareItemName(query, item['ka'])
		// Compare to aliases
		|| item.aliases.findIndex(a => compareItemName(query, a)) > -1
	}

	function renderItemTitle(item: RestaurantInfo) {
		return item.en;
	}

	function renderItemLangs(item: RestaurantInfo) {
		return [
			{ lang: 'ka', value: item.ka },
			{ lang: 'ru', value: item.ru },
		].filter(lang => lang.value);
	}

	function renderItemFee(item: RestaurantInfo) {
		if (item.fee === 'vat') {
			const clarify = !item.en.includes('VAT');
			return (clarify ? 'VAT/' : '') + (VAT_VALUE * 100) + '%';
		}

		return (item.fee * 100).toFixed(0) + '%';
	}

	function renderOption(result: RestaurantInfo) {
		if (!result) {
			return null;
		}

		// This field does not support React elements, only inner HTML
		return `<div>
			<p>${renderItemTitle(result)}</p>
			<ul class="search__listbox-langs">
				${renderItemLangs(result).map(l => `<li lang=${l.lang}>${l.value}</li>`).join('')}
			</ul>
		</div>
		<div>${renderItemFee(result)}</div>`;
	}

	function getInputValue(result: RestaurantInfo) {
		if (!result) {
			return null;
		}
		return result?.en;
	}

	function suggest(query: string, syncResults: (values: RestaurantInfo[]) => void) {
		setValue(query);
		if (!query) {
			syncResults(data);
			return data;
		}

		const filteredData = data.filter(item => filterResults(query, item));
		syncResults(filteredData);
		return filteredData;
	}

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const isNumber = !isNaN(Number(value));
		if (isNumber) {
			onSubmit(value);
		} else {
			const filteredData = data.filter(item => item.en === value);
			if (filteredData.length > 0) {
				onSubmit(filteredData[0]);
			} else {
				alert(`What you entered (${value}) is not a number or a valid cafe.`);
			}
		}
	}

	function onConfirm(result: RestaurantInfo | undefined) {
		if (!result) return;

		onSubmit(result);
		setValue(result.en);
	}

	return (
		<form className="search" onSubmit={onFormSubmit}>
			<label htmlFor="fff-search-input">Cafe name or percentage:</label>
			<div className="search__wrapper">
				<div className="search__input">
					<AccessibleAutocomplete
						id="fff-search-input"
						source={suggest}
						onConfirm={onConfirm}
						showAllValues={true}
						dropdownArrow={() => ''}
						showNoOptionsFound={false}
						templates={{
							inputValue: getInputValue,
							suggestion: renderOption,
						}}
					/>
				</div>
				<button type="submit" className="search__button">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g><path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z" fill="currentColor"></path></g></svg>
					<span className="sr-only">Search</span>
				</button>
			</div>
		</form>
	);
}