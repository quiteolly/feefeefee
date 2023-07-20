import './LangSelector.css';

import { I18nValidLang, LANGS } from '../../i18n';

type LangSelectorProps = {
	/**
	 * Current interface language.
	 */
	lang: I18nValidLang;
	/**
	 * Callback for the language change events.
	 * @param lang New language code.
	 */
	onChange: (lang: string) => void;
};

export default function LangSelector({
	lang,
	onChange,
}: LangSelectorProps) {
	return (
		<ul className="lang-selector">
			{LANGS.map((l) => (
				<li
					key={l.code}
					className={`lang-selector__item${lang === l.code ? ' lang-selector__item--selected' : ''}`}
				>
					<button	lang={l.code} type="button" onClick={() => onChange(l.code)}>{l.name}</button>
				</li>
			))}
		</ul>
	)
}