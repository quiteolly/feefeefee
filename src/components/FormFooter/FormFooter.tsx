import { FormItem } from "../../App";
import './FormFooter.css';

type FormFooterProps = {
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
}

export default function FormFooter({
	fee,
	data,
	onClearData,
}: FormFooterProps) {
	let result = 0;
	let actualResult = 0;
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		const value = Number(element.value).toFixed(2);
		
		result = result + Number(value);
		actualResult = actualResult + Number(value) + Number(value) * fee;
	}

	const equalPrice = result === actualResult;

	return (
		<div className="form-footer">
			<div>
				<div>Sum:</div>
				<div className="form-footer__price">
					{result.toFixed(2)}{equalPrice && <span>&nbsp;₾</span>}
					{!equalPrice && '/'}
					{!equalPrice && <strong>{actualResult.toFixed(2)}&nbsp;₾</strong>}
				</div>
			</div>
			<div><button type="button" onClick={onClearData}>Clear data</button></div>
		</div>
	);
}