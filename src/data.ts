export type RestaurantInfo = {
	en: string;
	ka: string;
	ru: string;
	aliases: string[];
	fee: number | 'vat';
};

export const VAT_VALUE = 0.18;

const data: RestaurantInfo[] = [
	{
		en: 'VAT',
		ka: 'დღგ',
		ru: 'НДС',
		aliases: [
			'value added tax',
			'დამატებული ღირებულების გადასახადი',
			'налог на добавленную стоимость', // not from above
		],
		fee: 'vat',
	},
	{
		en: 'Ankara Style',
		ka: 'ანკარა სთაილი',
		ru: 'Анкара-Стайл',
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
		en: 'Cafe Daphna',
		ka: 'კაფე დაფნა',
		ru: 'Кафе Дафна',
		aliases: [],
		fee: 'vat',
	},
	{
		en: 'Dublin',
		ka: 'დუბლინი',
		ru: 'Дублин',
		aliases: [],
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
		fee: 0.14,
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
		ru: 'Мачахела-Самикитно',
		aliases: [
			'Мачахэла',
			// Not from any words above
		],
		fee: 0.15,
	},
	{
		en: 'Pasanauri',
		ka: 'ფასანაური',
		ru: 'Пасанаури',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Sabatono',
		ka: '',
		ru: 'Сабатоно',
		aliases: [],
		fee: 0.1,
	},
	{
		en: 'Sofia Melnikova\'s Fantastic Douqan',
		ka: 'სოფია მელნიკოვას ფანტასტიური დუქანი',
		ru: 'Фантастический дукан Софии Мельниковой',
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
		en: 'Tiflisi Vorontsovze',
		ka: 'ტიფლისი ვორონცოვზე',
		ru: 'Тифлиси-Воронцовзе',
		aliases: [],
		fee: 0.15,
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
