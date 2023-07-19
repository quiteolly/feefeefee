import { useState } from 'react';
import './ItemInput.css';

import { FormItem } from '../../App';

type ItemInputProps = {
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
}

export default function ItemInput({
	fee,
	item,
	showRemoveButton,
	autoFocus,
	onChange,
	onRemove,
}: ItemInputProps) {
	let value = Number(item.value);
	if (isNaN(value)) {
		value = 0;
	}

	const realPrice = (value + value * fee).toFixed(2).replace(/\.?0+$/, '');
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
				<label htmlFor={`price-${data.id}`}>Price in the menu:</label>
				<input type="text"
					id={`price-${data.id}`}
					value={data.value}
					onChange={(e) => handleChange(e.currentTarget.value)}
					autoFocus={autoFocus}
				/>
			</div>
			<div className="item-input__price">
				<div>Real price:</div>
				<div className={`item-input__real-price ${!isEqual && 'item-input__real-price--unequal'}`}>{realPrice}&nbsp;₾</div>
				{showRemoveButton && <div>
					<button type="button" onClick={() => onRemove(data)}>Remove</button>
				</div>}
			</div>
		</div>
	);
}