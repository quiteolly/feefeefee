import './ItemInput.css';
import { useState } from 'react';

import { I18nValidLang, i18n } from '../../i18n';
import { FormItem } from '../../App';

type ItemInputProps = {
	/**
	 * Current interface language.
	 */
	lang: I18nValidLang;
	/**
	 * Current service fee.
	 */
	fee: number;
	/**
	 * Form item data.
	 */
	item: FormItem;
	/**
	 * Whether to show the Remove button.
	 */
	showRemoveButton: boolean;
	/**
	 * Whether to focus on the current form item.
	 */
	autoFocus: boolean;
	/**
	 * Callback for changes in the current form item.
	 * @param data Current form item data.
	 */
	onChange: (data: FormItem) => void;
	/**
	 * Callback for the form item removal event.
	 * @param data Current form item data.
	 */
	onRemove: (data: FormItem) => void;
	/**
	 * Render a price correctly, see App.tsx.
	 */
	renderPrice: (value: number, showCurrency?: boolean) => string,
}

export default function ItemInput({
	lang,
	fee,
	item,
	showRemoveButton,
	autoFocus,
	onChange,
	onRemove,
	renderPrice,
}: ItemInputProps) {
	let value = Number(item.value);
	if (isNaN(value)) {
		value = 0;
	}

	const isEqual = fee === 0;
	const [data, setData] = useState<FormItem>({
		id: item.id,
		value: item.value,
	});

	/**
	 * @param value Price in the menu.
	 */
	function handleChange(value: string) {
		const result = {
			...data,
			value: value,
		}

		setData(result);
		onChange(result);
	}

	return (
		<div className="item-input">
			<div className="item-input__field">
				<label htmlFor={`price-${data.id}`} className="item-input__label">
					{i18n(lang, 'itemInputLabel')}
				</label>
				<input
					type="text"
					id={`price-${data.id}`}
					className="item-input__input"
					value={data.value}
					onChange={(e) => handleChange(e.currentTarget.value)}
					autoFocus={autoFocus}
				/>
			</div>
			<div className="item-input__price">
				<p>{i18n(lang, 'itemInputPrice')}</p>
				<p className={`item-input__real-price ${!isEqual && 'item-input__real-price--unequal'}`}>{renderPrice(value + value * fee)}</p>
				{showRemoveButton && <div>
					<button type="button" onClick={() => onRemove(data)}>
						{i18n(lang, 'itemInputRemove')}
					</button>
				</div>}
			</div>
		</div>
	);
}