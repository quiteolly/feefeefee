type I18nDataItem = {
	/**
	 * English translation.
	 */
	en: string;
	/**
	 * Georgian translation.
	 */
	ka: string;
	/**
	 * Russian translation.
	 */
	ru: string;
};

type I18nData = {
	[key: string]: I18nDataItem;
};

type I18nLanguage = {
	/**
	 * ISO language code.
	 */
	code: string;
	/**
	 * Language name in the language itself.
	 */
	name: string;
};

export type I18nValidLang = 'en' | 'ka' | 'ru';

export const LANGS: I18nLanguage[] = [
	{
		code: 'en',
		name: 'English',
	},
	{
		code: 'ka',
		name: 'ქართული',
	},
	{
		code: 'ru',
		name: 'Русский',
	},
];

/**
 * Language data to be used in i18n().
 */
const data: I18nData = {
	title: {
		en: 'feefeefee',
		ka: 'ფიფიფი',
		ru: 'фифифи',
	},
	price: {
		en: '₾$1',
		ka: '$1 ₾',
		ru: '$1 ₾',
	},
	intro: {
		en: 'Calculate real prices in Georgian restaurants, with service fees included. Sometimes bills can be slightly different.',
		ka: '',
		ru: 'Считайте реальные цены (с обслуживанием) в грузинских ресторанах. Иногда счёт может немного отличаться.',
	},
	languages: {
		en: 'Languages',
		ka: 'ენები',
		ru: 'Языки',
	},
	reportLink: {
		en: 'Add a place / Report an error',
		ka: '',
		ru: 'Добавить место / Написать об ошибке',
	},

	addItemButton: {
		en: 'Add item',
		ka: 'დამატება',
		ru: 'Добавить ещё',
	},

	formFooterClearButton: {
		en: 'Clear data',
		ka: 'გასუფთავება',
		ru: 'Очистить форму',
	},
	formFooterClearDialog: {
		en: 'You are about to clear all the form data. Continue?',
		ka: '',
		ru: 'Вы очистите все данные формы. Продолжить?',
	},
	formFooterSum: {
		en: 'Sum:',
		ka: 'თანხა:',
		ru: 'Сумма:',
	},

	itemInputLabel: {
		en: 'Price in the menu',
		ka: 'ფასი მენიუში',
		ru: 'Цена в меню',
	},
	itemInputPrice: {
		en: 'Real price:',
		ka: 'რეალური ფასი:',
		ru: 'Настоящая цена:',
	},
	itemInputRemove: {
		en: 'Remove',
		ka: 'წაშლა',
		ru: 'Удалить',
	},

	searchInputButton: {
		en: 'Search',
		ka: 'ძიება',
		ru: 'Искать',
	},
	searchInputInvalid: {
		en: 'What you entered ($1) is not a number or a valid cafe.',
		ka: '',
		ru: 'Введённое вами ($1) не является числом или известным нам кафе.',
	},
	searchInputLabel: {
		en: 'Enter a place or percentage',
		ka: '',
		ru: 'Введите место или процент',
	},
	searchInputListboxHint: {
		en: 'When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.',
		ka: '',
		ru: 'Когда доступны результаты поиска, используйте стрелки вверх/вниз для навигации по ним и клавишу ввода для выбора. Пользователи тач-устройств могут навигировать жестами касаний или свайпа.',
	},
	searchInputListboxResults: {
		en: '$1 results are available. $2',
		ka: '',
		ru: 'Доступно $1 результат(а/ов). $2',
	},
	searchInputListboxSelected: {
		en: '$1 ($3) of $2 is highlighted.',
		ka: '',
		ru: '$1 ($3) из $2 подсвечена.',
	},
	searchVat: {
		en: 'VAT/$1',
		ka: 'დღგ/$1',
		ru: 'НДС/$1',
	},
};

/**
 * Check if a language is valid.
 * @param lang Language code.
 */
export function isValidLang(lang: string): lang is I18nValidLang {
	if (lang === 'en' || lang === 'ka' || lang === 'ru') {
		return true;
	}

	return false;
}

/**
 * Render a message in a language (or English) by its key.
 * @param lang Language code.
 * @param key Message key.
 * @param attrs Replacements in the message ($1, $2, $3).
 * @returns Localised message.
 */
export function i18n(lang: string, key: string, attrs?: unknown[]) {
	const invalidMsg = `(${key})`;
	if (!isValidLang(lang)) {
		return invalidMsg;
	}
	let result = data?.[key]?.[lang] || data?.[key]?.en;
	if (!result) {
		return invalidMsg;
	}

	if (attrs && attrs.length > 0) {
		attrs.forEach((attr, index) => {
			const rx = new RegExp('\\$' + (index + 1), 'g');
			result = result.replace(rx, attr as string);
		});
	}

	return result;
}
