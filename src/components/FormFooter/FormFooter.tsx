import './FormFooter.css';

import { I18nValidLang, i18n } from '../../i18n';
import { FormItem } from '../../App';

type FormFooterProps = {
	/**
	 * Current interface language.
	 */
	lang: I18nValidLang;
	/**
	 * Current service fee.
	 */
	fee: number;
	/**
	 * Current form data.
	 */
	data: FormItem[];
	/**
	 * Callback for the Clear data button.
	 */
	onClearData: () => void;
	/**
	 * Render a price correctly, see App.tsx.
	 */
	renderPrice: (value: number, showCurrency?: boolean) => string,
}

export default function FormFooter({
	lang,
	fee,
	data,
	onClearData,
	renderPrice,
}: FormFooterProps) {
	let result = 0;
	let actualResult = 0;
	data.forEach(item => {
		const value = Number(item.value).toFixed(2);
		
		result = result + Number(value);
		actualResult = actualResult + Number(value) + Number(value) * fee;
	});

	const equalPrice = result === actualResult;

	function renderReadablePrice(price: number, showCurrency = true) {
		return renderPrice(price, showCurrency).replace(/[.,]?0+$/, '');
	}

	function onClearButtonClick() {
		const dialog = confirm(i18n(lang, 'formFooterClearDialog'));
		if (dialog) {
			onClearData();
		}
	}

	return (
		<div className="form-footer">
			<div>
				<h2 className="form-footer__heading">{i18n(lang, 'formFooterSum')}</h2>
				<div className="form-footer__price">
					{renderReadablePrice(result, lang === 'en' || equalPrice)}
					{!equalPrice && '/'}
					{!equalPrice && <strong>{renderReadablePrice(actualResult)}</strong>}
				</div>
			</div>
			<div>
				<button type="button" onClick={onClearButtonClick}>
					{i18n(lang, 'formFooterClearButton')}
				</button>
			</div>
		</div>
	);
}