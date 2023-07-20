import './AddItemButton.css';
import { I18nValidLang, i18n } from '../../i18n';

type AddItemButtonProps = {
	/**
	 * Current interface language.
	 */
	lang: I18nValidLang;
	/**
	 * Callback for the Add item button.
	 */
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AddItemButton({
	lang,
	onClick
}: AddItemButtonProps) {
	return (
		<button className="add-item-button" type="button" onClick={onClick}>
			{i18n(lang, 'addItemButton')}
		</button>
	);
}