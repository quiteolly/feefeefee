/**
 * Replaced in favour of SearchInput.tsx
 * 
 * Kept for history or in case accessible-autocomplete library will stop being supported
 */
import { useEffect, useRef, useState } from 'react';
import data, { RestaurantInfo, VAT_VALUE } from '../../data';

import './SearchInput.css';

type SearchInputProps = {
	onSubmit: (value: string | RestaurantInfo) => void;
}

export default function SearchInput({
	onSubmit,
}: SearchInputProps) {
	const listboxRef = useRef<HTMLUListElement>(null);

	const [value, setValue] = useState('');
	const [selectedCafe, setSelectedCafe] = useState<RestaurantInfo | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedCafeId, setSelectedCafeId] = useState(-1);

	function compareItemName(name: string) {
		const original = name.toLowerCase().replace(/-/g, ' ');
		const val = value.toLowerCase().replace(/-/g, ' ');
		return original.includes(val);
	}

	const filteredData = data.filter((item) => {
		return !value
		|| compareItemName(item['en'])
		|| compareItemName(item['ru'])
		|| compareItemName(item['ka'])
		|| item.aliases.findIndex(a => compareItemName(a)) > -1
	});

	const ariaActiveDescendant = selectedCafeId !== -1 ? `fff-search-listbox-${selectedCafeId}` : undefined;
	const noResultsFound = filteredData.length === 0;

	useEffect(() => {
		const selected = listboxRef.current?.querySelector('[aria-selected="true"]');
		if (selected?.scrollIntoView) selected?.scrollIntoView({
			block: 'nearest',
		});
	}, [selectedCafeId]);

	function handleFocusBlur(expand: boolean) {
		setIsExpanded(expand);
		if (expand === false && selectedCafeId !== -1) {
			onSelect(selectedCafeId);
			return;
		}
		setSelectedCafeId(-1);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
		setIsExpanded(true);
	}

	function submitFormChanges(val: RestaurantInfo | string) {
		setSelectedCafeId(-1);
		setIsExpanded(false);
		onSubmit(val);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const result = isNaN(Number(value)) && selectedCafe !== null && selectedCafe?.en !== '' ? selectedCafe : value;
		submitFormChanges(result);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!['ArrowDown', 'ArrowUp', 'Escape'].includes(e.key)) {
			return;
		}

		if (e.key === 'Escape') {
			e.preventDefault();
			setSelectedCafeId(-1);
		}

		if (e.key === 'ArrowDown') {
			const index = selectedCafeId + 1;
			if (index >= filteredData.length) {
				return;
			}

			e.preventDefault();
			setSelectedCafeId(index);
		}

		if (e.key === 'ArrowUp') {
			const index = selectedCafeId - 1;
			if (index < -1) {
				return;
			}

			e.preventDefault();
			setSelectedCafeId(index);
		}
	}

	function handleOptionMousedown(e: React.MouseEvent<HTMLLIElement>) {
		// This prevents .blur event from running, leaving focus on input:
		// https://stackoverflow.com/questions/7621711/how-to-prevent-blur-running-when-clicking-a-link-in-jquery
		e.preventDefault();
	}

	function onSelect(index: number) {
		const selected = filteredData[index] || value;
		setValue(selected?.en || value);
		setSelectedCafe(selected);
		submitFormChanges(selected);
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

	return (
		<form className="search" onSubmit={handleSubmit}>
			<label htmlFor="fff-search-input">Cafe name or percentage:</label>
			<div className="search__wrapper">
				<div className="search__input">
					<input
						id="fff-search-input"
						name="search"
						type="search"
						value={value}
						onFocus={() => handleFocusBlur(true)}
						onBlur={() => handleFocusBlur(false)}
						onChange={handleChange}
						onKeyDown={handleKeyDown}

						role="combobox"
						aria-describedby="fff-search-hint"
						aria-expanded={isExpanded}
						aria-controls="fff-search-listbox"
						aria-owns="fff-search-listbox"
						aria-autocomplete="list"
						autoComplete="off"
						aria-activedescendant={ariaActiveDescendant}
					/>
					<ul
						className="search__listbox"
						role="listbox"
						hidden={!isExpanded}
						id="fff-search-listbox"
						ref={listboxRef}
					>
						{filteredData.map((item, index) => (
							<li
								key={`listbox-${item.en}`}
								className="search__listbox-item"
								id={`fff-search-listbox-${index}`}
								role="option"
								tabIndex={-1}
								aria-selected={index === selectedCafeId}
								aria-posinset={index + 1}
								aria-setsize={filteredData.length}
								onMouseDown={handleOptionMousedown}
								onClick={() => onSelect(index)}
							>
								<div>
									<p>{renderItemTitle(item)}</p>
									<ul className="search__listbox-langs">
										{renderItemLangs(item).map(l => (
											<li key={`listbox-${item.en}-${l.lang}`} lang={l.lang}>{l.value}</li>
										))}
									</ul>
								</div>
								<div>{renderItemFee(item)}</div>
							</li>
						))}
						{noResultsFound && <li className="search__listbox-item search__listbox-item--no-results">
							No place results found
						</li>}
					</ul>
					<span id="fff-search-hint" hidden>
						When autocomplete results are available use Up and Down arrows to review and Enter to select.
						{' '}
						Touch device users, explore by touch or with swipe gestures.
					</span>
				</div>
				<button type="submit" className="search__button">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><g><path d="M12.2 13.6a7 7 0 111.4-1.4l5.4 5.4-1.4 1.4zM3 8a5 5 0 1010 0A5 5 0 003 8z" fill="currentColor"></path></g></svg>
					<span className="sr-only">Search</span>
				</button>
			</div>
		</form>
	);
}