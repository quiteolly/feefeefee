/**
 * Georgian restaurant info.
 */
export type RestaurantInfo = {
	/**
	 * English name.
	 */
	en: string;
	/**
	 * Georgian name.
	 */
	ka: string;
	/**
	 * Russian name.
	 */
	ru: string;
	/**
	 * Aliases that do not match any symbols in English, Georgian, or Russian names.
	 */
	aliases: string[];
	/**
	 * Service fee (a number from 0 to 1 or 'vat').
	 */
	fee: number | 'vat';
};

/**
 * Current VAT amount in Georgia.
 */
export const VAT_VALUE = 0.18;

/**
 * If your restaurant is not in this list, we’re good.
 */
const data: RestaurantInfo[] = [
	{
		en: 'VAT',
		ka: 'დღგ',
		ru: 'НДС',
		aliases: [
			'value added tax',
			'დამატებული ღირებულების გადასახადი',
			'налог на добавленную стоимость',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Ankara Style',
		ka: 'ანკარა სთაილი',
		ru: 'Анкара-стайл',
		aliases: [],
		fee: 0.15,
	},
	{
		en: 'Bernard',
		ka: 'ბერნარდი',
		ru: 'Бернард',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Brotplatz',
		ka: 'ბროტპლატცი',
		ru: 'Бротплатц',
		aliases: [
			'Бротплац',
			// Not from any words above
		],
		fee: 0.1,
	},
	{
		en: 'Cafe Daphna',
		ka: 'კაფე დაფნა',
		ru: 'Кафе Дафна',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Cafe Stamba',
		ka: 'კაფე სტამბა',
		ru: 'Кафе Стамба',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Chashnagiri',
		ka: 'ჭაშნაგირი',
		ru: 'Чашнагири',
		aliases: [],
		fee: 0.15,
	},
	{
		en: 'Cloud9',
		ka: '',
		ru: 'Клауд9',
		aliases: [],
		fee: 0.18,
	},
	{
		en: 'Dublin',
		ka: 'დუბლინი',
		ru: 'Дублин',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Ethnographer',
		ka: 'ეთნოგრაფი',
		ru: 'Этнографи',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Hello Breakfast',
		ka: '',
		ru: 'Хеллоу-брэкфаст',
		aliases: [
			'Хэлоу-брекфаст',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Fabrika',
		ka: 'ფაბრიკა',
		ru: 'Фабрика',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Good Choice',
		ka: 'გუდ ჩოის',
		ru: 'Гуд-чойс',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Khinkali House',
		ka: 'ხინკლის სახლი',
		ru: 'Хинкали-хаус',
		aliases: [
			'Khinkalis Sakhli',
			// Not from any words above
		],
		fee: 0.15,
	},
	{
		en: 'La Burrata',
		ka: 'ლა ბურრატა',
		ru: 'Ла-Буррата',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Machakhela Samikitno',
		ka: 'მაჭახელა სამიკიტნო',
		ru: 'Мачахэла-Самикитно',
		aliases: [
			'Мачахела',
			// Not from any words above
		],
		fee: 0.15,
	},
	{
		en: 'Maspindzelo',
		ka: 'მასპინძელო',
		ru: 'Маспиндзэло',
		aliases: [
			'Маспиндзэло',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Organique Josper Bar',
		ka: 'ორგანიკ ხოსპერ ბარი',
		ru: 'Органик-хоспер-бар',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'N1 Steakhouse',
		ka: 'სტეიკჰაუსი#1',
		ru: 'Стэйкхаус №1',
		aliases: [
			'Стейкхаус №1',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Pasanauri',
		ka: 'ფასანაური',
		ru: 'Пасанаури',
		aliases: [],
		fee: 0.1,
	},
	{
		en: "Pirosmani's Dukani",
		ka: 'ფიროსმანის დუქანი',
		ru: 'Дукан Пиросмани',
		aliases: [
			"Pirosmani's Douqan",
			"Pirosmani's Doukan",
			// Not from any words above
		],
		fee: 0.1,
	},
	{
		en: 'Sabatono',
		ka: 'საბატონო',
		ru: 'Сабатоно',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Shatre',
		ka: 'შატრე',
		ru: 'Шатре',
		aliases: [],
		fee: 0.15,
	},
	{
		en: 'Sormoni',
		ka: 'სორმონი',
		ru: 'Сормони',
		aliases: [],
		fee: 0.12,
	},
	{
		en: "Sofia Melnikova's Fantastic Douqan",
		ka: 'სოფია მელნიკოვას ფანტასტიური დუქანი',
		ru: 'Фантастический дукан Софии Мельниковой',
		aliases: [
			'Fantastic Doukan',
			'Fantastic Dukan',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Stella Artois',
		ka: 'სტელა არტუა',
		ru: 'Стелла Артуа',
		aliases: [
			'Артоис',
			'Артойс',
			// Not from any words above
		],
		fee: 'vat',
	},
	{
		en: 'Tiflisi Vorontsovze',
		ka: 'ტიფლისი ვორონცოვზე',
		ru: 'Тифлиси-Воронцовзе',
		aliases: [],
		fee: 0.15,
	},
	{
		en: 'Umami',
		ka: 'უმამი',
		ru: 'Умами',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Veliaminov',
		ka: 'ველიამინოვი',
		ru: 'Вельяминов',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Zodiaqo',
		ka: 'ზოდიაქო',
		ru: 'Зодиако',
		aliases: [],
		fee: 0.1,
	},
	// {
	// 	en: '',
	// 	ka: '',
	// 	ru: '',
	// 	aliases: [],
	// 	fee: 0,
	// },
];

export default data;
