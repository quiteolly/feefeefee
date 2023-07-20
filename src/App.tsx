import { useEffect, useState } from 'react';
import './App.css';

import { RestaurantInfo, VAT_VALUE } from './data';
import { I18nValidLang, i18n, isValidLang } from './i18n';
import AddItemButton from './components/AddItemButton/AddItemButton';
import FormFooter from './components/FormFooter/FormFooter';
import ItemInput from './components/ItemInput/ItemInput';
import LangSelector from './components/LangSelector/LangSelector';
import SearchInput from './components/SearchInput/SearchInput';

/**
 * Report form URL.
 */
const REPORT_FORM_URL = 'https://forms.office.com/r/Uw65SN83Uj';

/**
 * localStorage key for current form data.
 */
const DATA_STORAGE_KEY = 'fff-data';

/**
 * localStorage key for current interface language.
 */
const LANG_STORAGE_KEY = 'fff-lang';

/**
 * An item in a form.
 */
export type FormItem = {
	/**
	 * Randomised ID for React purposes.
	 */
	id: string;
	/**
	 * Item input value.
	 */
	value: string;
}

/**
 * Get current interface language from localStorage or browser languages.
 * @returns Current interface language.
 */
function getLang(): I18nValidLang {
	let result = 'en';
	try {
		const lang = localStorage.getItem(LANG_STORAGE_KEY);
		if (lang !== null) {
			result = lang;
		} else {
			const navLangs = navigator.languages.filter(lang => {
				const code = lang.split('-')[0];
				return isValidLang(code);
			});

			if (navLangs.length > 0) {
				result = navLangs[0];
			}
		}
	} catch(e) {
		console.error(`Error when reading the interface language: ${e}`);
	}

	if (!isValidLang(result)) {
		return 'en';
	}
	return result;
}

/**
 * @returns A new blank form item.
 */
function getNewItem(): FormItem {
	return {
		id: Math.random().toString().replace('0.', ''),
		value: '',
	}
}

/**
 * @returns Existing localStorage data or a blank form with 1 item.
 */
function getFormData(): FormItem[] {
	try {
		const data = localStorage.getItem(DATA_STORAGE_KEY);
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

/**
 * Set localStorage item by key.
 * @param key localStorage key.
 * @param data New localStorage data.
 */
function setStorageItem(key: string, data: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch(e) {
		console.error(`Error when saving the data to ${key.toUpperCase()}: ${e}`);
	}
}

function App() {
	const [lang, setLang] = useState<'en' | 'ka' | 'ru'>(() => getLang());
	const [query, setQuery] = useState('');
	const [formData, setFormData] = useState<FormItem[]>(() => getFormData());
	const [autoFocus, setAutoFocus] = useState(false);

	const subtitleLang = lang === 'ka' ? 'en' : 'ka';
	const fee = query.toLowerCase() === 'vat' ? VAT_VALUE : Number(query) / 100;

	/**
	 * Save current form data to localStorage.
	 */
	useEffect(() => {
		setStorageItem(DATA_STORAGE_KEY, formData);
	}, [formData]);

	/**
	 * Change things that depend on current interface language, and remember it.
	 */
	useEffect(() => {
		document.title = `${i18n(lang, 'title')} (${i18n(subtitleLang, 'title')})`;
		document.documentElement.setAttribute('lang', lang);

		setStorageItem(LANG_STORAGE_KEY, lang);
	}, [lang, subtitleLang]);
	
	/**
	 * Reset autoFocus after it was set to focus on the new item.
	 */
	useEffect(() => {
		if (autoFocus) setAutoFocus(false);
	}, [autoFocus]);

	/**
	 * Render a price string according to the current language.
	 * @param value Price value.
	 * @param showCurrency Whether to show currency symbol.
	 */
	function renderPrice(value: number, showCurrency = true) {
		let price = value.toFixed(2);
		if (lang === 'ru' || lang === 'ka') {
			price = price.replace('.', ',');
		}
		return showCurrency ? i18n(lang, 'price', [price]) : price;
	}

	function onLangChange(lang: string) {
		if (!isValidLang(lang)) {
			return;
		}

		setLang(lang);
	}

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
		setFormData([
			getNewItem(),
		]);
	}

	return (
		<main className="App">
			<h1 className="App__heading">
				<img src="/logo.svg" alt="" width="96" height="96" loading="lazy" />
				<div>
					{i18n(lang, 'title')}
					<small className="App__heading-subtitle" lang={subtitleLang}>
						{i18n(subtitleLang, 'title')}
					</small>
				</div>
				{fee !== 0 && (
					<em className="App__heading-percentage">+{(fee * 100).toFixed(0)}%</em>
				)}
			</h1>
			<p className="App__intro">
				{i18n(lang, 'intro')}
				{' '}
				<a href={REPORT_FORM_URL} target="_blank">{i18n(lang, 'reportLink')}</a>
			</p>
			<nav id="langs" className="App__langs" aria-labelledby="langs-label">
				<h2 id="langs-label" className="sr-only">{i18n(lang, 'languages')}</h2>
				<LangSelector lang={lang} onChange={onLangChange} />
			</nav>
			<SearchInput lang={lang} onSubmit={onSearchSubmit} />
			<h2 className="sr-only">Menu items</h2>
			{formData.map((item, index) => (
				<ItemInput
					key={`formdata-${item.id}`}
					lang={lang}
					fee={fee}
					item={item}
					showRemoveButton={formData.length > 1}
					autoFocus={autoFocus && index === formData.length - 1}
					onChange={onItemInputChange}
					onRemove={onItemInputRemove}
					renderPrice={renderPrice}
				/>
			))}
			<AddItemButton lang={lang} onClick={onAddItemClick} />
			<FormFooter
				lang={lang}
				fee={fee}
				data={formData}
				onClearData={onClearData}
				renderPrice={renderPrice}
			/>
			<div>
				<a href={REPORT_FORM_URL} target="_blank">{i18n(lang, 'reportLink')}</a>
			</div>
		</main>
	);
}

export default App;
