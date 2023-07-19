import { useState } from 'react';
import AccessibleAutocomplete from 'accessible-autocomplete/react';
import data, { RestaurantInfo, VAT_VALUE } from '../../data';

import './SearchInput.css';

type SearchInputProps = {
	/**
	 * Callback for the form submission events.
	 * @param value Current form value.
	 */
	onSubmit: (value: string | RestaurantInfo) => void;
}

export default function SearchInput({
	onSubmit,
}: SearchInputProps) {
	const [value, setValue] = useState('');

	/**
	 * Get title in the preferred language for an autocomplete option.
	 * @returns Title in the preferred language, English or null.
	 */
	function getOptionTitle(item: RestaurantInfo) {
		if (!item) {
			return null;
		}
		return item.en;
	}

	/**
	 * Get other languages for an autocomplete option.
	 * @returns List of other 
	 */
	function getOptionLangs(item: RestaurantInfo) {
		return [
			{ lang: 'ka', value: item.ka },
			{ lang: 'ru', value: item.ru },
		].filter(lang => lang.value);
	}

	/**
	 * Render the service fee for an autocomplete option.
	 * @returns Service fee amount.
	 */
	function renderOptionFee(item: RestaurantInfo) {
		if (item.fee === 'vat') {
			const clarify = !item.en.includes('VAT');
			return (clarify ? 'VAT/' : '') + (VAT_VALUE * 100) + '%';
		}

		return (item.fee * 100).toFixed(0) + '%';
	}

	/**
	 * Render an HTML template for accessible-autocomplete.
	 * accessible-autocomplete docs: https://github.com/alphagov/accessible-autocomplete#templates-default-undefined
	 * @returns HTML (API does not support React elements) of the rendered option.
	 */
	function renderOption(item: RestaurantInfo) {
		if (!item) {
			return null;
		}

		return `<div>
			<p>${getOptionTitle(item)}</p>
			<ul class="search__listbox-langs">
				${getOptionLangs(item).map(l => `<li lang=${l.lang}>${l.value}</li>`).join('')}
			</ul>
		</div>
		<div>${renderOptionFee(item)}</div>`;
	}

	/**
	 * Compare two strings in lowercase and with hyphens removed.
	 * @returns Whether one string contains another one.
	 */
	function compareItemName(query: string, value: string) {
		const original = value.toLowerCase().replace(/-/g, ' ');
		const val = query.toLowerCase().replace(/-/g, ' ');
		return original.includes(val);
	}

	/**
	 * Filter a result based on whether some data in the current item matches.
	 * @param query Current query.
	 * @param item Georgian restaurant data.
	 */
	function filterResult(query: string, item: RestaurantInfo) {
		return !query
		// Compare to languages
		|| compareItemName(query, item['en'])
		|| compareItemName(query, item['ru'])
		|| compareItemName(query, item['ka'])
		// Compare to aliases
		|| item.aliases.findIndex(a => compareItemName(query, a)) > -1
	}

	/**
	 * Called when updating the autocomplete.
	 * accessible-autocomplete docs: https://github.com/alphagov/accessible-autocomplete#source
	 * @param query Value from input field.
	 * @param syncResults Function to populate the results.
	 * @returns Data in the results.
	 */
	function suggest(query: string, syncResults: (values: RestaurantInfo[]) => void) {
		setValue(query);
		if (!query) {
			syncResults(data);
			return data;
		}

		const filteredData = data.filter(item => filterResult(query, item));
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

	/**
	 * Called when the user confirms an option, with the option they've confirmed.
	 * accessible-autocomplete docs: https://github.com/alphagov/accessible-autocomplete#onconfirm-default---
	 * @param result Selected option.
	 */
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
							inputValue: getOptionTitle,
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