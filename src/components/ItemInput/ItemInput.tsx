import { useState } from 'react';
import './ItemInput.css';

import { FormItem } from '../../App';

type ItemInputProps = {
	fee: number;
	item: FormItem;
	showRemoveButton: boolean;
	autoFocus: boolean;
	onChange: (data: FormItem) => void;
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