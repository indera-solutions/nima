import { LoomText } from '@loom/core-shared';

export interface IState {
	name: string;
	stateCode: string;
	locale?: LoomText;
}

export const states: { [countryCode: string]: { [stateCode: string]: IState } } = {
	'AF': {},
	'AL': {
		'AL-01': {
			'stateCode': 'AL-01',
			'name': 'Berat',
		},
		'AL-09': {
			'stateCode': 'AL-09',
			'name': 'Dibër',
		},
		'AL-02': {
			'stateCode': 'AL-02',
			'name': 'Durrës',
		},
		'AL-03': {
			'stateCode': 'AL-03',
			'name': 'Elbasan',
		},
		'AL-04': {
			'stateCode': 'AL-04',
			'name': 'Fier',
		},
		'AL-05': {
			'stateCode': 'AL-05',
			'name': 'Gjirokastër',
		},
		'AL-06': {
			'stateCode': 'AL-06',
			'name': 'Korçë',
		},
		'AL-07': {
			'stateCode': 'AL-07',
			'name': 'Kukës',
		},
		'AL-08': {
			'stateCode': 'AL-08',
			'name': 'Lezhë',
		},
		'AL-10': {
			'stateCode': 'AL-10',
			'name': 'Shkodër',
		},
		'AL-11': {
			'stateCode': 'AL-11',
			'name': 'Tirana',
		},
		'AL-12': {
			'stateCode': 'AL-12',
			'name': 'Vlorë',
		},
	},
	'AO': {
		'BGO': {
			'stateCode': 'BGO',
			'name': 'Bengo',
		},
		'BLU': {
			'stateCode': 'BLU',
			'name': 'Benguela',
		},
		'BIE': {
			'stateCode': 'BIE',
			'name': 'Bié',
		},
		'CAB': {
			'stateCode': 'CAB',
			'name': 'Cabinda',
		},
		'CNN': {
			'stateCode': 'CNN',
			'name': 'Cunene',
		},
		'HUA': {
			'stateCode': 'HUA',
			'name': 'Huambo',
		},
		'HUI': {
			'stateCode': 'HUI',
			'name': 'Huíla',
		},
		'CCU': {
			'stateCode': 'CCU',
			'name': 'Kuando Kubango',
		},
		'CNO': {
			'stateCode': 'CNO',
			'name': 'Kwanza-Norte',
		},
		'CUS': {
			'stateCode': 'CUS',
			'name': 'Kwanza-Sul',
		},
		'LUA': {
			'stateCode': 'LUA',
			'name': 'Luanda',
		},
		'LNO': {
			'stateCode': 'LNO',
			'name': 'Lunda-Norte',
		},
		'LSU': {
			'stateCode': 'LSU',
			'name': 'Lunda-Sul',
		},
		'MAL': {
			'stateCode': 'MAL',
			'name': 'Malanje',
		},
		'MOX': {
			'stateCode': 'MOX',
			'name': 'Moxico',
		},
		'NAM': {
			'stateCode': 'NAM',
			'name': 'Namibe',
		},
		'UIG': {
			'stateCode': 'UIG',
			'name': 'Uíge',
		},
		'ZAI': {
			'stateCode': 'ZAI',
			'name': 'Zaire',
		},
	},
	'AR': {
		'C': {
			'stateCode': 'C',
			'name': 'Ciudad Autónoma de Buenos Aires',
		},
		'B': {
			'stateCode': 'B',
			'name': 'Buenos Aires',
		},
		'K': {
			'stateCode': 'K',
			'name': 'Catamarca',
		},
		'H': {
			'stateCode': 'H',
			'name': 'Chaco',
		},
		'U': {
			'stateCode': 'U',
			'name': 'Chubut',
		},
		'X': {
			'stateCode': 'X',
			'name': 'Córdoba',
		},
		'W': {
			'stateCode': 'W',
			'name': 'Corrientes',
		},
		'E': {
			'stateCode': 'E',
			'name': 'Entre Ríos',
		},
		'P': {
			'stateCode': 'P',
			'name': 'Formosa',
		},
		'Y': {
			'stateCode': 'Y',
			'name': 'Jujuy',
		},
		'L': {
			'stateCode': 'L',
			'name': 'La Pampa',
		},
		'F': {
			'stateCode': 'F',
			'name': 'La Rioja',
		},
		'M': {
			'stateCode': 'M',
			'name': 'Mendoza',
		},
		'N': {
			'stateCode': 'N',
			'name': 'Misiones',
		},
		'Q': {
			'stateCode': 'Q',
			'name': 'Neuquén',
		},
		'R': {
			'stateCode': 'R',
			'name': 'Río Negro',
		},
		'A': {
			'stateCode': 'A',
			'name': 'Salta',
		},
		'J': {
			'stateCode': 'J',
			'name': 'San Juan',
		},
		'D': {
			'stateCode': 'D',
			'name': 'San Luis',
		},
		'Z': {
			'stateCode': 'Z',
			'name': 'Santa Cruz',
		},
		'S': {
			'stateCode': 'S',
			'name': 'Santa Fe',
		},
		'G': {
			'stateCode': 'G',
			'name': 'Santiago del Estero',
		},
		'V': {
			'stateCode': 'V',
			'name': 'Tierra del Fuego',
		},
		'T': {
			'stateCode': 'T',
			'name': 'Tucumán',
		},
	},
	'AT': {},
	'AU': {
		'ACT': {
			'stateCode': 'ACT',
			'name': 'Australian Capital Territory',
		},
		'NSW': {
			'stateCode': 'NSW',
			'name': 'New South Wales',
		},
		'NT': {
			'stateCode': 'NT',
			'name': 'Northern Territory',
		},
		'QLD': {
			'stateCode': 'QLD',
			'name': 'Queensland',
		},
		'SA': {
			'stateCode': 'SA',
			'name': 'South Australia',
		},
		'TAS': {
			'stateCode': 'TAS',
			'name': 'Tasmania',
		},
		'VIC': {
			'stateCode': 'VIC',
			'name': 'Victoria',
		},
		'WA': {
			'stateCode': 'WA',
			'name': 'Western Australia',
		},
	},
	'AX': {},
	'BD': {
		'BD-05': {
			'stateCode': 'BD-05',
			'name': 'Bagerhat',
		},
		'BD-01': {
			'stateCode': 'BD-01',
			'name': 'Bandarban',
		},
		'BD-02': {
			'stateCode': 'BD-02',
			'name': 'Barguna',
		},
		'BD-06': {
			'stateCode': 'BD-06',
			'name': 'Barishal',
		},
		'BD-07': {
			'stateCode': 'BD-07',
			'name': 'Bhola',
		},
		'BD-03': {
			'stateCode': 'BD-03',
			'name': 'Bogura',
		},
		'BD-04': {
			'stateCode': 'BD-04',
			'name': 'Brahmanbaria',
		},
		'BD-09': {
			'stateCode': 'BD-09',
			'name': 'Chandpur',
		},
		'BD-10': {
			'stateCode': 'BD-10',
			'name': 'Chattogram',
		},
		'BD-12': {
			'stateCode': 'BD-12',
			'name': 'Chuadanga',
		},
		'BD-11': {
			'stateCode': 'BD-11',
			'name': 'Cox\'s Bazar',
		},
		'BD-08': {
			'stateCode': 'BD-08',
			'name': 'Cumilla',
		},
		'BD-13': {
			'stateCode': 'BD-13',
			'name': 'Dhaka',
		},
		'BD-14': {
			'stateCode': 'BD-14',
			'name': 'Dinajpur',
		},
		'BD-15': {
			'stateCode': 'BD-15',
			'name': 'Faridpur ',
		},
		'BD-16': {
			'stateCode': 'BD-16',
			'name': 'Feni',
		},
		'BD-19': {
			'stateCode': 'BD-19',
			'name': 'Gaibandha',
		},
		'BD-18': {
			'stateCode': 'BD-18',
			'name': 'Gazipur',
		},
		'BD-17': {
			'stateCode': 'BD-17',
			'name': 'Gopalganj',
		},
		'BD-20': {
			'stateCode': 'BD-20',
			'name': 'Habiganj',
		},
		'BD-21': {
			'stateCode': 'BD-21',
			'name': 'Jamalpur',
		},
		'BD-22': {
			'stateCode': 'BD-22',
			'name': 'Jashore',
		},
		'BD-25': {
			'stateCode': 'BD-25',
			'name': 'Jhalokati',
		},
		'BD-23': {
			'stateCode': 'BD-23',
			'name': 'Jhenaidah',
		},
		'BD-24': {
			'stateCode': 'BD-24',
			'name': 'Joypurhat',
		},
		'BD-29': {
			'stateCode': 'BD-29',
			'name': 'Khagrachhari',
		},
		'BD-27': {
			'stateCode': 'BD-27',
			'name': 'Khulna',
		},
		'BD-26': {
			'stateCode': 'BD-26',
			'name': 'Kishoreganj',
		},
		'BD-28': {
			'stateCode': 'BD-28',
			'name': 'Kurigram',
		},
		'BD-30': {
			'stateCode': 'BD-30',
			'name': 'Kushtia',
		},
		'BD-31': {
			'stateCode': 'BD-31',
			'name': 'Lakshmipur',
		},
		'BD-32': {
			'stateCode': 'BD-32',
			'name': 'Lalmonirhat',
		},
		'BD-36': {
			'stateCode': 'BD-36',
			'name': 'Madaripur',
		},
		'BD-37': {
			'stateCode': 'BD-37',
			'name': 'Magura',
		},
		'BD-33': {
			'stateCode': 'BD-33',
			'name': 'Manikganj ',
		},
		'BD-39': {
			'stateCode': 'BD-39',
			'name': 'Meherpur',
		},
		'BD-38': {
			'stateCode': 'BD-38',
			'name': 'Moulvibazar',
		},
		'BD-35': {
			'stateCode': 'BD-35',
			'name': 'Munshiganj',
		},
		'BD-34': {
			'stateCode': 'BD-34',
			'name': 'Mymensingh',
		},
		'BD-48': {
			'stateCode': 'BD-48',
			'name': 'Naogaon',
		},
		'BD-43': {
			'stateCode': 'BD-43',
			'name': 'Narail',
		},
		'BD-40': {
			'stateCode': 'BD-40',
			'name': 'Narayanganj',
		},
		'BD-42': {
			'stateCode': 'BD-42',
			'name': 'Narsingdi',
		},
		'BD-44': {
			'stateCode': 'BD-44',
			'name': 'Natore',
		},
		'BD-45': {
			'stateCode': 'BD-45',
			'name': 'Nawabganj',
		},
		'BD-41': {
			'stateCode': 'BD-41',
			'name': 'Netrakona',
		},
		'BD-46': {
			'stateCode': 'BD-46',
			'name': 'Nilphamari',
		},
		'BD-47': {
			'stateCode': 'BD-47',
			'name': 'Noakhali',
		},
		'BD-49': {
			'stateCode': 'BD-49',
			'name': 'Pabna',
		},
		'BD-52': {
			'stateCode': 'BD-52',
			'name': 'Panchagarh',
		},
		'BD-51': {
			'stateCode': 'BD-51',
			'name': 'Patuakhali',
		},
		'BD-50': {
			'stateCode': 'BD-50',
			'name': 'Pirojpur',
		},
		'BD-53': {
			'stateCode': 'BD-53',
			'name': 'Rajbari',
		},
		'BD-54': {
			'stateCode': 'BD-54',
			'name': 'Rajshahi',
		},
		'BD-56': {
			'stateCode': 'BD-56',
			'name': 'Rangamati',
		},
		'BD-55': {
			'stateCode': 'BD-55',
			'name': 'Rangpur',
		},
		'BD-58': {
			'stateCode': 'BD-58',
			'name': 'Satkhira',
		},
		'BD-62': {
			'stateCode': 'BD-62',
			'name': 'Shariatpur',
		},
		'BD-57': {
			'stateCode': 'BD-57',
			'name': 'Sherpur',
		},
		'BD-59': {
			'stateCode': 'BD-59',
			'name': 'Sirajganj',
		},
		'BD-61': {
			'stateCode': 'BD-61',
			'name': 'Sunamganj',
		},
		'BD-60': {
			'stateCode': 'BD-60',
			'name': 'Sylhet',
		},
		'BD-63': {
			'stateCode': 'BD-63',
			'name': 'Tangail',
		},
		'BD-64': {
			'stateCode': 'BD-64',
			'name': 'Thakurgaon',
		},
	},
	'BE': {},
	'BG': {
		'BG-01': {
			'stateCode': 'BG-01',
			'name': 'Blagoevgrad',
		},
		'BG-02': {
			'stateCode': 'BG-02',
			'name': 'Burgas',
		},
		'BG-08': {
			'stateCode': 'BG-08',
			'name': 'Dobrich',
		},
		'BG-07': {
			'stateCode': 'BG-07',
			'name': 'Gabrovo',
		},
		'BG-26': {
			'stateCode': 'BG-26',
			'name': 'Haskovo',
		},
		'BG-09': {
			'stateCode': 'BG-09',
			'name': 'Kardzhali',
		},
		'BG-10': {
			'stateCode': 'BG-10',
			'name': 'Kyustendil',
		},
		'BG-11': {
			'stateCode': 'BG-11',
			'name': 'Lovech',
		},
		'BG-12': {
			'stateCode': 'BG-12',
			'name': 'Montana',
		},
		'BG-13': {
			'stateCode': 'BG-13',
			'name': 'Pazardzhik',
		},
		'BG-14': {
			'stateCode': 'BG-14',
			'name': 'Pernik',
		},
		'BG-15': {
			'stateCode': 'BG-15',
			'name': 'Pleven',
		},
		'BG-16': {
			'stateCode': 'BG-16',
			'name': 'Plovdiv',
		},
		'BG-17': {
			'stateCode': 'BG-17',
			'name': 'Razgrad',
		},
		'BG-18': {
			'stateCode': 'BG-18',
			'name': 'Ruse',
		},
		'BG-27': {
			'stateCode': 'BG-27',
			'name': 'Shumen',
		},
		'BG-19': {
			'stateCode': 'BG-19',
			'name': 'Silistra',
		},
		'BG-20': {
			'stateCode': 'BG-20',
			'name': 'Sliven',
		},
		'BG-21': {
			'stateCode': 'BG-21',
			'name': 'Smolyan',
		},
		'BG-23': {
			'stateCode': 'BG-23',
			'name': 'Sofia',
		},
		'BG-22': {
			'stateCode': 'BG-22',
			'name': 'Sofia-Grad',
		},
		'BG-24': {
			'stateCode': 'BG-24',
			'name': 'Stara Zagora',
		},
		'BG-25': {
			'stateCode': 'BG-25',
			'name': 'Targovishte',
		},
		'BG-03': {
			'stateCode': 'BG-03',
			'name': 'Varna',
		},
		'BG-04': {
			'stateCode': 'BG-04',
			'name': 'Veliko Tarnovo',
		},
		'BG-05': {
			'stateCode': 'BG-05',
			'name': 'Vidin',
		},
		'BG-06': {
			'stateCode': 'BG-06',
			'name': 'Vratsa',
		},
		'BG-28': {
			'stateCode': 'BG-28',
			'name': 'Yambol',
		},
	},
	'BH': {},
	'BI': {},
	'BJ': {
		'AL': {
			'stateCode': 'AL',
			'name': 'Alibori',
		},
		'AK': {
			'stateCode': 'AK',
			'name': 'Atakora',
		},
		'AQ': {
			'stateCode': 'AQ',
			'name': 'Atlantique',
		},
		'BO': {
			'stateCode': 'BO',
			'name': 'Borgou',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Collines',
		},
		'KO': {
			'stateCode': 'KO',
			'name': 'Kouffo',
		},
		'DO': {
			'stateCode': 'DO',
			'name': 'Donga',
		},
		'LI': {
			'stateCode': 'LI',
			'name': 'Littoral',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Mono',
		},
		'OU': {
			'stateCode': 'OU',
			'name': 'Ouémé',
		},
		'PL': {
			'stateCode': 'PL',
			'name': 'Plateau',
		},
		'ZO': {
			'stateCode': 'ZO',
			'name': 'Zou',
		},
	},
	'BO': {
		'BO-B': {
			'stateCode': 'BO-B',
			'name': 'Beni',
		},
		'BO-H': {
			'stateCode': 'BO-H',
			'name': 'Chuquisaca',
		},
		'BO-C': {
			'stateCode': 'BO-C',
			'name': 'Cochabamba',
		},
		'BO-L': {
			'stateCode': 'BO-L',
			'name': 'La Paz',
		},
		'BO-O': {
			'stateCode': 'BO-O',
			'name': 'Oruro',
		},
		'BO-N': {
			'stateCode': 'BO-N',
			'name': 'Pando',
		},
		'BO-P': {
			'stateCode': 'BO-P',
			'name': 'Potosí',
		},
		'BO-S': {
			'stateCode': 'BO-S',
			'name': 'Santa Cruz',
		},
		'BO-T': {
			'stateCode': 'BO-T',
			'name': 'Tarija',
		},
	},
	'BR': {
		'AC': {
			'stateCode': 'AC',
			'name': 'Acre',
		},
		'AL': {
			'stateCode': 'AL',
			'name': 'Alagoas',
		},
		'AP': {
			'stateCode': 'AP',
			'name': 'Amapá',
		},
		'AM': {
			'stateCode': 'AM',
			'name': 'Amazonas',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Bahia',
		},
		'CE': {
			'stateCode': 'CE',
			'name': 'Ceará',
		},
		'DF': {
			'stateCode': 'DF',
			'name': 'Distrito Federal',
		},
		'ES': {
			'stateCode': 'ES',
			'name': 'Espírito Santo',
		},
		'GO': {
			'stateCode': 'GO',
			'name': 'Goiás',
		},
		'MA': {
			'stateCode': 'MA',
			'name': 'Maranhão',
		},
		'MT': {
			'stateCode': 'MT',
			'name': 'Mato Grosso',
		},
		'MS': {
			'stateCode': 'MS',
			'name': 'Mato Grosso do Sul',
		},
		'MG': {
			'stateCode': 'MG',
			'name': 'Minas Gerais',
		},
		'PA': {
			'stateCode': 'PA',
			'name': 'Pará',
		},
		'PB': {
			'stateCode': 'PB',
			'name': 'Paraíba',
		},
		'PR': {
			'stateCode': 'PR',
			'name': 'Paraná',
		},
		'PE': {
			'stateCode': 'PE',
			'name': 'Pernambuco',
		},
		'PI': {
			'stateCode': 'PI',
			'name': 'Piauí',
		},
		'RJ': {
			'stateCode': 'RJ',
			'name': 'Rio de Janeiro',
		},
		'RN': {
			'stateCode': 'RN',
			'name': 'Rio Grande do Norte',
		},
		'RS': {
			'stateCode': 'RS',
			'name': 'Rio Grande do Sul',
		},
		'RO': {
			'stateCode': 'RO',
			'name': 'Rondônia',
		},
		'RR': {
			'stateCode': 'RR',
			'name': 'Roraima',
		},
		'SC': {
			'stateCode': 'SC',
			'name': 'Santa Catarina',
		},
		'SP': {
			'stateCode': 'SP',
			'name': 'São Paulo',
		},
		'SE': {
			'stateCode': 'SE',
			'name': 'Sergipe',
		},
		'TO': {
			'stateCode': 'TO',
			'name': 'Tocantins',
		},
	},
	'CA': {
		'AB': {
			'stateCode': 'AB',
			'name': 'Alberta',
		},
		'BC': {
			'stateCode': 'BC',
			'name': 'British Columbia',
		},
		'MB': {
			'stateCode': 'MB',
			'name': 'Manitoba',
		},
		'NB': {
			'stateCode': 'NB',
			'name': 'New Brunswick',
		},
		'NL': {
			'stateCode': 'NL',
			'name': 'Newfoundland and Labrador',
		},
		'NT': {
			'stateCode': 'NT',
			'name': 'Northwest Territories',
		},
		'NS': {
			'stateCode': 'NS',
			'name': 'Nova Scotia',
		},
		'NU': {
			'stateCode': 'NU',
			'name': 'Nunavut',
		},
		'ON': {
			'stateCode': 'ON',
			'name': 'Ontario',
		},
		'PE': {
			'stateCode': 'PE',
			'name': 'Prince Edward Island',
		},
		'QC': {
			'stateCode': 'QC',
			'name': 'Quebec',
		},
		'SK': {
			'stateCode': 'SK',
			'name': 'Saskatchewan',
		},
		'YT': {
			'stateCode': 'YT',
			'name': 'Yukon Territory',
		},
	},
	'CH': {
		'AG': {
			'stateCode': 'AG',
			'name': 'Aargau',
		},
		'AR': {
			'stateCode': 'AR',
			'name': 'Appenzell Ausserrhoden',
		},
		'AI': {
			'stateCode': 'AI',
			'name': 'Appenzell Innerrhoden',
		},
		'BL': {
			'stateCode': 'BL',
			'name': 'Basel-Landschaft',
		},
		'BS': {
			'stateCode': 'BS',
			'name': 'Basel-Stadt',
		},
		'BE': {
			'stateCode': 'BE',
			'name': 'Bern',
		},
		'FR': {
			'stateCode': 'FR',
			'name': 'Fribourg',
		},
		'GE': {
			'stateCode': 'GE',
			'name': 'Geneva',
		},
		'GL': {
			'stateCode': 'GL',
			'name': 'Glarus',
		},
		'GR': {
			'stateCode': 'GR',
			'name': 'Graubünden',
		},
		'JU': {
			'stateCode': 'JU',
			'name': 'Jura',
		},
		'LU': {
			'stateCode': 'LU',
			'name': 'Luzern',
		},
		'NE': {
			'stateCode': 'NE',
			'name': 'Neuchâtel',
		},
		'NW': {
			'stateCode': 'NW',
			'name': 'Nidwalden',
		},
		'OW': {
			'stateCode': 'OW',
			'name': 'Obwalden',
		},
		'SH': {
			'stateCode': 'SH',
			'name': 'Schaffhausen',
		},
		'SZ': {
			'stateCode': 'SZ',
			'name': 'Schwyz',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Solothurn',
		},
		'SG': {
			'stateCode': 'SG',
			'name': 'St. Gallen',
		},
		'TG': {
			'stateCode': 'TG',
			'name': 'Thurgau',
		},
		'TI': {
			'stateCode': 'TI',
			'name': 'Ticino',
		},
		'UR': {
			'stateCode': 'UR',
			'name': 'Uri',
		},
		'VS': {
			'stateCode': 'VS',
			'name': 'Valais',
		},
		'VD': {
			'stateCode': 'VD',
			'name': 'Vaud',
		},
		'ZG': {
			'stateCode': 'ZG',
			'name': 'Zug',
		},
		'ZH': {
			'stateCode': 'ZH',
			'name': 'Zürich',
		},
	},
	'CL': {
		'CL-AI': {
			'stateCode': 'CL-AI',
			'name': 'Aisén del General Carlos Ibañez del Campo',
		},
		'CL-AN': {
			'stateCode': 'CL-AN',
			'name': 'Antofagasta',
		},
		'CL-AP': {
			'stateCode': 'CL-AP',
			'name': 'Arica y Parinacota',
		},
		'CL-AR': {
			'stateCode': 'CL-AR',
			'name': 'La Araucanía',
		},
		'CL-AT': {
			'stateCode': 'CL-AT',
			'name': 'Atacama',
		},
		'CL-BI': {
			'stateCode': 'CL-BI',
			'name': 'Biobío',
		},
		'CL-CO': {
			'stateCode': 'CL-CO',
			'name': 'Coquimbo',
		},
		'CL-LI': {
			'stateCode': 'CL-LI',
			'name': 'Libertador General Bernardo O\'Higgins',
		},
		'CL-LL': {
			'stateCode': 'CL-LL',
			'name': 'Los Lagos',
		},
		'CL-LR': {
			'stateCode': 'CL-LR',
			'name': 'Los Ríos',
		},
		'CL-MA': {
			'stateCode': 'CL-MA',
			'name': 'Magallanes',
		},
		'CL-ML': {
			'stateCode': 'CL-ML',
			'name': 'Maule',
		},
		'CL-NB': {
			'stateCode': 'CL-NB',
			'name': 'Ñuble',
		},
		'CL-RM': {
			'stateCode': 'CL-RM',
			'name': 'Región Metropolitana de Santiago',
		},
		'CL-TA': {
			'stateCode': 'CL-TA',
			'name': 'Tarapacá',
		},
		'CL-VS': {
			'stateCode': 'CL-VS',
			'name': 'Valparaíso',
		},
	},
	'CN': {
		'CN1': {
			'stateCode': 'CN1',
			'name': 'Yunnan / 云南',
		},
		'CN2': {
			'stateCode': 'CN2',
			'name': 'Beijing / 北京',
		},
		'CN3': {
			'stateCode': 'CN3',
			'name': 'Tianjin / 天津',
		},
		'CN4': {
			'stateCode': 'CN4',
			'name': 'Hebei / 河北',
		},
		'CN5': {
			'stateCode': 'CN5',
			'name': 'Shanxi / 山西',
		},
		'CN6': {
			'stateCode': 'CN6',
			'name': 'Inner Mongolia / 內蒙古',
		},
		'CN7': {
			'stateCode': 'CN7',
			'name': 'Liaoning / 辽宁',
		},
		'CN8': {
			'stateCode': 'CN8',
			'name': 'Jilin / 吉林',
		},
		'CN9': {
			'stateCode': 'CN9',
			'name': 'Heilongjiang / 黑龙江',
		},
		'CN10': {
			'stateCode': 'CN10',
			'name': 'Shanghai / 上海',
		},
		'CN11': {
			'stateCode': 'CN11',
			'name': 'Jiangsu / 江苏',
		},
		'CN12': {
			'stateCode': 'CN12',
			'name': 'Zhejiang / 浙江',
		},
		'CN13': {
			'stateCode': 'CN13',
			'name': 'Anhui / 安徽',
		},
		'CN14': {
			'stateCode': 'CN14',
			'name': 'Fujian / 福建',
		},
		'CN15': {
			'stateCode': 'CN15',
			'name': 'Jiangxi / 江西',
		},
		'CN16': {
			'stateCode': 'CN16',
			'name': 'Shandong / 山东',
		},
		'CN17': {
			'stateCode': 'CN17',
			'name': 'Henan / 河南',
		},
		'CN18': {
			'stateCode': 'CN18',
			'name': 'Hubei / 湖北',
		},
		'CN19': {
			'stateCode': 'CN19',
			'name': 'Hunan / 湖南',
		},
		'CN20': {
			'stateCode': 'CN20',
			'name': 'Guangdong / 广东',
		},
		'CN21': {
			'stateCode': 'CN21',
			'name': 'Guangxi Zhuang / 广西壮族',
		},
		'CN22': {
			'stateCode': 'CN22',
			'name': 'Hainan / 海南',
		},
		'CN23': {
			'stateCode': 'CN23',
			'name': 'Chongqing / 重庆',
		},
		'CN24': {
			'stateCode': 'CN24',
			'name': 'Sichuan / 四川',
		},
		'CN25': {
			'stateCode': 'CN25',
			'name': 'Guizhou / 贵州',
		},
		'CN26': {
			'stateCode': 'CN26',
			'name': 'Shaanxi / 陕西',
		},
		'CN27': {
			'stateCode': 'CN27',
			'name': 'Gansu / 甘肃',
		},
		'CN28': {
			'stateCode': 'CN28',
			'name': 'Qinghai / 青海',
		},
		'CN29': {
			'stateCode': 'CN29',
			'name': 'Ningxia Hui / 宁夏',
		},
		'CN30': {
			'stateCode': 'CN30',
			'name': 'Macao / 澳门',
		},
		'CN31': {
			'stateCode': 'CN31',
			'name': 'Tibet / 西藏',
		},
		'CN32': {
			'stateCode': 'CN32',
			'name': 'Xinjiang / 新疆',
		},
	},
	'CO': {
		'CO-AMA': {
			'stateCode': 'CO-AMA',
			'name': 'Amazonas',
		},
		'CO-ANT': {
			'stateCode': 'CO-ANT',
			'name': 'Antioquia',
		},
		'CO-ARA': {
			'stateCode': 'CO-ARA',
			'name': 'Arauca',
		},
		'CO-ATL': {
			'stateCode': 'CO-ATL',
			'name': 'Atlántico',
		},
		'CO-BOL': {
			'stateCode': 'CO-BOL',
			'name': 'Bolívar',
		},
		'CO-BOY': {
			'stateCode': 'CO-BOY',
			'name': 'Boyacá',
		},
		'CO-CAL': {
			'stateCode': 'CO-CAL',
			'name': 'Caldas',
		},
		'CO-CAQ': {
			'stateCode': 'CO-CAQ',
			'name': 'Caquetá',
		},
		'CO-CAS': {
			'stateCode': 'CO-CAS',
			'name': 'Casanare',
		},
		'CO-CAU': {
			'stateCode': 'CO-CAU',
			'name': 'Cauca',
		},
		'CO-CES': {
			'stateCode': 'CO-CES',
			'name': 'Cesar',
		},
		'CO-CHO': {
			'stateCode': 'CO-CHO',
			'name': 'Chocó',
		},
		'CO-COR': {
			'stateCode': 'CO-COR',
			'name': 'Córdoba',
		},
		'CO-CUN': {
			'stateCode': 'CO-CUN',
			'name': 'Cundinamarca',
		},
		'CO-DC': {
			'stateCode': 'CO-DC',
			'name': 'Capital District',
		},
		'CO-GUA': {
			'stateCode': 'CO-GUA',
			'name': 'Guainía',
		},
		'CO-GUV': {
			'stateCode': 'CO-GUV',
			'name': 'Guaviare',
		},
		'CO-HUI': {
			'stateCode': 'CO-HUI',
			'name': 'Huila',
		},
		'CO-LAG': {
			'stateCode': 'CO-LAG',
			'name': 'La Guajira',
		},
		'CO-MAG': {
			'stateCode': 'CO-MAG',
			'name': 'Magdalena',
		},
		'CO-MET': {
			'stateCode': 'CO-MET',
			'name': 'Meta',
		},
		'CO-NAR': {
			'stateCode': 'CO-NAR',
			'name': 'Nariño',
		},
		'CO-NSA': {
			'stateCode': 'CO-NSA',
			'name': 'Norte de Santander',
		},
		'CO-PUT': {
			'stateCode': 'CO-PUT',
			'name': 'Putumayo',
		},
		'CO-QUI': {
			'stateCode': 'CO-QUI',
			'name': 'Quindío',
		},
		'CO-RIS': {
			'stateCode': 'CO-RIS',
			'name': 'Risaralda',
		},
		'CO-SAN': {
			'stateCode': 'CO-SAN',
			'name': 'Santander',
		},
		'CO-SAP': {
			'stateCode': 'CO-SAP',
			'name': 'San Andrés & Providencia',
		},
		'CO-SUC': {
			'stateCode': 'CO-SUC',
			'name': 'Sucre',
		},
		'CO-TOL': {
			'stateCode': 'CO-TOL',
			'name': 'Tolima',
		},
		'CO-VAC': {
			'stateCode': 'CO-VAC',
			'name': 'Valle del Cauca',
		},
		'CO-VAU': {
			'stateCode': 'CO-VAU',
			'name': 'Vaupés',
		},
		'CO-VID': {
			'stateCode': 'CO-VID',
			'name': 'Vichada',
		},
	},
	'CR': {
		'CR-A': {
			'stateCode': 'CR-A',
			'name': 'Alajuela',
		},
		'CR-C': {
			'stateCode': 'CR-C',
			'name': 'Cartago',
		},
		'CR-G': {
			'stateCode': 'CR-G',
			'name': 'Guanacaste',
		},
		'CR-H': {
			'stateCode': 'CR-H',
			'name': 'Heredia',
		},
		'CR-L': {
			'stateCode': 'CR-L',
			'name': 'Limón',
		},
		'CR-P': {
			'stateCode': 'CR-P',
			'name': 'Puntarenas',
		},
		'CR-SJ': {
			'stateCode': 'CR-SJ',
			'name': 'San José',
		},
	},
	'CZ': {},
	'DE': {},
	'DK': {},
	'DO': {
		'DO-01': {
			'stateCode': 'DO-01',
			'name': 'Distrito Nacional',
		},
		'DO-02': {
			'stateCode': 'DO-02',
			'name': 'Azua',
		},
		'DO-03': {
			'stateCode': 'DO-03',
			'name': 'Baoruco',
		},
		'DO-04': {
			'stateCode': 'DO-04',
			'name': 'Barahona',
		},
		'DO-33': {
			'stateCode': 'DO-33',
			'name': 'Cibao Nordeste',
		},
		'DO-34': {
			'stateCode': 'DO-34',
			'name': 'Cibao Noroeste',
		},
		'DO-35': {
			'stateCode': 'DO-35',
			'name': 'Cibao Norte',
		},
		'DO-36': {
			'stateCode': 'DO-36',
			'name': 'Cibao Sur',
		},
		'DO-05': {
			'stateCode': 'DO-05',
			'name': 'Dajabón',
		},
		'DO-06': {
			'stateCode': 'DO-06',
			'name': 'Duarte',
		},
		'DO-08': {
			'stateCode': 'DO-08',
			'name': 'El Seibo',
		},
		'DO-37': {
			'stateCode': 'DO-37',
			'name': 'El Valle',
		},
		'DO-07': {
			'stateCode': 'DO-07',
			'name': 'Elías Piña',
		},
		'DO-38': {
			'stateCode': 'DO-38',
			'name': 'Enriquillo',
		},
		'DO-09': {
			'stateCode': 'DO-09',
			'name': 'Espaillat',
		},
		'DO-30': {
			'stateCode': 'DO-30',
			'name': 'Hato Mayor',
		},
		'DO-19': {
			'stateCode': 'DO-19',
			'name': 'Hermanas Mirabal',
		},
		'DO-39': {
			'stateCode': 'DO-39',
			'name': 'Higüamo',
		},
		'DO-10': {
			'stateCode': 'DO-10',
			'name': 'Independencia',
		},
		'DO-11': {
			'stateCode': 'DO-11',
			'name': 'La Altagracia',
		},
		'DO-12': {
			'stateCode': 'DO-12',
			'name': 'La Romana',
		},
		'DO-13': {
			'stateCode': 'DO-13',
			'name': 'La Vega',
		},
		'DO-14': {
			'stateCode': 'DO-14',
			'name': 'María Trinidad Sánchez',
		},
		'DO-28': {
			'stateCode': 'DO-28',
			'name': 'Monseñor Nouel',
		},
		'DO-15': {
			'stateCode': 'DO-15',
			'name': 'Monte Cristi',
		},
		'DO-29': {
			'stateCode': 'DO-29',
			'name': 'Monte Plata',
		},
		'DO-40': {
			'stateCode': 'DO-40',
			'name': 'Ozama',
		},
		'DO-16': {
			'stateCode': 'DO-16',
			'name': 'Pedernales',
		},
		'DO-17': {
			'stateCode': 'DO-17',
			'name': 'Peravia',
		},
		'DO-18': {
			'stateCode': 'DO-18',
			'name': 'Puerto Plata',
		},
		'DO-20': {
			'stateCode': 'DO-20',
			'name': 'Samaná',
		},
		'DO-21': {
			'stateCode': 'DO-21',
			'name': 'San Cristóbal',
		},
		'DO-31': {
			'stateCode': 'DO-31',
			'name': 'San José de Ocoa',
		},
		'DO-22': {
			'stateCode': 'DO-22',
			'name': 'San Juan',
		},
		'DO-23': {
			'stateCode': 'DO-23',
			'name': 'San Pedro de Macorís',
		},
		'DO-24': {
			'stateCode': 'DO-24',
			'name': 'Sánchez Ramírez',
		},
		'DO-25': {
			'stateCode': 'DO-25',
			'name': 'Santiago',
		},
		'DO-26': {
			'stateCode': 'DO-26',
			'name': 'Santiago Rodríguez',
		},
		'DO-32': {
			'stateCode': 'DO-32',
			'name': 'Santo Domingo',
		},
		'DO-41': {
			'stateCode': 'DO-41',
			'name': 'Valdesia',
		},
		'DO-27': {
			'stateCode': 'DO-27',
			'name': 'Valverde',
		},
		'DO-42': {
			'stateCode': 'DO-42',
			'name': 'Yuma',
		},
	},
	'DZ': {
		'DZ-01': {
			'stateCode': 'DZ-01',
			'name': 'Adrar',
		},
		'DZ-02': {
			'stateCode': 'DZ-02',
			'name': 'Chlef',
		},
		'DZ-03': {
			'stateCode': 'DZ-03',
			'name': 'Laghouat',
		},
		'DZ-04': {
			'stateCode': 'DZ-04',
			'name': 'Oum El Bouaghi',
		},
		'DZ-05': {
			'stateCode': 'DZ-05',
			'name': 'Batna',
		},
		'DZ-06': {
			'stateCode': 'DZ-06',
			'name': 'Béjaïa',
		},
		'DZ-07': {
			'stateCode': 'DZ-07',
			'name': 'Biskra',
		},
		'DZ-08': {
			'stateCode': 'DZ-08',
			'name': 'Béchar',
		},
		'DZ-09': {
			'stateCode': 'DZ-09',
			'name': 'Blida',
		},
		'DZ-10': {
			'stateCode': 'DZ-10',
			'name': 'Bouira',
		},
		'DZ-11': {
			'stateCode': 'DZ-11',
			'name': 'Tamanghasset',
		},
		'DZ-12': {
			'stateCode': 'DZ-12',
			'name': 'Tébessa',
		},
		'DZ-13': {
			'stateCode': 'DZ-13',
			'name': 'Tlemcen',
		},
		'DZ-14': {
			'stateCode': 'DZ-14',
			'name': 'Tiaret',
		},
		'DZ-15': {
			'stateCode': 'DZ-15',
			'name': 'Tizi Ouzou',
		},
		'DZ-16': {
			'stateCode': 'DZ-16',
			'name': 'Algiers',
		},
		'DZ-17': {
			'stateCode': 'DZ-17',
			'name': 'Djelfa',
		},
		'DZ-18': {
			'stateCode': 'DZ-18',
			'name': 'Jijel',
		},
		'DZ-19': {
			'stateCode': 'DZ-19',
			'name': 'Sétif',
		},
		'DZ-20': {
			'stateCode': 'DZ-20',
			'name': 'Saïda',
		},
		'DZ-21': {
			'stateCode': 'DZ-21',
			'name': 'Skikda',
		},
		'DZ-22': {
			'stateCode': 'DZ-22',
			'name': 'Sidi Bel Abbès',
		},
		'DZ-23': {
			'stateCode': 'DZ-23',
			'name': 'Annaba',
		},
		'DZ-24': {
			'stateCode': 'DZ-24',
			'name': 'Guelma',
		},
		'DZ-25': {
			'stateCode': 'DZ-25',
			'name': 'Constantine',
		},
		'DZ-26': {
			'stateCode': 'DZ-26',
			'name': 'Médéa',
		},
		'DZ-27': {
			'stateCode': 'DZ-27',
			'name': 'Mostaganem',
		},
		'DZ-28': {
			'stateCode': 'DZ-28',
			'name': 'M’Sila',
		},
		'DZ-29': {
			'stateCode': 'DZ-29',
			'name': 'Mascara',
		},
		'DZ-30': {
			'stateCode': 'DZ-30',
			'name': 'Ouargla',
		},
		'DZ-31': {
			'stateCode': 'DZ-31',
			'name': 'Oran',
		},
		'DZ-32': {
			'stateCode': 'DZ-32',
			'name': 'El Bayadh',
		},
		'DZ-33': {
			'stateCode': 'DZ-33',
			'name': 'Illizi',
		},
		'DZ-34': {
			'stateCode': 'DZ-34',
			'name': 'Bordj Bou Arréridj',
		},
		'DZ-35': {
			'stateCode': 'DZ-35',
			'name': 'Boumerdès',
		},
		'DZ-36': {
			'stateCode': 'DZ-36',
			'name': 'El Tarf',
		},
		'DZ-37': {
			'stateCode': 'DZ-37',
			'name': 'Tindouf',
		},
		'DZ-38': {
			'stateCode': 'DZ-38',
			'name': 'Tissemsilt',
		},
		'DZ-39': {
			'stateCode': 'DZ-39',
			'name': 'El Oued',
		},
		'DZ-40': {
			'stateCode': 'DZ-40',
			'name': 'Khenchela',
		},
		'DZ-41': {
			'stateCode': 'DZ-41',
			'name': 'Souk Ahras',
		},
		'DZ-42': {
			'stateCode': 'DZ-42',
			'name': 'Tipasa',
		},
		'DZ-43': {
			'stateCode': 'DZ-43',
			'name': 'Mila',
		},
		'DZ-44': {
			'stateCode': 'DZ-44',
			'name': 'Aïn Defla',
		},
		'DZ-45': {
			'stateCode': 'DZ-45',
			'name': 'Naama',
		},
		'DZ-46': {
			'stateCode': 'DZ-46',
			'name': 'Aïn Témouchent',
		},
		'DZ-47': {
			'stateCode': 'DZ-47',
			'name': 'Ghardaïa',
		},
		'DZ-48': {
			'stateCode': 'DZ-48',
			'name': 'Relizane',
		},
	},
	'EE': {},
	'EC': {
		'EC-A': {
			'stateCode': 'EC-A',
			'name': 'Azuay',
		},
		'EC-B': {
			'stateCode': 'EC-B',
			'name': 'Bolívar',
		},
		'EC-F': {
			'stateCode': 'EC-F',
			'name': 'Cañar',
		},
		'EC-C': {
			'stateCode': 'EC-C',
			'name': 'Carchi',
		},
		'EC-H': {
			'stateCode': 'EC-H',
			'name': 'Chimborazo',
		},
		'EC-X': {
			'stateCode': 'EC-X',
			'name': 'Cotopaxi',
		},
		'EC-O': {
			'stateCode': 'EC-O',
			'name': 'El Oro',
		},
		'EC-E': {
			'stateCode': 'EC-E',
			'name': 'Esmeraldas',
		},
		'EC-W': {
			'stateCode': 'EC-W',
			'name': 'Galápagos',
		},
		'EC-G': {
			'stateCode': 'EC-G',
			'name': 'Guayas',
		},
		'EC-I': {
			'stateCode': 'EC-I',
			'name': 'Imbabura',
		},
		'EC-L': {
			'stateCode': 'EC-L',
			'name': 'Loja',
		},
		'EC-R': {
			'stateCode': 'EC-R',
			'name': 'Los Ríos',
		},
		'EC-M': {
			'stateCode': 'EC-M',
			'name': 'Manabí',
		},
		'EC-S': {
			'stateCode': 'EC-S',
			'name': 'Morona-Santiago',
		},
		'EC-N': {
			'stateCode': 'EC-N',
			'name': 'Napo',
		},
		'EC-D': {
			'stateCode': 'EC-D',
			'name': 'Orellana',
		},
		'EC-Y': {
			'stateCode': 'EC-Y',
			'name': 'Pastaza',
		},
		'EC-P': {
			'stateCode': 'EC-P',
			'name': 'Pichincha',
		},
		'EC-SE': {
			'stateCode': 'EC-SE',
			'name': 'Santa Elena',
		},
		'EC-SD': {
			'stateCode': 'EC-SD',
			'name': 'Santo Domingo de los Tsáchilas',
		},
		'EC-U': {
			'stateCode': 'EC-U',
			'name': 'Sucumbíos',
		},
		'EC-T': {
			'stateCode': 'EC-T',
			'name': 'Tungurahua',
		},
		'EC-Z': {
			'stateCode': 'EC-Z',
			'name': 'Zamora-Chinchipe',
		},
	},
	'EG': {
		'EGALX': {
			'stateCode': 'EGALX',
			'name': 'Alexandria',
		},
		'EGASN': {
			'stateCode': 'EGASN',
			'name': 'Aswan',
		},
		'EGAST': {
			'stateCode': 'EGAST',
			'name': 'Asyut',
		},
		'EGBA': {
			'stateCode': 'EGBA',
			'name': 'Red Sea',
		},
		'EGBH': {
			'stateCode': 'EGBH',
			'name': 'Beheira',
		},
		'EGBNS': {
			'stateCode': 'EGBNS',
			'name': 'Beni Suef',
		},
		'EGC': {
			'stateCode': 'EGC',
			'name': 'Cairo',
		},
		'EGDK': {
			'stateCode': 'EGDK',
			'name': 'Dakahlia',
		},
		'EGDT': {
			'stateCode': 'EGDT',
			'name': 'Damietta',
		},
		'EGFYM': {
			'stateCode': 'EGFYM',
			'name': 'Faiyum',
		},
		'EGGH': {
			'stateCode': 'EGGH',
			'name': 'Gharbia',
		},
		'EGGZ': {
			'stateCode': 'EGGZ',
			'name': 'Giza',
		},
		'EGIS': {
			'stateCode': 'EGIS',
			'name': 'Ismailia',
		},
		'EGJS': {
			'stateCode': 'EGJS',
			'name': 'South Sinai',
		},
		'EGKB': {
			'stateCode': 'EGKB',
			'name': 'Qalyubia',
		},
		'EGKFS': {
			'stateCode': 'EGKFS',
			'name': 'Kafr el-Sheikh',
		},
		'EGKN': {
			'stateCode': 'EGKN',
			'name': 'Qena',
		},
		'EGLX': {
			'stateCode': 'EGLX',
			'name': 'Luxor',
		},
		'EGMN': {
			'stateCode': 'EGMN',
			'name': 'Minya',
		},
		'EGMNF': {
			'stateCode': 'EGMNF',
			'name': 'Monufia',
		},
		'EGMT': {
			'stateCode': 'EGMT',
			'name': 'Matrouh',
		},
		'EGPTS': {
			'stateCode': 'EGPTS',
			'name': 'Port Said',
		},
		'EGSHG': {
			'stateCode': 'EGSHG',
			'name': 'Sohag',
		},
		'EGSHR': {
			'stateCode': 'EGSHR',
			'name': 'Al Sharqia',
		},
		'EGSIN': {
			'stateCode': 'EGSIN',
			'name': 'North Sinai',
		},
		'EGSUZ': {
			'stateCode': 'EGSUZ',
			'name': 'Suez',
		},
		'EGWAD': {
			'stateCode': 'EGWAD',
			'name': 'New Valley',
		},
	},
	'ES': {
		'C': {
			'stateCode': 'C',
			'name': 'A Coruña',
		},
		'VI': {
			'stateCode': 'VI',
			'name': 'Araba/Álava',
		},
		'AB': {
			'stateCode': 'AB',
			'name': 'Albacete',
		},
		'A': {
			'stateCode': 'A',
			'name': 'Alicante',
		},
		'AL': {
			'stateCode': 'AL',
			'name': 'Almería',
		},
		'O': {
			'stateCode': 'O',
			'name': 'Asturias',
		},
		'AV': {
			'stateCode': 'AV',
			'name': 'Ávila',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Badajoz',
		},
		'PM': {
			'stateCode': 'PM',
			'name': 'Baleares',
		},
		'B': {
			'stateCode': 'B',
			'name': 'Barcelona',
		},
		'BU': {
			'stateCode': 'BU',
			'name': 'Burgos',
		},
		'CC': {
			'stateCode': 'CC',
			'name': 'Cáceres',
		},
		'CA': {
			'stateCode': 'CA',
			'name': 'Cádiz',
		},
		'S': {
			'stateCode': 'S',
			'name': 'Cantabria',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Castellón',
		},
		'CE': {
			'stateCode': 'CE',
			'name': 'Ceuta',
		},
		'CR': {
			'stateCode': 'CR',
			'name': 'Ciudad Real',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Córdoba',
		},
		'CU': {
			'stateCode': 'CU',
			'name': 'Cuenca',
		},
		'GI': {
			'stateCode': 'GI',
			'name': 'Girona',
		},
		'GR': {
			'stateCode': 'GR',
			'name': 'Granada',
		},
		'GU': {
			'stateCode': 'GU',
			'name': 'Guadalajara',
		},
		'SS': {
			'stateCode': 'SS',
			'name': 'Gipuzkoa',
		},
		'H': {
			'stateCode': 'H',
			'name': 'Huelva',
		},
		'HU': {
			'stateCode': 'HU',
			'name': 'Huesca',
		},
		'J': {
			'stateCode': 'J',
			'name': 'Jaén',
		},
		'LO': {
			'stateCode': 'LO',
			'name': 'La Rioja',
		},
		'GC': {
			'stateCode': 'GC',
			'name': 'Las Palmas',
		},
		'LE': {
			'stateCode': 'LE',
			'name': 'León',
		},
		'L': {
			'stateCode': 'L',
			'name': 'Lleida',
		},
		'LU': {
			'stateCode': 'LU',
			'name': 'Lugo',
		},
		'M': {
			'stateCode': 'M',
			'name': 'Madrid',
		},
		'MA': {
			'stateCode': 'MA',
			'name': 'Málaga',
		},
		'ML': {
			'stateCode': 'ML',
			'name': 'Melilla',
		},
		'MU': {
			'stateCode': 'MU',
			'name': 'Murcia',
		},
		'NA': {
			'stateCode': 'NA',
			'name': 'Navarra',
		},
		'OR': {
			'stateCode': 'OR',
			'name': 'Ourense',
		},
		'P': {
			'stateCode': 'P',
			'name': 'Palencia',
		},
		'PO': {
			'stateCode': 'PO',
			'name': 'Pontevedra',
		},
		'SA': {
			'stateCode': 'SA',
			'name': 'Salamanca',
		},
		'TF': {
			'stateCode': 'TF',
			'name': 'Santa Cruz de Tenerife',
		},
		'SG': {
			'stateCode': 'SG',
			'name': 'Segovia',
		},
		'SE': {
			'stateCode': 'SE',
			'name': 'Sevilla',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Soria',
		},
		'T': {
			'stateCode': 'T',
			'name': 'Tarragona',
		},
		'TE': {
			'stateCode': 'TE',
			'name': 'Teruel',
		},
		'TO': {
			'stateCode': 'TO',
			'name': 'Toledo',
		},
		'V': {
			'stateCode': 'V',
			'name': 'Valencia',
		},
		'VA': {
			'stateCode': 'VA',
			'name': 'Valladolid',
		},
		'BI': {
			'stateCode': 'BI',
			'name': 'Biscay',
		},
		'ZA': {
			'stateCode': 'ZA',
			'name': 'Zamora',
		},
		'Z': {
			'stateCode': 'Z',
			'name': 'Zaragoza',
		},
	},
	'FI': {},
	'FR': {},
	'GF': {},
	'GH': {
		'AF': {
			'stateCode': 'AF',
			'name': 'Ahafo',
		},
		'AH': {
			'stateCode': 'AH',
			'name': 'Ashanti',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Brong-Ahafo',
		},
		'BO': {
			'stateCode': 'BO',
			'name': 'Bono',
		},
		'BE': {
			'stateCode': 'BE',
			'name': 'Bono East',
		},
		'CP': {
			'stateCode': 'CP',
			'name': 'Central',
		},
		'EP': {
			'stateCode': 'EP',
			'name': 'Eastern',
		},
		'AA': {
			'stateCode': 'AA',
			'name': 'Greater Accra',
		},
		'NE': {
			'stateCode': 'NE',
			'name': 'North East',
		},
		'NP': {
			'stateCode': 'NP',
			'name': 'Northern',
		},
		'OT': {
			'stateCode': 'OT',
			'name': 'Oti',
		},
		'SV': {
			'stateCode': 'SV',
			'name': 'Savannah',
		},
		'UE': {
			'stateCode': 'UE',
			'name': 'Upper East',
		},
		'UW': {
			'stateCode': 'UW',
			'name': 'Upper West',
		},
		'TV': {
			'stateCode': 'TV',
			'name': 'Volta',
		},
		'WP': {
			'stateCode': 'WP',
			'name': 'Western',
		},
		'WN': {
			'stateCode': 'WN',
			'name': 'Western North',
		},
	},
	'GP': {},
	'GR': {
		'I': {
			'stateCode': 'I',
			'name': 'Attica',
			locale: {
				el: 'Αττική',
				en: 'Attica',

			},
		},
		'A': {
			'stateCode': 'A',
			'name': 'East Macedonia and Thrace',
			locale: {

				el: 'Ανατολική Μακεδονία και Θράκη',
				en: 'East Macedonia and Thrace',

			},
		},
		'B': {
			'stateCode': 'B',
			'name': 'Central Macedonia',
			locale: {

				el: 'Κεντρική Μακεδονία',
				en: 'Central Macedonia',

			},
		},
		'C': {
			'stateCode': 'C',
			'name': 'West Macedonia',
			locale: {

				el: 'Δυτική Μακεδονία',
				en: 'West Macedonia',

			},
		},
		'D': {
			'stateCode': 'D',
			'name': 'Epirus',
			locale: {

				el: 'Ήπειρος',
				en: 'Epirus',

			},
		},
		'E': {
			'stateCode': 'E',
			'name': 'Thessaly',
			locale: {
				el: 'Θεσσαλία',
				en: 'Thessaly',
			},
		},
		'F': {
			'stateCode': 'F',
			'name': 'Ionian Islands',
			locale: {
				el: 'Ιώνιο',
				en: 'Ionian Islands',
			},
		},
		'G': {
			'stateCode': 'G',
			'name': 'West Greece',
			locale: {
				el: 'Δυτική Ελλάδα',
				en: 'West Greece',
			},
		},
		'H': {
			'stateCode': 'H',
			'name': 'Central Greece',
			locale: {
				el: 'Κεντρική Ελλάδα',
				en: 'Central Greece',
			},
		},
		'J': {
			'stateCode': 'J',
			'name': 'Peloponnese',
			locale: {
				el: 'Πελοπόννησος',
				en: 'Peloponnese',
			},
		},
		'K': {
			'stateCode': 'K',
			'name': 'North Aegean',
			locale: {
				el: 'Βόρειο Αιγαίο',
				en: 'North Aegean',
			},
		},
		'L': {
			'stateCode': 'L',
			'name': 'South Aegean',
			locale: {
				el: 'Νότιο Αιγαίο',
				en: 'South Aegean',
			},
		},
		'M': {
			'stateCode': 'M',
			'name': 'Crete',
			locale: {
				el: 'Κρήτη',
				en: 'Crete',
			},
		},
	},
	'GT': {
		'GT-AV': {
			'stateCode': 'GT-AV',
			'name': 'Alta Verapaz',
		},
		'GT-BV': {
			'stateCode': 'GT-BV',
			'name': 'Baja Verapaz',
		},
		'GT-CM': {
			'stateCode': 'GT-CM',
			'name': 'Chimaltenango',
		},
		'GT-CQ': {
			'stateCode': 'GT-CQ',
			'name': 'Chiquimula',
		},
		'GT-PR': {
			'stateCode': 'GT-PR',
			'name': 'El Progreso',
		},
		'GT-ES': {
			'stateCode': 'GT-ES',
			'name': 'Escuintla',
		},
		'GT-GU': {
			'stateCode': 'GT-GU',
			'name': 'Guatemala',
		},
		'GT-HU': {
			'stateCode': 'GT-HU',
			'name': 'Huehuetenango',
		},
		'GT-IZ': {
			'stateCode': 'GT-IZ',
			'name': 'Izabal',
		},
		'GT-JA': {
			'stateCode': 'GT-JA',
			'name': 'Jalapa',
		},
		'GT-JU': {
			'stateCode': 'GT-JU',
			'name': 'Jutiapa',
		},
		'GT-PE': {
			'stateCode': 'GT-PE',
			'name': 'Petén',
		},
		'GT-QZ': {
			'stateCode': 'GT-QZ',
			'name': 'Quetzaltenango',
		},
		'GT-QC': {
			'stateCode': 'GT-QC',
			'name': 'Quiché',
		},
		'GT-RE': {
			'stateCode': 'GT-RE',
			'name': 'Retalhuleu',
		},
		'GT-SA': {
			'stateCode': 'GT-SA',
			'name': 'Sacatepéquez',
		},
		'GT-SM': {
			'stateCode': 'GT-SM',
			'name': 'San Marcos',
		},
		'GT-SR': {
			'stateCode': 'GT-SR',
			'name': 'Santa Rosa',
		},
		'GT-SO': {
			'stateCode': 'GT-SO',
			'name': 'Sololá',
		},
		'GT-SU': {
			'stateCode': 'GT-SU',
			'name': 'Suchitepéquez',
		},
		'GT-TO': {
			'stateCode': 'GT-TO',
			'name': 'Totonicapán',
		},
		'GT-ZA': {
			'stateCode': 'GT-ZA',
			'name': 'Zacapa',
		},
	},
	'HK': {
		'HONG KONG': {
			'stateCode': 'HONG KONG',
			'name': 'Hong Kong Island',
		},
		'KOWLOON': {
			'stateCode': 'KOWLOON',
			'name': 'Kowloon',
		},
		'NEW TERRITORIES': {
			'stateCode': 'NEW TERRITORIES',
			'name': 'New Territories',
		},
	},
	'HN': {
		'HN-AT': {
			'stateCode': 'HN-AT',
			'name': 'Atlántida',
		},
		'HN-IB': {
			'stateCode': 'HN-IB',
			'name': 'Bay Islands',
		},
		'HN-CH': {
			'stateCode': 'HN-CH',
			'name': 'Choluteca',
		},
		'HN-CL': {
			'stateCode': 'HN-CL',
			'name': 'Colón',
		},
		'HN-CM': {
			'stateCode': 'HN-CM',
			'name': 'Comayagua',
		},
		'HN-CP': {
			'stateCode': 'HN-CP',
			'name': 'Copán',
		},
		'HN-CR': {
			'stateCode': 'HN-CR',
			'name': 'Cortés',
		},
		'HN-EP': {
			'stateCode': 'HN-EP',
			'name': 'El Paraíso',
		},
		'HN-FM': {
			'stateCode': 'HN-FM',
			'name': 'Francisco Morazán',
		},
		'HN-GD': {
			'stateCode': 'HN-GD',
			'name': 'Gracias a Dios',
		},
		'HN-IN': {
			'stateCode': 'HN-IN',
			'name': 'Intibucá',
		},
		'HN-LE': {
			'stateCode': 'HN-LE',
			'name': 'Lempira',
		},
		'HN-LP': {
			'stateCode': 'HN-LP',
			'name': 'La Paz',
		},
		'HN-OC': {
			'stateCode': 'HN-OC',
			'name': 'Ocotepeque',
		},
		'HN-OL': {
			'stateCode': 'HN-OL',
			'name': 'Olancho',
		},
		'HN-SB': {
			'stateCode': 'HN-SB',
			'name': 'Santa Bárbara',
		},
		'HN-VA': {
			'stateCode': 'HN-VA',
			'name': 'Valle',
		},
		'HN-YO': {
			'stateCode': 'HN-YO',
			'name': 'Yoro',
		},
	},
	'HU': {
		'BK': {
			'stateCode': 'BK',
			'name': 'Bács-Kiskun',
		},
		'BE': {
			'stateCode': 'BE',
			'name': 'Békés',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Baranya',
		},
		'BZ': {
			'stateCode': 'BZ',
			'name': 'Borsod-Abaúj-Zemplén',
		},
		'BU': {
			'stateCode': 'BU',
			'name': 'Budapest',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Csongrád-Csanád',
		},
		'FE': {
			'stateCode': 'FE',
			'name': 'Fejér',
		},
		'GS': {
			'stateCode': 'GS',
			'name': 'Győr-Moson-Sopron',
		},
		'HB': {
			'stateCode': 'HB',
			'name': 'Hajdú-Bihar',
		},
		'HE': {
			'stateCode': 'HE',
			'name': 'Heves',
		},
		'JN': {
			'stateCode': 'JN',
			'name': 'Jász-Nagykun-Szolnok',
		},
		'KE': {
			'stateCode': 'KE',
			'name': 'Komárom-Esztergom',
		},
		'NO': {
			'stateCode': 'NO',
			'name': 'Nógrád',
		},
		'PE': {
			'stateCode': 'PE',
			'name': 'Pest',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Somogy',
		},
		'SZ': {
			'stateCode': 'SZ',
			'name': 'Szabolcs-Szatmár-Bereg',
		},
		'TO': {
			'stateCode': 'TO',
			'name': 'Tolna',
		},
		'VA': {
			'stateCode': 'VA',
			'name': 'Vas',
		},
		'VE': {
			'stateCode': 'VE',
			'name': 'Veszprém',
		},
		'ZA': {
			'stateCode': 'ZA',
			'name': 'Zala',
		},
	},
	'ID': {
		'AC': {
			'stateCode': 'AC',
			'name': 'Daerah Istimewa Aceh',
		},
		'SU': {
			'stateCode': 'SU',
			'name': 'Sumatera Utara',
		},
		'SB': {
			'stateCode': 'SB',
			'name': 'Sumatera Barat',
		},
		'RI': {
			'stateCode': 'RI',
			'name': 'Riau',
		},
		'KR': {
			'stateCode': 'KR',
			'name': 'Kepulauan Riau',
		},
		'JA': {
			'stateCode': 'JA',
			'name': 'Jambi',
		},
		'SS': {
			'stateCode': 'SS',
			'name': 'Sumatera Selatan',
		},
		'BB': {
			'stateCode': 'BB',
			'name': 'Bangka Belitung',
		},
		'BE': {
			'stateCode': 'BE',
			'name': 'Bengkulu',
		},
		'LA': {
			'stateCode': 'LA',
			'name': 'Lampung',
		},
		'JK': {
			'stateCode': 'JK',
			'name': 'DKI Jakarta',
		},
		'JB': {
			'stateCode': 'JB',
			'name': 'Jawa Barat',
		},
		'BT': {
			'stateCode': 'BT',
			'name': 'Banten',
		},
		'JT': {
			'stateCode': 'JT',
			'name': 'Jawa Tengah',
		},
		'JI': {
			'stateCode': 'JI',
			'name': 'Jawa Timur',
		},
		'YO': {
			'stateCode': 'YO',
			'name': 'Daerah Istimewa Yogyakarta',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Bali',
		},
		'NB': {
			'stateCode': 'NB',
			'name': 'Nusa Tenggara Barat',
		},
		'NT': {
			'stateCode': 'NT',
			'name': 'Nusa Tenggara Timur',
		},
		'KB': {
			'stateCode': 'KB',
			'name': 'Kalimantan Barat',
		},
		'KT': {
			'stateCode': 'KT',
			'name': 'Kalimantan Tengah',
		},
		'KI': {
			'stateCode': 'KI',
			'name': 'Kalimantan Timur',
		},
		'KS': {
			'stateCode': 'KS',
			'name': 'Kalimantan Selatan',
		},
		'KU': {
			'stateCode': 'KU',
			'name': 'Kalimantan Utara',
		},
		'SA': {
			'stateCode': 'SA',
			'name': 'Sulawesi Utara',
		},
		'ST': {
			'stateCode': 'ST',
			'name': 'Sulawesi Tengah',
		},
		'SG': {
			'stateCode': 'SG',
			'name': 'Sulawesi Tenggara',
		},
		'SR': {
			'stateCode': 'SR',
			'name': 'Sulawesi Barat',
		},
		'SN': {
			'stateCode': 'SN',
			'name': 'Sulawesi Selatan',
		},
		'GO': {
			'stateCode': 'GO',
			'name': 'Gorontalo',
		},
		'MA': {
			'stateCode': 'MA',
			'name': 'Maluku',
		},
		'MU': {
			'stateCode': 'MU',
			'name': 'Maluku Utara',
		},
		'PA': {
			'stateCode': 'PA',
			'name': 'Papua',
		},
		'PB': {
			'stateCode': 'PB',
			'name': 'Papua Barat',
		},
	},
	'IE': {
		'CW': {
			'stateCode': 'CW',
			'name': 'Carlow',
		},
		'CN': {
			'stateCode': 'CN',
			'name': 'Cavan',
		},
		'CE': {
			'stateCode': 'CE',
			'name': 'Clare',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Cork',
		},
		'DL': {
			'stateCode': 'DL',
			'name': 'Donegal',
		},
		'D': {
			'stateCode': 'D',
			'name': 'Dublin',
		},
		'G': {
			'stateCode': 'G',
			'name': 'Galway',
		},
		'KY': {
			'stateCode': 'KY',
			'name': 'Kerry',
		},
		'KE': {
			'stateCode': 'KE',
			'name': 'Kildare',
		},
		'KK': {
			'stateCode': 'KK',
			'name': 'Kilkenny',
		},
		'LS': {
			'stateCode': 'LS',
			'name': 'Laois',
		},
		'LM': {
			'stateCode': 'LM',
			'name': 'Leitrim',
		},
		'LK': {
			'stateCode': 'LK',
			'name': 'Limerick',
		},
		'LD': {
			'stateCode': 'LD',
			'name': 'Longford',
		},
		'LH': {
			'stateCode': 'LH',
			'name': 'Louth',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Mayo',
		},
		'MH': {
			'stateCode': 'MH',
			'name': 'Meath',
		},
		'MN': {
			'stateCode': 'MN',
			'name': 'Monaghan',
		},
		'OY': {
			'stateCode': 'OY',
			'name': 'Offaly',
		},
		'RN': {
			'stateCode': 'RN',
			'name': 'Roscommon',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Sligo',
		},
		'TA': {
			'stateCode': 'TA',
			'name': 'Tipperary',
		},
		'WD': {
			'stateCode': 'WD',
			'name': 'Waterford',
		},
		'WH': {
			'stateCode': 'WH',
			'name': 'Westmeath',
		},
		'WX': {
			'stateCode': 'WX',
			'name': 'Wexford',
		},
		'WW': {
			'stateCode': 'WW',
			'name': 'Wicklow',
		},
	},
	'IN': {
		'AP': {
			'stateCode': 'AP',
			'name': 'Andhra Pradesh',
		},
		'AR': {
			'stateCode': 'AR',
			'name': 'Arunachal Pradesh',
		},
		'AS': {
			'stateCode': 'AS',
			'name': 'Assam',
		},
		'BR': {
			'stateCode': 'BR',
			'name': 'Bihar',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Chhattisgarh',
		},
		'GA': {
			'stateCode': 'GA',
			'name': 'Goa',
		},
		'GJ': {
			'stateCode': 'GJ',
			'name': 'Gujarat',
		},
		'HR': {
			'stateCode': 'HR',
			'name': 'Haryana',
		},
		'HP': {
			'stateCode': 'HP',
			'name': 'Himachal Pradesh',
		},
		'JK': {
			'stateCode': 'JK',
			'name': 'Jammu and Kashmir',
		},
		'JH': {
			'stateCode': 'JH',
			'name': 'Jharkhand',
		},
		'KA': {
			'stateCode': 'KA',
			'name': 'Karnataka',
		},
		'KL': {
			'stateCode': 'KL',
			'name': 'Kerala',
		},
		'LA': {
			'stateCode': 'LA',
			'name': 'Ladakh',
		},
		'MP': {
			'stateCode': 'MP',
			'name': 'Madhya Pradesh',
		},
		'MH': {
			'stateCode': 'MH',
			'name': 'Maharashtra',
		},
		'MN': {
			'stateCode': 'MN',
			'name': 'Manipur',
		},
		'ML': {
			'stateCode': 'ML',
			'name': 'Meghalaya',
		},
		'MZ': {
			'stateCode': 'MZ',
			'name': 'Mizoram',
		},
		'NL': {
			'stateCode': 'NL',
			'name': 'Nagaland',
		},
		'OR': {
			'stateCode': 'OR',
			'name': 'Odisha',
		},
		'PB': {
			'stateCode': 'PB',
			'name': 'Punjab',
		},
		'RJ': {
			'stateCode': 'RJ',
			'name': 'Rajasthan',
		},
		'SK': {
			'stateCode': 'SK',
			'name': 'Sikkim',
		},
		'TN': {
			'stateCode': 'TN',
			'name': 'Tamil Nadu',
		},
		'TS': {
			'stateCode': 'TS',
			'name': 'Telangana',
		},
		'TR': {
			'stateCode': 'TR',
			'name': 'Tripura',
		},
		'UK': {
			'stateCode': 'UK',
			'name': 'Uttarakhand',
		},
		'UP': {
			'stateCode': 'UP',
			'name': 'Uttar Pradesh',
		},
		'WB': {
			'stateCode': 'WB',
			'name': 'West Bengal',
		},
		'AN': {
			'stateCode': 'AN',
			'name': 'Andaman and Nicobar Islands',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Chandigarh',
		},
		'DN': {
			'stateCode': 'DN',
			'name': 'Dadra and Nagar Haveli',
		},
		'DD': {
			'stateCode': 'DD',
			'name': 'Daman and Diu',
		},
		'DL': {
			'stateCode': 'DL',
			'name': 'Delhi',
		},
		'LD': {
			'stateCode': 'LD',
			'name': 'Lakshadeep',
		},
		'PY': {
			'stateCode': 'PY',
			'name': 'Pondicherry (Puducherry)',
		},
	},
	'IR': {
		'KHZ': {
			'stateCode': 'KHZ',
			'name': 'Khuzestan (خوزستان)',
		},
		'THR': {
			'stateCode': 'THR',
			'name': 'Tehran (تهران)',
		},
		'ILM': {
			'stateCode': 'ILM',
			'name': 'Ilaam (ایلام)',
		},
		'BHR': {
			'stateCode': 'BHR',
			'name': 'Bushehr (بوشهر)',
		},
		'ADL': {
			'stateCode': 'ADL',
			'name': 'Ardabil (اردبیل)',
		},
		'ESF': {
			'stateCode': 'ESF',
			'name': 'Isfahan (اصفهان)',
		},
		'YZD': {
			'stateCode': 'YZD',
			'name': 'Yazd (یزد)',
		},
		'KRH': {
			'stateCode': 'KRH',
			'name': 'Kermanshah (کرمانشاه)',
		},
		'KRN': {
			'stateCode': 'KRN',
			'name': 'Kerman (کرمان)',
		},
		'HDN': {
			'stateCode': 'HDN',
			'name': 'Hamadan (همدان)',
		},
		'GZN': {
			'stateCode': 'GZN',
			'name': 'Ghazvin (قزوین)',
		},
		'ZJN': {
			'stateCode': 'ZJN',
			'name': 'Zanjan (زنجان)',
		},
		'LRS': {
			'stateCode': 'LRS',
			'name': 'Luristan (لرستان)',
		},
		'ABZ': {
			'stateCode': 'ABZ',
			'name': 'Alborz (البرز)',
		},
		'EAZ': {
			'stateCode': 'EAZ',
			'name': 'East Azarbaijan (آذربایجان شرقی)',
		},
		'WAZ': {
			'stateCode': 'WAZ',
			'name': 'West Azarbaijan (آذربایجان غربی)',
		},
		'CHB': {
			'stateCode': 'CHB',
			'name': 'Chaharmahal and Bakhtiari (چهارمحال و بختیاری)',
		},
		'SKH': {
			'stateCode': 'SKH',
			'name': 'South Khorasan (خراسان جنوبی)',
		},
		'RKH': {
			'stateCode': 'RKH',
			'name': 'Razavi Khorasan (خراسان رضوی)',
		},
		'NKH': {
			'stateCode': 'NKH',
			'name': 'North Khorasan (خراسان شمالی)',
		},
		'SMN': {
			'stateCode': 'SMN',
			'name': 'Semnan (سمنان)',
		},
		'FRS': {
			'stateCode': 'FRS',
			'name': 'Fars (فارس)',
		},
		'QHM': {
			'stateCode': 'QHM',
			'name': 'Qom (قم)',
		},
		'KRD': {
			'stateCode': 'KRD',
			'name': 'Kurdistan / کردستان)',
		},
		'KBD': {
			'stateCode': 'KBD',
			'name': 'Kohgiluyeh and BoyerAhmad (کهگیلوییه و بویراحمد)',
		},
		'GLS': {
			'stateCode': 'GLS',
			'name': 'Golestan (گلستان)',
		},
		'GIL': {
			'stateCode': 'GIL',
			'name': 'Gilan (گیلان)',
		},
		'MZN': {
			'stateCode': 'MZN',
			'name': 'Mazandaran (مازندران)',
		},
		'MKZ': {
			'stateCode': 'MKZ',
			'name': 'Markazi (مرکزی)',
		},
		'HRZ': {
			'stateCode': 'HRZ',
			'name': 'Hormozgan (هرمزگان)',
		},
		'SBN': {
			'stateCode': 'SBN',
			'name': 'Sistan and Baluchestan (سیستان و بلوچستان)',
		},
	},
	'IS': {},
	'IT': {
		'AG': {
			'stateCode': 'AG',
			'name': 'Agrigento',
		},
		'AL': {
			'stateCode': 'AL',
			'name': 'Alessandria',
		},
		'AN': {
			'stateCode': 'AN',
			'name': 'Ancona',
		},
		'AO': {
			'stateCode': 'AO',
			'name': 'Aosta',
		},
		'AR': {
			'stateCode': 'AR',
			'name': 'Arezzo',
		},
		'AP': {
			'stateCode': 'AP',
			'name': 'Ascoli Piceno',
		},
		'AT': {
			'stateCode': 'AT',
			'name': 'Asti',
		},
		'AV': {
			'stateCode': 'AV',
			'name': 'Avellino',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Bari',
		},
		'BT': {
			'stateCode': 'BT',
			'name': 'Barletta-Andria-Trani',
		},
		'BL': {
			'stateCode': 'BL',
			'name': 'Belluno',
		},
		'BN': {
			'stateCode': 'BN',
			'name': 'Benevento',
		},
		'BG': {
			'stateCode': 'BG',
			'name': 'Bergamo',
		},
		'BI': {
			'stateCode': 'BI',
			'name': 'Biella',
		},
		'BO': {
			'stateCode': 'BO',
			'name': 'Bologna',
		},
		'BZ': {
			'stateCode': 'BZ',
			'name': 'Bolzano',
		},
		'BS': {
			'stateCode': 'BS',
			'name': 'Brescia',
		},
		'BR': {
			'stateCode': 'BR',
			'name': 'Brindisi',
		},
		'CA': {
			'stateCode': 'CA',
			'name': 'Cagliari',
		},
		'CL': {
			'stateCode': 'CL',
			'name': 'Caltanissetta',
		},
		'CB': {
			'stateCode': 'CB',
			'name': 'Campobasso',
		},
		'CE': {
			'stateCode': 'CE',
			'name': 'Caserta',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Catania',
		},
		'CZ': {
			'stateCode': 'CZ',
			'name': 'Catanzaro',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Chieti',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Como',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Cosenza',
		},
		'CR': {
			'stateCode': 'CR',
			'name': 'Cremona',
		},
		'KR': {
			'stateCode': 'KR',
			'name': 'Crotone',
		},
		'CN': {
			'stateCode': 'CN',
			'name': 'Cuneo',
		},
		'EN': {
			'stateCode': 'EN',
			'name': 'Enna',
		},
		'FM': {
			'stateCode': 'FM',
			'name': 'Fermo',
		},
		'FE': {
			'stateCode': 'FE',
			'name': 'Ferrara',
		},
		'FI': {
			'stateCode': 'FI',
			'name': 'Firenze',
		},
		'FG': {
			'stateCode': 'FG',
			'name': 'Foggia',
		},
		'FC': {
			'stateCode': 'FC',
			'name': 'Forlì-Cesena',
		},
		'FR': {
			'stateCode': 'FR',
			'name': 'Frosinone',
		},
		'GE': {
			'stateCode': 'GE',
			'name': 'Genova',
		},
		'GO': {
			'stateCode': 'GO',
			'name': 'Gorizia',
		},
		'GR': {
			'stateCode': 'GR',
			'name': 'Grosseto',
		},
		'IM': {
			'stateCode': 'IM',
			'name': 'Imperia',
		},
		'IS': {
			'stateCode': 'IS',
			'name': 'Isernia',
		},
		'SP': {
			'stateCode': 'SP',
			'name': 'La Spezia',
		},
		'AQ': {
			'stateCode': 'AQ',
			'name': 'L\'Aquila',
		},
		'LT': {
			'stateCode': 'LT',
			'name': 'Latina',
		},
		'LE': {
			'stateCode': 'LE',
			'name': 'Lecce',
		},
		'LC': {
			'stateCode': 'LC',
			'name': 'Lecco',
		},
		'LI': {
			'stateCode': 'LI',
			'name': 'Livorno',
		},
		'LO': {
			'stateCode': 'LO',
			'name': 'Lodi',
		},
		'LU': {
			'stateCode': 'LU',
			'name': 'Lucca',
		},
		'MC': {
			'stateCode': 'MC',
			'name': 'Macerata',
		},
		'MN': {
			'stateCode': 'MN',
			'name': 'Mantova',
		},
		'MS': {
			'stateCode': 'MS',
			'name': 'Massa-Carrara',
		},
		'MT': {
			'stateCode': 'MT',
			'name': 'Matera',
		},
		'ME': {
			'stateCode': 'ME',
			'name': 'Messina',
		},
		'MI': {
			'stateCode': 'MI',
			'name': 'Milano',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Modena',
		},
		'MB': {
			'stateCode': 'MB',
			'name': 'Monza e della Brianza',
		},
		'NA': {
			'stateCode': 'NA',
			'name': 'Napoli',
		},
		'NO': {
			'stateCode': 'NO',
			'name': 'Novara',
		},
		'NU': {
			'stateCode': 'NU',
			'name': 'Nuoro',
		},
		'OR': {
			'stateCode': 'OR',
			'name': 'Oristano',
		},
		'PD': {
			'stateCode': 'PD',
			'name': 'Padova',
		},
		'PA': {
			'stateCode': 'PA',
			'name': 'Palermo',
		},
		'PR': {
			'stateCode': 'PR',
			'name': 'Parma',
		},
		'PV': {
			'stateCode': 'PV',
			'name': 'Pavia',
		},
		'PG': {
			'stateCode': 'PG',
			'name': 'Perugia',
		},
		'PU': {
			'stateCode': 'PU',
			'name': 'Pesaro e Urbino',
		},
		'PE': {
			'stateCode': 'PE',
			'name': 'Pescara',
		},
		'PC': {
			'stateCode': 'PC',
			'name': 'Piacenza',
		},
		'PI': {
			'stateCode': 'PI',
			'name': 'Pisa',
		},
		'PT': {
			'stateCode': 'PT',
			'name': 'Pistoia',
		},
		'PN': {
			'stateCode': 'PN',
			'name': 'Pordenone',
		},
		'PZ': {
			'stateCode': 'PZ',
			'name': 'Potenza',
		},
		'PO': {
			'stateCode': 'PO',
			'name': 'Prato',
		},
		'RG': {
			'stateCode': 'RG',
			'name': 'Ragusa',
		},
		'RA': {
			'stateCode': 'RA',
			'name': 'Ravenna',
		},
		'RC': {
			'stateCode': 'RC',
			'name': 'Reggio Calabria',
		},
		'RE': {
			'stateCode': 'RE',
			'name': 'Reggio Emilia',
		},
		'RI': {
			'stateCode': 'RI',
			'name': 'Rieti',
		},
		'RN': {
			'stateCode': 'RN',
			'name': 'Rimini',
		},
		'RM': {
			'stateCode': 'RM',
			'name': 'Roma',
		},
		'RO': {
			'stateCode': 'RO',
			'name': 'Rovigo',
		},
		'SA': {
			'stateCode': 'SA',
			'name': 'Salerno',
		},
		'SS': {
			'stateCode': 'SS',
			'name': 'Sassari',
		},
		'SV': {
			'stateCode': 'SV',
			'name': 'Savona',
		},
		'SI': {
			'stateCode': 'SI',
			'name': 'Siena',
		},
		'SR': {
			'stateCode': 'SR',
			'name': 'Siracusa',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Sondrio',
		},
		'SU': {
			'stateCode': 'SU',
			'name': 'Sud Sardegna',
		},
		'TA': {
			'stateCode': 'TA',
			'name': 'Taranto',
		},
		'TE': {
			'stateCode': 'TE',
			'name': 'Teramo',
		},
		'TR': {
			'stateCode': 'TR',
			'name': 'Terni',
		},
		'TO': {
			'stateCode': 'TO',
			'name': 'Torino',
		},
		'TP': {
			'stateCode': 'TP',
			'name': 'Trapani',
		},
		'TN': {
			'stateCode': 'TN',
			'name': 'Trento',
		},
		'TV': {
			'stateCode': 'TV',
			'name': 'Treviso',
		},
		'TS': {
			'stateCode': 'TS',
			'name': 'Trieste',
		},
		'UD': {
			'stateCode': 'UD',
			'name': 'Udine',
		},
		'VA': {
			'stateCode': 'VA',
			'name': 'Varese',
		},
		'VE': {
			'stateCode': 'VE',
			'name': 'Venezia',
		},
		'VB': {
			'stateCode': 'VB',
			'name': 'Verbano-Cusio-Ossola',
		},
		'VC': {
			'stateCode': 'VC',
			'name': 'Vercelli',
		},
		'VR': {
			'stateCode': 'VR',
			'name': 'Verona',
		},
		'VV': {
			'stateCode': 'VV',
			'name': 'Vibo Valentia',
		},
		'VI': {
			'stateCode': 'VI',
			'name': 'Vicenza',
		},
		'VT': {
			'stateCode': 'VT',
			'name': 'Viterbo',
		},
	},
	'IL': {},
	'IM': {},
	'JM': {
		'JM-01': {
			'stateCode': 'JM-01',
			'name': 'Kingston',
		},
		'JM-02': {
			'stateCode': 'JM-02',
			'name': 'Saint Andrew',
		},
		'JM-03': {
			'stateCode': 'JM-03',
			'name': 'Saint Thomas',
		},
		'JM-04': {
			'stateCode': 'JM-04',
			'name': 'Portland',
		},
		'JM-05': {
			'stateCode': 'JM-05',
			'name': 'Saint Mary',
		},
		'JM-06': {
			'stateCode': 'JM-06',
			'name': 'Saint Ann',
		},
		'JM-07': {
			'stateCode': 'JM-07',
			'name': 'Trelawny',
		},
		'JM-08': {
			'stateCode': 'JM-08',
			'name': 'Saint James',
		},
		'JM-09': {
			'stateCode': 'JM-09',
			'name': 'Hanover',
		},
		'JM-10': {
			'stateCode': 'JM-10',
			'name': 'Westmoreland',
		},
		'JM-11': {
			'stateCode': 'JM-11',
			'name': 'Saint Elizabeth',
		},
		'JM-12': {
			'stateCode': 'JM-12',
			'name': 'Manchester',
		},
		'JM-13': {
			'stateCode': 'JM-13',
			'name': 'Clarendon',
		},
		'JM-14': {
			'stateCode': 'JM-14',
			'name': 'Saint Catherine',
		},
	},
	'JP': {
		'JP01': {
			'stateCode': 'JP01',
			'name': 'Hokkaido',
		},
		'JP02': {
			'stateCode': 'JP02',
			'name': 'Aomori',
		},
		'JP03': {
			'stateCode': 'JP03',
			'name': 'Iwate',
		},
		'JP04': {
			'stateCode': 'JP04',
			'name': 'Miyagi',
		},
		'JP05': {
			'stateCode': 'JP05',
			'name': 'Akita',
		},
		'JP06': {
			'stateCode': 'JP06',
			'name': 'Yamagata',
		},
		'JP07': {
			'stateCode': 'JP07',
			'name': 'Fukushima',
		},
		'JP08': {
			'stateCode': 'JP08',
			'name': 'Ibaraki',
		},
		'JP09': {
			'stateCode': 'JP09',
			'name': 'Tochigi',
		},
		'JP10': {
			'stateCode': 'JP10',
			'name': 'Gunma',
		},
		'JP11': {
			'stateCode': 'JP11',
			'name': 'Saitama',
		},
		'JP12': {
			'stateCode': 'JP12',
			'name': 'Chiba',
		},
		'JP13': {
			'stateCode': 'JP13',
			'name': 'Tokyo',
		},
		'JP14': {
			'stateCode': 'JP14',
			'name': 'Kanagawa',
		},
		'JP15': {
			'stateCode': 'JP15',
			'name': 'Niigata',
		},
		'JP16': {
			'stateCode': 'JP16',
			'name': 'Toyama',
		},
		'JP17': {
			'stateCode': 'JP17',
			'name': 'Ishikawa',
		},
		'JP18': {
			'stateCode': 'JP18',
			'name': 'Fukui',
		},
		'JP19': {
			'stateCode': 'JP19',
			'name': 'Yamanashi',
		},
		'JP20': {
			'stateCode': 'JP20',
			'name': 'Nagano',
		},
		'JP21': {
			'stateCode': 'JP21',
			'name': 'Gifu',
		},
		'JP22': {
			'stateCode': 'JP22',
			'name': 'Shizuoka',
		},
		'JP23': {
			'stateCode': 'JP23',
			'name': 'Aichi',
		},
		'JP24': {
			'stateCode': 'JP24',
			'name': 'Mie',
		},
		'JP25': {
			'stateCode': 'JP25',
			'name': 'Shiga',
		},
		'JP26': {
			'stateCode': 'JP26',
			'name': 'Kyoto',
		},
		'JP27': {
			'stateCode': 'JP27',
			'name': 'Osaka',
		},
		'JP28': {
			'stateCode': 'JP28',
			'name': 'Hyogo',
		},
		'JP29': {
			'stateCode': 'JP29',
			'name': 'Nara',
		},
		'JP30': {
			'stateCode': 'JP30',
			'name': 'Wakayama',
		},
		'JP31': {
			'stateCode': 'JP31',
			'name': 'Tottori',
		},
		'JP32': {
			'stateCode': 'JP32',
			'name': 'Shimane',
		},
		'JP33': {
			'stateCode': 'JP33',
			'name': 'Okayama',
		},
		'JP34': {
			'stateCode': 'JP34',
			'name': 'Hiroshima',
		},
		'JP35': {
			'stateCode': 'JP35',
			'name': 'Yamaguchi',
		},
		'JP36': {
			'stateCode': 'JP36',
			'name': 'Tokushima',
		},
		'JP37': {
			'stateCode': 'JP37',
			'name': 'Kagawa',
		},
		'JP38': {
			'stateCode': 'JP38',
			'name': 'Ehime',
		},
		'JP39': {
			'stateCode': 'JP39',
			'name': 'Kochi',
		},
		'JP40': {
			'stateCode': 'JP40',
			'name': 'Fukuoka',
		},
		'JP41': {
			'stateCode': 'JP41',
			'name': 'Saga',
		},
		'JP42': {
			'stateCode': 'JP42',
			'name': 'Nagasaki',
		},
		'JP43': {
			'stateCode': 'JP43',
			'name': 'Kumamoto',
		},
		'JP44': {
			'stateCode': 'JP44',
			'name': 'Oita',
		},
		'JP45': {
			'stateCode': 'JP45',
			'name': 'Miyazaki',
		},
		'JP46': {
			'stateCode': 'JP46',
			'name': 'Kagoshima',
		},
		'JP47': {
			'stateCode': 'JP47',
			'name': 'Okinawa',
		},
	},
	'KE': {
		'KE01': {
			'stateCode': 'KE01',
			'name': 'Baringo',
		},
		'KE02': {
			'stateCode': 'KE02',
			'name': 'Bomet',
		},
		'KE03': {
			'stateCode': 'KE03',
			'name': 'Bungoma',
		},
		'KE04': {
			'stateCode': 'KE04',
			'name': 'Busia',
		},
		'KE05': {
			'stateCode': 'KE05',
			'name': 'Elgeyo-Marakwet',
		},
		'KE06': {
			'stateCode': 'KE06',
			'name': 'Embu',
		},
		'KE07': {
			'stateCode': 'KE07',
			'name': 'Garissa',
		},
		'KE08': {
			'stateCode': 'KE08',
			'name': 'Homa Bay',
		},
		'KE09': {
			'stateCode': 'KE09',
			'name': 'Isiolo',
		},
		'KE10': {
			'stateCode': 'KE10',
			'name': 'Kajiado',
		},
		'KE11': {
			'stateCode': 'KE11',
			'name': 'Kakamega',
		},
		'KE12': {
			'stateCode': 'KE12',
			'name': 'Kericho',
		},
		'KE13': {
			'stateCode': 'KE13',
			'name': 'Kiambu',
		},
		'KE14': {
			'stateCode': 'KE14',
			'name': 'Kilifi',
		},
		'KE15': {
			'stateCode': 'KE15',
			'name': 'Kirinyaga',
		},
		'KE16': {
			'stateCode': 'KE16',
			'name': 'Kisii',
		},
		'KE17': {
			'stateCode': 'KE17',
			'name': 'Kisumu',
		},
		'KE18': {
			'stateCode': 'KE18',
			'name': 'Kitui',
		},
		'KE19': {
			'stateCode': 'KE19',
			'name': 'Kwale',
		},
		'KE20': {
			'stateCode': 'KE20',
			'name': 'Laikipia',
		},
		'KE21': {
			'stateCode': 'KE21',
			'name': 'Lamu',
		},
		'KE22': {
			'stateCode': 'KE22',
			'name': 'Machakos',
		},
		'KE23': {
			'stateCode': 'KE23',
			'name': 'Makueni',
		},
		'KE24': {
			'stateCode': 'KE24',
			'name': 'Mandera',
		},
		'KE25': {
			'stateCode': 'KE25',
			'name': 'Marsabit',
		},
		'KE26': {
			'stateCode': 'KE26',
			'name': 'Meru',
		},
		'KE27': {
			'stateCode': 'KE27',
			'name': 'Migori',
		},
		'KE28': {
			'stateCode': 'KE28',
			'name': 'Mombasa',
		},
		'KE29': {
			'stateCode': 'KE29',
			'name': 'Murang’a',
		},
		'KE30': {
			'stateCode': 'KE30',
			'name': 'Nairobi County',
		},
		'KE31': {
			'stateCode': 'KE31',
			'name': 'Nakuru',
		},
		'KE32': {
			'stateCode': 'KE32',
			'name': 'Nandi',
		},
		'KE33': {
			'stateCode': 'KE33',
			'name': 'Narok',
		},
		'KE34': {
			'stateCode': 'KE34',
			'name': 'Nyamira',
		},
		'KE35': {
			'stateCode': 'KE35',
			'name': 'Nyandarua',
		},
		'KE36': {
			'stateCode': 'KE36',
			'name': 'Nyeri',
		},
		'KE37': {
			'stateCode': 'KE37',
			'name': 'Samburu',
		},
		'KE38': {
			'stateCode': 'KE38',
			'name': 'Siaya',
		},
		'KE39': {
			'stateCode': 'KE39',
			'name': 'Taita-Taveta',
		},
		'KE40': {
			'stateCode': 'KE40',
			'name': 'Tana River',
		},
		'KE41': {
			'stateCode': 'KE41',
			'name': 'Tharaka-Nithi',
		},
		'KE42': {
			'stateCode': 'KE42',
			'name': 'Trans Nzoia',
		},
		'KE43': {
			'stateCode': 'KE43',
			'name': 'Turkana',
		},
		'KE44': {
			'stateCode': 'KE44',
			'name': 'Uasin Gishu',
		},
		'KE45': {
			'stateCode': 'KE45',
			'name': 'Vihiga',
		},
		'KE46': {
			'stateCode': 'KE46',
			'name': 'Wajir',
		},
		'KE47': {
			'stateCode': 'KE47',
			'name': 'West Pokot',
		},
	},
	'KR': {},
	'KW': {},
	'LA': {
		'AT': {
			'stateCode': 'AT',
			'name': 'Attapeu',
		},
		'BK': {
			'stateCode': 'BK',
			'name': 'Bokeo',
		},
		'BL': {
			'stateCode': 'BL',
			'name': 'Bolikhamsai',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Champasak',
		},
		'HO': {
			'stateCode': 'HO',
			'name': 'Houaphanh',
		},
		'KH': {
			'stateCode': 'KH',
			'name': 'Khammouane',
		},
		'LM': {
			'stateCode': 'LM',
			'name': 'Luang Namtha',
		},
		'LP': {
			'stateCode': 'LP',
			'name': 'Luang Prabang',
		},
		'OU': {
			'stateCode': 'OU',
			'name': 'Oudomxay',
		},
		'PH': {
			'stateCode': 'PH',
			'name': 'Phongsaly',
		},
		'SL': {
			'stateCode': 'SL',
			'name': 'Salavan',
		},
		'SV': {
			'stateCode': 'SV',
			'name': 'Savannakhet',
		},
		'VI': {
			'stateCode': 'VI',
			'name': 'Vientiane Province',
		},
		'VT': {
			'stateCode': 'VT',
			'name': 'Vientiane',
		},
		'XA': {
			'stateCode': 'XA',
			'name': 'Sainyabuli',
		},
		'XE': {
			'stateCode': 'XE',
			'name': 'Sekong',
		},
		'XI': {
			'stateCode': 'XI',
			'name': 'Xiangkhouang',
		},
		'XS': {
			'stateCode': 'XS',
			'name': 'Xaisomboun',
		},
	},
	'LB': {},
	'LR': {
		'BM': {
			'stateCode': 'BM',
			'name': 'Bomi',
		},
		'BN': {
			'stateCode': 'BN',
			'name': 'Bong',
		},
		'GA': {
			'stateCode': 'GA',
			'name': 'Gbarpolu',
		},
		'GB': {
			'stateCode': 'GB',
			'name': 'Grand Bassa',
		},
		'GC': {
			'stateCode': 'GC',
			'name': 'Grand Cape Mount',
		},
		'GG': {
			'stateCode': 'GG',
			'name': 'Grand Gedeh',
		},
		'GK': {
			'stateCode': 'GK',
			'name': 'Grand Kru',
		},
		'LO': {
			'stateCode': 'LO',
			'name': 'Lofa',
		},
		'MA': {
			'stateCode': 'MA',
			'name': 'Margibi',
		},
		'MY': {
			'stateCode': 'MY',
			'name': 'Maryland',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Montserrado',
		},
		'NM': {
			'stateCode': 'NM',
			'name': 'Nimba',
		},
		'RV': {
			'stateCode': 'RV',
			'name': 'Rivercess',
		},
		'RG': {
			'stateCode': 'RG',
			'name': 'River Gee',
		},
		'SN': {
			'stateCode': 'SN',
			'name': 'Sinoe',
		},
	},
	'LU': {},
	'MD': {
		'C': {
			'stateCode': 'C',
			'name': 'Chișinău',
		},
		'BL': {
			'stateCode': 'BL',
			'name': 'Bălți',
		},
		'AN': {
			'stateCode': 'AN',
			'name': 'Anenii Noi',
		},
		'BS': {
			'stateCode': 'BS',
			'name': 'Basarabeasca',
		},
		'BR': {
			'stateCode': 'BR',
			'name': 'Briceni',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Cahul',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Cantemir',
		},
		'CL': {
			'stateCode': 'CL',
			'name': 'Călărași',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Căușeni',
		},
		'CM': {
			'stateCode': 'CM',
			'name': 'Cimișlia',
		},
		'CR': {
			'stateCode': 'CR',
			'name': 'Criuleni',
		},
		'DN': {
			'stateCode': 'DN',
			'name': 'Dondușeni',
		},
		'DR': {
			'stateCode': 'DR',
			'name': 'Drochia',
		},
		'DB': {
			'stateCode': 'DB',
			'name': 'Dubăsari',
		},
		'ED': {
			'stateCode': 'ED',
			'name': 'Edineț',
		},
		'FL': {
			'stateCode': 'FL',
			'name': 'Fălești',
		},
		'FR': {
			'stateCode': 'FR',
			'name': 'Florești',
		},
		'GE': {
			'stateCode': 'GE',
			'name': 'UTA Găgăuzia',
		},
		'GL': {
			'stateCode': 'GL',
			'name': 'Glodeni',
		},
		'HN': {
			'stateCode': 'HN',
			'name': 'Hîncești',
		},
		'IL': {
			'stateCode': 'IL',
			'name': 'Ialoveni',
		},
		'LV': {
			'stateCode': 'LV',
			'name': 'Leova',
		},
		'NS': {
			'stateCode': 'NS',
			'name': 'Nisporeni',
		},
		'OC': {
			'stateCode': 'OC',
			'name': 'Ocnița',
		},
		'OR': {
			'stateCode': 'OR',
			'name': 'Orhei',
		},
		'RZ': {
			'stateCode': 'RZ',
			'name': 'Rezina',
		},
		'RS': {
			'stateCode': 'RS',
			'name': 'Rîșcani',
		},
		'SG': {
			'stateCode': 'SG',
			'name': 'Sîngerei',
		},
		'SR': {
			'stateCode': 'SR',
			'name': 'Soroca',
		},
		'ST': {
			'stateCode': 'ST',
			'name': 'Strășeni',
		},
		'SD': {
			'stateCode': 'SD',
			'name': 'Șoldănești',
		},
		'SV': {
			'stateCode': 'SV',
			'name': 'Ștefan Vodă',
		},
		'TR': {
			'stateCode': 'TR',
			'name': 'Taraclia',
		},
		'TL': {
			'stateCode': 'TL',
			'name': 'Telenești',
		},
		'UN': {
			'stateCode': 'UN',
			'name': 'Ungheni',
		},
	},
	'MQ': {},
	'MT': {},
	'MX': {
		'DF': {
			'stateCode': 'DF',
			'name': 'Ciudad de México',
		},
		'JA': {
			'stateCode': 'JA',
			'name': 'Jalisco',
		},
		'NL': {
			'stateCode': 'NL',
			'name': 'Nuevo León',
		},
		'AG': {
			'stateCode': 'AG',
			'name': 'Aguascalientes',
		},
		'BC': {
			'stateCode': 'BC',
			'name': 'Baja California',
		},
		'BS': {
			'stateCode': 'BS',
			'name': 'Baja California Sur',
		},
		'CM': {
			'stateCode': 'CM',
			'name': 'Campeche',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Chiapas',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Chihuahua',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Coahuila',
		},
		'CL': {
			'stateCode': 'CL',
			'name': 'Colima',
		},
		'DG': {
			'stateCode': 'DG',
			'name': 'Durango',
		},
		'GT': {
			'stateCode': 'GT',
			'name': 'Guanajuato',
		},
		'GR': {
			'stateCode': 'GR',
			'name': 'Guerrero',
		},
		'HG': {
			'stateCode': 'HG',
			'name': 'Hidalgo',
		},
		'MX': {
			'stateCode': 'MX',
			'name': 'Estado de México',
		},
		'MI': {
			'stateCode': 'MI',
			'name': 'Michoacán',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Morelos',
		},
		'NA': {
			'stateCode': 'NA',
			'name': 'Nayarit',
		},
		'OA': {
			'stateCode': 'OA',
			'name': 'Oaxaca',
		},
		'PU': {
			'stateCode': 'PU',
			'name': 'Puebla',
		},
		'QT': {
			'stateCode': 'QT',
			'name': 'Querétaro',
		},
		'QR': {
			'stateCode': 'QR',
			'name': 'Quintana Roo',
		},
		'SL': {
			'stateCode': 'SL',
			'name': 'San Luis Potosí',
		},
		'SI': {
			'stateCode': 'SI',
			'name': 'Sinaloa',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Sonora',
		},
		'TB': {
			'stateCode': 'TB',
			'name': 'Tabasco',
		},
		'TM': {
			'stateCode': 'TM',
			'name': 'Tamaulipas',
		},
		'TL': {
			'stateCode': 'TL',
			'name': 'Tlaxcala',
		},
		'VE': {
			'stateCode': 'VE',
			'name': 'Veracruz',
		},
		'YU': {
			'stateCode': 'YU',
			'name': 'Yucatán',
		},
		'ZA': {
			'stateCode': 'ZA',
			'name': 'Zacatecas',
		},
	},
	'MY': {
		'JHR': {
			'stateCode': 'JHR',
			'name': 'Johor',
		},
		'KDH': {
			'stateCode': 'KDH',
			'name': 'Kedah',
		},
		'KTN': {
			'stateCode': 'KTN',
			'name': 'Kelantan',
		},
		'LBN': {
			'stateCode': 'LBN',
			'name': 'Labuan',
		},
		'MLK': {
			'stateCode': 'MLK',
			'name': 'Malacca (Melaka)',
		},
		'NSN': {
			'stateCode': 'NSN',
			'name': 'Negeri Sembilan',
		},
		'PHG': {
			'stateCode': 'PHG',
			'name': 'Pahang',
		},
		'PNG': {
			'stateCode': 'PNG',
			'name': 'Penang (Pulau Pinang)',
		},
		'PRK': {
			'stateCode': 'PRK',
			'name': 'Perak',
		},
		'PLS': {
			'stateCode': 'PLS',
			'name': 'Perlis',
		},
		'SBH': {
			'stateCode': 'SBH',
			'name': 'Sabah',
		},
		'SWK': {
			'stateCode': 'SWK',
			'name': 'Sarawak',
		},
		'SGR': {
			'stateCode': 'SGR',
			'name': 'Selangor',
		},
		'TRG': {
			'stateCode': 'TRG',
			'name': 'Terengganu',
		},
		'PJY': {
			'stateCode': 'PJY',
			'name': 'Putrajaya',
		},
		'KUL': {
			'stateCode': 'KUL',
			'name': 'Kuala Lumpur',
		},
	},
	'MZ': {
		'MZP': {
			'stateCode': 'MZP',
			'name': 'Cabo Delgado',
		},
		'MZG': {
			'stateCode': 'MZG',
			'name': 'Gaza',
		},
		'MZI': {
			'stateCode': 'MZI',
			'name': 'Inhambane',
		},
		'MZB': {
			'stateCode': 'MZB',
			'name': 'Manica',
		},
		'MZL': {
			'stateCode': 'MZL',
			'name': 'Maputo Province',
		},
		'MZMPM': {
			'stateCode': 'MZMPM',
			'name': 'Maputo',
		},
		'MZN': {
			'stateCode': 'MZN',
			'name': 'Nampula',
		},
		'MZA': {
			'stateCode': 'MZA',
			'name': 'Niassa',
		},
		'MZS': {
			'stateCode': 'MZS',
			'name': 'Sofala',
		},
		'MZT': {
			'stateCode': 'MZT',
			'name': 'Tete',
		},
		'MZQ': {
			'stateCode': 'MZQ',
			'name': 'Zambézia',
		},
	},
	'NA': {
		'ER': {
			'stateCode': 'ER',
			'name': 'Erongo',
		},
		'HA': {
			'stateCode': 'HA',
			'name': 'Hardap',
		},
		'KA': {
			'stateCode': 'KA',
			'name': 'Karas',
		},
		'KE': {
			'stateCode': 'KE',
			'name': 'Kavango East',
		},
		'KW': {
			'stateCode': 'KW',
			'name': 'Kavango West',
		},
		'KH': {
			'stateCode': 'KH',
			'name': 'Khomas',
		},
		'KU': {
			'stateCode': 'KU',
			'name': 'Kunene',
		},
		'OW': {
			'stateCode': 'OW',
			'name': 'Ohangwena',
		},
		'OH': {
			'stateCode': 'OH',
			'name': 'Omaheke',
		},
		'OS': {
			'stateCode': 'OS',
			'name': 'Omusati',
		},
		'ON': {
			'stateCode': 'ON',
			'name': 'Oshana',
		},
		'OT': {
			'stateCode': 'OT',
			'name': 'Oshikoto',
		},
		'OD': {
			'stateCode': 'OD',
			'name': 'Otjozondjupa',
		},
		'CA': {
			'stateCode': 'CA',
			'name': 'Zambezi',
		},
	},
	'NG': {
		'AB': {
			'stateCode': 'AB',
			'name': 'Abia',
		},
		'FC': {
			'stateCode': 'FC',
			'name': 'Abuja',
		},
		'AD': {
			'stateCode': 'AD',
			'name': 'Adamawa',
		},
		'AK': {
			'stateCode': 'AK',
			'name': 'Akwa Ibom',
		},
		'AN': {
			'stateCode': 'AN',
			'name': 'Anambra',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Bauchi',
		},
		'BY': {
			'stateCode': 'BY',
			'name': 'Bayelsa',
		},
		'BE': {
			'stateCode': 'BE',
			'name': 'Benue',
		},
		'BO': {
			'stateCode': 'BO',
			'name': 'Borno',
		},
		'CR': {
			'stateCode': 'CR',
			'name': 'Cross River',
		},
		'DE': {
			'stateCode': 'DE',
			'name': 'Delta',
		},
		'EB': {
			'stateCode': 'EB',
			'name': 'Ebonyi',
		},
		'ED': {
			'stateCode': 'ED',
			'name': 'Edo',
		},
		'EK': {
			'stateCode': 'EK',
			'name': 'Ekiti',
		},
		'EN': {
			'stateCode': 'EN',
			'name': 'Enugu',
		},
		'GO': {
			'stateCode': 'GO',
			'name': 'Gombe',
		},
		'IM': {
			'stateCode': 'IM',
			'name': 'Imo',
		},
		'JI': {
			'stateCode': 'JI',
			'name': 'Jigawa',
		},
		'KD': {
			'stateCode': 'KD',
			'name': 'Kaduna',
		},
		'KN': {
			'stateCode': 'KN',
			'name': 'Kano',
		},
		'KT': {
			'stateCode': 'KT',
			'name': 'Katsina',
		},
		'KE': {
			'stateCode': 'KE',
			'name': 'Kebbi',
		},
		'KO': {
			'stateCode': 'KO',
			'name': 'Kogi',
		},
		'KW': {
			'stateCode': 'KW',
			'name': 'Kwara',
		},
		'LA': {
			'stateCode': 'LA',
			'name': 'Lagos',
		},
		'NA': {
			'stateCode': 'NA',
			'name': 'Nasarawa',
		},
		'NI': {
			'stateCode': 'NI',
			'name': 'Niger',
		},
		'OG': {
			'stateCode': 'OG',
			'name': 'Ogun',
		},
		'ON': {
			'stateCode': 'ON',
			'name': 'Ondo',
		},
		'OS': {
			'stateCode': 'OS',
			'name': 'Osun',
		},
		'OY': {
			'stateCode': 'OY',
			'name': 'Oyo',
		},
		'PL': {
			'stateCode': 'PL',
			'name': 'Plateau',
		},
		'RI': {
			'stateCode': 'RI',
			'name': 'Rivers',
		},
		'SO': {
			'stateCode': 'SO',
			'name': 'Sokoto',
		},
		'TA': {
			'stateCode': 'TA',
			'name': 'Taraba',
		},
		'YO': {
			'stateCode': 'YO',
			'name': 'Yobe',
		},
		'ZA': {
			'stateCode': 'ZA',
			'name': 'Zamfara',
		},
	},
	'NL': {},
	'NO': {},
	'NP': {
		'BAG': {
			'stateCode': 'BAG',
			'name': 'Bagmati',
		},
		'BHE': {
			'stateCode': 'BHE',
			'name': 'Bheri',
		},
		'DHA': {
			'stateCode': 'DHA',
			'name': 'Dhaulagiri',
		},
		'GAN': {
			'stateCode': 'GAN',
			'name': 'Gandaki',
		},
		'JAN': {
			'stateCode': 'JAN',
			'name': 'Janakpur',
		},
		'KAR': {
			'stateCode': 'KAR',
			'name': 'Karnali',
		},
		'KOS': {
			'stateCode': 'KOS',
			'name': 'Koshi',
		},
		'LUM': {
			'stateCode': 'LUM',
			'name': 'Lumbini',
		},
		'MAH': {
			'stateCode': 'MAH',
			'name': 'Mahakali',
		},
		'MEC': {
			'stateCode': 'MEC',
			'name': 'Mechi',
		},
		'NAR': {
			'stateCode': 'NAR',
			'name': 'Narayani',
		},
		'RAP': {
			'stateCode': 'RAP',
			'name': 'Rapti',
		},
		'SAG': {
			'stateCode': 'SAG',
			'name': 'Sagarmatha',
		},
		'SET': {
			'stateCode': 'SET',
			'name': 'Seti',
		},
	},
	'NI': {
		'NI-AN': {
			'stateCode': 'NI-AN',
			'name': 'Atlántico Norte',
		},
		'NI-AS': {
			'stateCode': 'NI-AS',
			'name': 'Atlántico Sur',
		},
		'NI-BO': {
			'stateCode': 'NI-BO',
			'name': 'Boaco',
		},
		'NI-CA': {
			'stateCode': 'NI-CA',
			'name': 'Carazo',
		},
		'NI-CI': {
			'stateCode': 'NI-CI',
			'name': 'Chinandega',
		},
		'NI-CO': {
			'stateCode': 'NI-CO',
			'name': 'Chontales',
		},
		'NI-ES': {
			'stateCode': 'NI-ES',
			'name': 'Estelí',
		},
		'NI-GR': {
			'stateCode': 'NI-GR',
			'name': 'Granada',
		},
		'NI-JI': {
			'stateCode': 'NI-JI',
			'name': 'Jinotega',
		},
		'NI-LE': {
			'stateCode': 'NI-LE',
			'name': 'León',
		},
		'NI-MD': {
			'stateCode': 'NI-MD',
			'name': 'Madriz',
		},
		'NI-MN': {
			'stateCode': 'NI-MN',
			'name': 'Managua',
		},
		'NI-MS': {
			'stateCode': 'NI-MS',
			'name': 'Masaya',
		},
		'NI-MT': {
			'stateCode': 'NI-MT',
			'name': 'Matagalpa',
		},
		'NI-NS': {
			'stateCode': 'NI-NS',
			'name': 'Nueva Segovia',
		},
		'NI-RI': {
			'stateCode': 'NI-RI',
			'name': 'Rivas',
		},
		'NI-SJ': {
			'stateCode': 'NI-SJ',
			'name': 'Río San Juan',
		},
	},
	'NZ': {
		'NL': {
			'stateCode': 'NL',
			'name': 'Northland',
		},
		'AK': {
			'stateCode': 'AK',
			'name': 'Auckland',
		},
		'WA': {
			'stateCode': 'WA',
			'name': 'Waikato',
		},
		'BP': {
			'stateCode': 'BP',
			'name': 'Bay of Plenty',
		},
		'TK': {
			'stateCode': 'TK',
			'name': 'Taranaki',
		},
		'GI': {
			'stateCode': 'GI',
			'name': 'Gisborne',
		},
		'HB': {
			'stateCode': 'HB',
			'name': 'Hawke’s Bay',
		},
		'MW': {
			'stateCode': 'MW',
			'name': 'Manawatu-Wanganui',
		},
		'WE': {
			'stateCode': 'WE',
			'name': 'Wellington',
		},
		'NS': {
			'stateCode': 'NS',
			'name': 'Nelson',
		},
		'MB': {
			'stateCode': 'MB',
			'name': 'Marlborough',
		},
		'TM': {
			'stateCode': 'TM',
			'name': 'Tasman',
		},
		'WC': {
			'stateCode': 'WC',
			'name': 'West Coast',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Canterbury',
		},
		'OT': {
			'stateCode': 'OT',
			'name': 'Otago',
		},
		'SL': {
			'stateCode': 'SL',
			'name': 'Southland',
		},
	},
	'PA': {
		'PA-1': {
			'stateCode': 'PA-1',
			'name': 'Bocas del Toro',
		},
		'PA-2': {
			'stateCode': 'PA-2',
			'name': 'Coclé',
		},
		'PA-3': {
			'stateCode': 'PA-3',
			'name': 'Colón',
		},
		'PA-4': {
			'stateCode': 'PA-4',
			'name': 'Chiriquí',
		},
		'PA-5': {
			'stateCode': 'PA-5',
			'name': 'Darién',
		},
		'PA-6': {
			'stateCode': 'PA-6',
			'name': 'Herrera',
		},
		'PA-7': {
			'stateCode': 'PA-7',
			'name': 'Los Santos',
		},
		'PA-8': {
			'stateCode': 'PA-8',
			'name': 'Panamá',
		},
		'PA-9': {
			'stateCode': 'PA-9',
			'name': 'Veraguas',
		},
		'PA-10': {
			'stateCode': 'PA-10',
			'name': 'West Panamá',
		},
		'PA-EM': {
			'stateCode': 'PA-EM',
			'name': 'Emberá',
		},
		'PA-KY': {
			'stateCode': 'PA-KY',
			'name': 'Guna Yala',
		},
		'PA-NB': {
			'stateCode': 'PA-NB',
			'name': 'Ngöbe-Buglé',
		},
	},
	'PE': {
		'CAL': {
			'stateCode': 'CAL',
			'name': 'El Callao',
		},
		'LMA': {
			'stateCode': 'LMA',
			'name': 'Municipalidad Metropolitana de Lima',
		},
		'AMA': {
			'stateCode': 'AMA',
			'name': 'Amazonas',
		},
		'ANC': {
			'stateCode': 'ANC',
			'name': 'Ancash',
		},
		'APU': {
			'stateCode': 'APU',
			'name': 'Apurímac',
		},
		'ARE': {
			'stateCode': 'ARE',
			'name': 'Arequipa',
		},
		'AYA': {
			'stateCode': 'AYA',
			'name': 'Ayacucho',
		},
		'CAJ': {
			'stateCode': 'CAJ',
			'name': 'Cajamarca',
		},
		'CUS': {
			'stateCode': 'CUS',
			'name': 'Cusco',
		},
		'HUV': {
			'stateCode': 'HUV',
			'name': 'Huancavelica',
		},
		'HUC': {
			'stateCode': 'HUC',
			'name': 'Huánuco',
		},
		'ICA': {
			'stateCode': 'ICA',
			'name': 'Ica',
		},
		'JUN': {
			'stateCode': 'JUN',
			'name': 'Junín',
		},
		'LAL': {
			'stateCode': 'LAL',
			'name': 'La Libertad',
		},
		'LAM': {
			'stateCode': 'LAM',
			'name': 'Lambayeque',
		},
		'LIM': {
			'stateCode': 'LIM',
			'name': 'Lima',
		},
		'LOR': {
			'stateCode': 'LOR',
			'name': 'Loreto',
		},
		'MDD': {
			'stateCode': 'MDD',
			'name': 'Madre de Dios',
		},
		'MOQ': {
			'stateCode': 'MOQ',
			'name': 'Moquegua',
		},
		'PAS': {
			'stateCode': 'PAS',
			'name': 'Pasco',
		},
		'PIU': {
			'stateCode': 'PIU',
			'name': 'Piura',
		},
		'PUN': {
			'stateCode': 'PUN',
			'name': 'Puno',
		},
		'SAM': {
			'stateCode': 'SAM',
			'name': 'San Martín',
		},
		'TAC': {
			'stateCode': 'TAC',
			'name': 'Tacna',
		},
		'TUM': {
			'stateCode': 'TUM',
			'name': 'Tumbes',
		},
		'UCA': {
			'stateCode': 'UCA',
			'name': 'Ucayali',
		},
	},
	'PH': {
		'ABR': {
			'stateCode': 'ABR',
			'name': 'Abra',
		},
		'AGN': {
			'stateCode': 'AGN',
			'name': 'Agusan del Norte',
		},
		'AGS': {
			'stateCode': 'AGS',
			'name': 'Agusan del Sur',
		},
		'AKL': {
			'stateCode': 'AKL',
			'name': 'Aklan',
		},
		'ALB': {
			'stateCode': 'ALB',
			'name': 'Albay',
		},
		'ANT': {
			'stateCode': 'ANT',
			'name': 'Antique',
		},
		'APA': {
			'stateCode': 'APA',
			'name': 'Apayao',
		},
		'AUR': {
			'stateCode': 'AUR',
			'name': 'Aurora',
		},
		'BAS': {
			'stateCode': 'BAS',
			'name': 'Basilan',
		},
		'BAN': {
			'stateCode': 'BAN',
			'name': 'Bataan',
		},
		'BTN': {
			'stateCode': 'BTN',
			'name': 'Batanes',
		},
		'BTG': {
			'stateCode': 'BTG',
			'name': 'Batangas',
		},
		'BEN': {
			'stateCode': 'BEN',
			'name': 'Benguet',
		},
		'BIL': {
			'stateCode': 'BIL',
			'name': 'Biliran',
		},
		'BOH': {
			'stateCode': 'BOH',
			'name': 'Bohol',
		},
		'BUK': {
			'stateCode': 'BUK',
			'name': 'Bukidnon',
		},
		'BUL': {
			'stateCode': 'BUL',
			'name': 'Bulacan',
		},
		'CAG': {
			'stateCode': 'CAG',
			'name': 'Cagayan',
		},
		'CAN': {
			'stateCode': 'CAN',
			'name': 'Camarines Norte',
		},
		'CAS': {
			'stateCode': 'CAS',
			'name': 'Camarines Sur',
		},
		'CAM': {
			'stateCode': 'CAM',
			'name': 'Camiguin',
		},
		'CAP': {
			'stateCode': 'CAP',
			'name': 'Capiz',
		},
		'CAT': {
			'stateCode': 'CAT',
			'name': 'Catanduanes',
		},
		'CAV': {
			'stateCode': 'CAV',
			'name': 'Cavite',
		},
		'CEB': {
			'stateCode': 'CEB',
			'name': 'Cebu',
		},
		'COM': {
			'stateCode': 'COM',
			'name': 'Compostela Valley',
		},
		'NCO': {
			'stateCode': 'NCO',
			'name': 'Cotabato',
		},
		'DAV': {
			'stateCode': 'DAV',
			'name': 'Davao del Norte',
		},
		'DAS': {
			'stateCode': 'DAS',
			'name': 'Davao del Sur',
		},
		'DAC': {
			'stateCode': 'DAC',
			'name': 'Davao Occidental',
		},
		'DAO': {
			'stateCode': 'DAO',
			'name': 'Davao Oriental',
		},
		'DIN': {
			'stateCode': 'DIN',
			'name': 'Dinagat Islands',
		},
		'EAS': {
			'stateCode': 'EAS',
			'name': 'Eastern Samar',
		},
		'GUI': {
			'stateCode': 'GUI',
			'name': 'Guimaras',
		},
		'IFU': {
			'stateCode': 'IFU',
			'name': 'Ifugao',
		},
		'ILN': {
			'stateCode': 'ILN',
			'name': 'Ilocos Norte',
		},
		'ILS': {
			'stateCode': 'ILS',
			'name': 'Ilocos Sur',
		},
		'ILI': {
			'stateCode': 'ILI',
			'name': 'Iloilo',
		},
		'ISA': {
			'stateCode': 'ISA',
			'name': 'Isabela',
		},
		'KAL': {
			'stateCode': 'KAL',
			'name': 'Kalinga',
		},
		'LUN': {
			'stateCode': 'LUN',
			'name': 'La Union',
		},
		'LAG': {
			'stateCode': 'LAG',
			'name': 'Laguna',
		},
		'LAN': {
			'stateCode': 'LAN',
			'name': 'Lanao del Norte',
		},
		'LAS': {
			'stateCode': 'LAS',
			'name': 'Lanao del Sur',
		},
		'LEY': {
			'stateCode': 'LEY',
			'name': 'Leyte',
		},
		'MAG': {
			'stateCode': 'MAG',
			'name': 'Maguindanao',
		},
		'MAD': {
			'stateCode': 'MAD',
			'name': 'Marinduque',
		},
		'MAS': {
			'stateCode': 'MAS',
			'name': 'Masbate',
		},
		'MSC': {
			'stateCode': 'MSC',
			'name': 'Misamis Occidental',
		},
		'MSR': {
			'stateCode': 'MSR',
			'name': 'Misamis Oriental',
		},
		'MOU': {
			'stateCode': 'MOU',
			'name': 'Mountain Province',
		},
		'NEC': {
			'stateCode': 'NEC',
			'name': 'Negros Occidental',
		},
		'NER': {
			'stateCode': 'NER',
			'name': 'Negros Oriental',
		},
		'NSA': {
			'stateCode': 'NSA',
			'name': 'Northern Samar',
		},
		'NUE': {
			'stateCode': 'NUE',
			'name': 'Nueva Ecija',
		},
		'NUV': {
			'stateCode': 'NUV',
			'name': 'Nueva Vizcaya',
		},
		'MDC': {
			'stateCode': 'MDC',
			'name': 'Occidental Mindoro',
		},
		'MDR': {
			'stateCode': 'MDR',
			'name': 'Oriental Mindoro',
		},
		'PLW': {
			'stateCode': 'PLW',
			'name': 'Palawan',
		},
		'PAM': {
			'stateCode': 'PAM',
			'name': 'Pampanga',
		},
		'PAN': {
			'stateCode': 'PAN',
			'name': 'Pangasinan',
		},
		'QUE': {
			'stateCode': 'QUE',
			'name': 'Quezon',
		},
		'QUI': {
			'stateCode': 'QUI',
			'name': 'Quirino',
		},
		'RIZ': {
			'stateCode': 'RIZ',
			'name': 'Rizal',
		},
		'ROM': {
			'stateCode': 'ROM',
			'name': 'Romblon',
		},
		'WSA': {
			'stateCode': 'WSA',
			'name': 'Samar',
		},
		'SAR': {
			'stateCode': 'SAR',
			'name': 'Sarangani',
		},
		'SIQ': {
			'stateCode': 'SIQ',
			'name': 'Siquijor',
		},
		'SOR': {
			'stateCode': 'SOR',
			'name': 'Sorsogon',
		},
		'SCO': {
			'stateCode': 'SCO',
			'name': 'South Cotabato',
		},
		'SLE': {
			'stateCode': 'SLE',
			'name': 'Southern Leyte',
		},
		'SUK': {
			'stateCode': 'SUK',
			'name': 'Sultan Kudarat',
		},
		'SLU': {
			'stateCode': 'SLU',
			'name': 'Sulu',
		},
		'SUN': {
			'stateCode': 'SUN',
			'name': 'Surigao del Norte',
		},
		'SUR': {
			'stateCode': 'SUR',
			'name': 'Surigao del Sur',
		},
		'TAR': {
			'stateCode': 'TAR',
			'name': 'Tarlac',
		},
		'TAW': {
			'stateCode': 'TAW',
			'name': 'Tawi-Tawi',
		},
		'ZMB': {
			'stateCode': 'ZMB',
			'name': 'Zambales',
		},
		'ZAN': {
			'stateCode': 'ZAN',
			'name': 'Zamboanga del Norte',
		},
		'ZAS': {
			'stateCode': 'ZAS',
			'name': 'Zamboanga del Sur',
		},
		'ZSI': {
			'stateCode': 'ZSI',
			'name': 'Zamboanga Sibugay',
		},
		'00': {
			'stateCode': '00',
			'name': 'Metro Manila',
		},
	},
	'PK': {
		'JK': {
			'stateCode': 'JK',
			'name': 'Azad Kashmir',
		},
		'BA': {
			'stateCode': 'BA',
			'name': 'Balochistan',
		},
		'TA': {
			'stateCode': 'TA',
			'name': 'FATA',
		},
		'GB': {
			'stateCode': 'GB',
			'name': 'Gilgit Baltistan',
		},
		'IS': {
			'stateCode': 'IS',
			'name': 'Islamabad Capital Territory',
		},
		'KP': {
			'stateCode': 'KP',
			'name': 'Khyber Pakhtunkhwa',
		},
		'PB': {
			'stateCode': 'PB',
			'name': 'Punjab',
		},
		'SD': {
			'stateCode': 'SD',
			'name': 'Sindh',
		},
	},
	'PL': {},
	'PR': {},
	'PT': {},
	'PY': {
		'PY-ASU': {
			'stateCode': 'PY-ASU',
			'name': 'Asunción',
		},
		'PY-1': {
			'stateCode': 'PY-1',
			'name': 'Concepción',
		},
		'PY-2': {
			'stateCode': 'PY-2',
			'name': 'San Pedro',
		},
		'PY-3': {
			'stateCode': 'PY-3',
			'name': 'Cordillera',
		},
		'PY-4': {
			'stateCode': 'PY-4',
			'name': 'Guairá',
		},
		'PY-5': {
			'stateCode': 'PY-5',
			'name': 'Caaguazú',
		},
		'PY-6': {
			'stateCode': 'PY-6',
			'name': 'Caazapá',
		},
		'PY-7': {
			'stateCode': 'PY-7',
			'name': 'Itapúa',
		},
		'PY-8': {
			'stateCode': 'PY-8',
			'name': 'Misiones',
		},
		'PY-9': {
			'stateCode': 'PY-9',
			'name': 'Paraguarí',
		},
		'PY-10': {
			'stateCode': 'PY-10',
			'name': 'Alto Paraná',
		},
		'PY-11': {
			'stateCode': 'PY-11',
			'name': 'Central',
		},
		'PY-12': {
			'stateCode': 'PY-12',
			'name': 'Ñeembucú',
		},
		'PY-13': {
			'stateCode': 'PY-13',
			'name': 'Amambay',
		},
		'PY-14': {
			'stateCode': 'PY-14',
			'name': 'Canindeyú',
		},
		'PY-15': {
			'stateCode': 'PY-15',
			'name': 'Presidente Hayes',
		},
		'PY-16': {
			'stateCode': 'PY-16',
			'name': 'Alto Paraguay',
		},
		'PY-17': {
			'stateCode': 'PY-17',
			'name': 'Boquerón',
		},
	},
	'RE': {},
	'RO': {
		'AB': {
			'stateCode': 'AB',
			'name': 'Alba',
		},
		'AR': {
			'stateCode': 'AR',
			'name': 'Arad',
		},
		'AG': {
			'stateCode': 'AG',
			'name': 'Argeș',
		},
		'BC': {
			'stateCode': 'BC',
			'name': 'Bacău',
		},
		'BH': {
			'stateCode': 'BH',
			'name': 'Bihor',
		},
		'BN': {
			'stateCode': 'BN',
			'name': 'Bistrița-Năsăud',
		},
		'BT': {
			'stateCode': 'BT',
			'name': 'Botoșani',
		},
		'BR': {
			'stateCode': 'BR',
			'name': 'Brăila',
		},
		'BV': {
			'stateCode': 'BV',
			'name': 'Brașov',
		},
		'B': {
			'stateCode': 'B',
			'name': 'București',
		},
		'BZ': {
			'stateCode': 'BZ',
			'name': 'Buzău',
		},
		'CL': {
			'stateCode': 'CL',
			'name': 'Călărași',
		},
		'CS': {
			'stateCode': 'CS',
			'name': 'Caraș-Severin',
		},
		'CJ': {
			'stateCode': 'CJ',
			'name': 'Cluj',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Constanța',
		},
		'CV': {
			'stateCode': 'CV',
			'name': 'Covasna',
		},
		'DB': {
			'stateCode': 'DB',
			'name': 'Dâmbovița',
		},
		'DJ': {
			'stateCode': 'DJ',
			'name': 'Dolj',
		},
		'GL': {
			'stateCode': 'GL',
			'name': 'Galați',
		},
		'GR': {
			'stateCode': 'GR',
			'name': 'Giurgiu',
		},
		'GJ': {
			'stateCode': 'GJ',
			'name': 'Gorj',
		},
		'HR': {
			'stateCode': 'HR',
			'name': 'Harghita',
		},
		'HD': {
			'stateCode': 'HD',
			'name': 'Hunedoara',
		},
		'IL': {
			'stateCode': 'IL',
			'name': 'Ialomița',
		},
		'IS': {
			'stateCode': 'IS',
			'name': 'Iași',
		},
		'IF': {
			'stateCode': 'IF',
			'name': 'Ilfov',
		},
		'MM': {
			'stateCode': 'MM',
			'name': 'Maramureș',
		},
		'MH': {
			'stateCode': 'MH',
			'name': 'Mehedinți',
		},
		'MS': {
			'stateCode': 'MS',
			'name': 'Mureș',
		},
		'NT': {
			'stateCode': 'NT',
			'name': 'Neamț',
		},
		'OT': {
			'stateCode': 'OT',
			'name': 'Olt',
		},
		'PH': {
			'stateCode': 'PH',
			'name': 'Prahova',
		},
		'SJ': {
			'stateCode': 'SJ',
			'name': 'Sălaj',
		},
		'SM': {
			'stateCode': 'SM',
			'name': 'Satu Mare',
		},
		'SB': {
			'stateCode': 'SB',
			'name': 'Sibiu',
		},
		'SV': {
			'stateCode': 'SV',
			'name': 'Suceava',
		},
		'TR': {
			'stateCode': 'TR',
			'name': 'Teleorman',
		},
		'TM': {
			'stateCode': 'TM',
			'name': 'Timiș',
		},
		'TL': {
			'stateCode': 'TL',
			'name': 'Tulcea',
		},
		'VL': {
			'stateCode': 'VL',
			'name': 'Vâlcea',
		},
		'VS': {
			'stateCode': 'VS',
			'name': 'Vaslui',
		},
		'VN': {
			'stateCode': 'VN',
			'name': 'Vrancea',
		},
	},
	'SG': {},
	'SK': {},
	'SI': {},
	'SV': {
		'SV-AH': {
			'stateCode': 'SV-AH',
			'name': 'Ahuachapán',
		},
		'SV-CA': {
			'stateCode': 'SV-CA',
			'name': 'Cabañas',
		},
		'SV-CH': {
			'stateCode': 'SV-CH',
			'name': 'Chalatenango',
		},
		'SV-CU': {
			'stateCode': 'SV-CU',
			'name': 'Cuscatlán',
		},
		'SV-LI': {
			'stateCode': 'SV-LI',
			'name': 'La Libertad',
		},
		'SV-MO': {
			'stateCode': 'SV-MO',
			'name': 'Morazán',
		},
		'SV-PA': {
			'stateCode': 'SV-PA',
			'name': 'La Paz',
		},
		'SV-SA': {
			'stateCode': 'SV-SA',
			'name': 'Santa Ana',
		},
		'SV-SM': {
			'stateCode': 'SV-SM',
			'name': 'San Miguel',
		},
		'SV-SO': {
			'stateCode': 'SV-SO',
			'name': 'Sonsonate',
		},
		'SV-SS': {
			'stateCode': 'SV-SS',
			'name': 'San Salvador',
		},
		'SV-SV': {
			'stateCode': 'SV-SV',
			'name': 'San Vicente',
		},
		'SV-UN': {
			'stateCode': 'SV-UN',
			'name': 'La Unión',
		},
		'SV-US': {
			'stateCode': 'SV-US',
			'name': 'Usulután',
		},
	},
	'TH': {
		'TH-37': {
			'stateCode': 'TH-37',
			'name': 'Amnat Charoen',
		},
		'TH-15': {
			'stateCode': 'TH-15',
			'name': 'Ang Thong',
		},
		'TH-14': {
			'stateCode': 'TH-14',
			'name': 'Ayutthaya',
		},
		'TH-10': {
			'stateCode': 'TH-10',
			'name': 'Bangkok',
		},
		'TH-38': {
			'stateCode': 'TH-38',
			'name': 'Bueng Kan',
		},
		'TH-31': {
			'stateCode': 'TH-31',
			'name': 'Buri Ram',
		},
		'TH-24': {
			'stateCode': 'TH-24',
			'name': 'Chachoengsao',
		},
		'TH-18': {
			'stateCode': 'TH-18',
			'name': 'Chai Nat',
		},
		'TH-36': {
			'stateCode': 'TH-36',
			'name': 'Chaiyaphum',
		},
		'TH-22': {
			'stateCode': 'TH-22',
			'name': 'Chanthaburi',
		},
		'TH-50': {
			'stateCode': 'TH-50',
			'name': 'Chiang Mai',
		},
		'TH-57': {
			'stateCode': 'TH-57',
			'name': 'Chiang Rai',
		},
		'TH-20': {
			'stateCode': 'TH-20',
			'name': 'Chonburi',
		},
		'TH-86': {
			'stateCode': 'TH-86',
			'name': 'Chumphon',
		},
		'TH-46': {
			'stateCode': 'TH-46',
			'name': 'Kalasin',
		},
		'TH-62': {
			'stateCode': 'TH-62',
			'name': 'Kamphaeng Phet',
		},
		'TH-71': {
			'stateCode': 'TH-71',
			'name': 'Kanchanaburi',
		},
		'TH-40': {
			'stateCode': 'TH-40',
			'name': 'Khon Kaen',
		},
		'TH-81': {
			'stateCode': 'TH-81',
			'name': 'Krabi',
		},
		'TH-52': {
			'stateCode': 'TH-52',
			'name': 'Lampang',
		},
		'TH-51': {
			'stateCode': 'TH-51',
			'name': 'Lamphun',
		},
		'TH-42': {
			'stateCode': 'TH-42',
			'name': 'Loei',
		},
		'TH-16': {
			'stateCode': 'TH-16',
			'name': 'Lopburi',
		},
		'TH-58': {
			'stateCode': 'TH-58',
			'name': 'Mae Hong Son',
		},
		'TH-44': {
			'stateCode': 'TH-44',
			'name': 'Maha Sarakham',
		},
		'TH-49': {
			'stateCode': 'TH-49',
			'name': 'Mukdahan',
		},
		'TH-26': {
			'stateCode': 'TH-26',
			'name': 'Nakhon Nayok',
		},
		'TH-73': {
			'stateCode': 'TH-73',
			'name': 'Nakhon Pathom',
		},
		'TH-48': {
			'stateCode': 'TH-48',
			'name': 'Nakhon Phanom',
		},
		'TH-30': {
			'stateCode': 'TH-30',
			'name': 'Nakhon Ratchasima',
		},
		'TH-60': {
			'stateCode': 'TH-60',
			'name': 'Nakhon Sawan',
		},
		'TH-80': {
			'stateCode': 'TH-80',
			'name': 'Nakhon Si Thammarat',
		},
		'TH-55': {
			'stateCode': 'TH-55',
			'name': 'Nan',
		},
		'TH-96': {
			'stateCode': 'TH-96',
			'name': 'Narathiwat',
		},
		'TH-39': {
			'stateCode': 'TH-39',
			'name': 'Nong Bua Lam Phu',
		},
		'TH-43': {
			'stateCode': 'TH-43',
			'name': 'Nong Khai',
		},
		'TH-12': {
			'stateCode': 'TH-12',
			'name': 'Nonthaburi',
		},
		'TH-13': {
			'stateCode': 'TH-13',
			'name': 'Pathum Thani',
		},
		'TH-94': {
			'stateCode': 'TH-94',
			'name': 'Pattani',
		},
		'TH-82': {
			'stateCode': 'TH-82',
			'name': 'Phang Nga',
		},
		'TH-93': {
			'stateCode': 'TH-93',
			'name': 'Phatthalung',
		},
		'TH-56': {
			'stateCode': 'TH-56',
			'name': 'Phayao',
		},
		'TH-67': {
			'stateCode': 'TH-67',
			'name': 'Phetchabun',
		},
		'TH-76': {
			'stateCode': 'TH-76',
			'name': 'Phetchaburi',
		},
		'TH-66': {
			'stateCode': 'TH-66',
			'name': 'Phichit',
		},
		'TH-65': {
			'stateCode': 'TH-65',
			'name': 'Phitsanulok',
		},
		'TH-54': {
			'stateCode': 'TH-54',
			'name': 'Phrae',
		},
		'TH-83': {
			'stateCode': 'TH-83',
			'name': 'Phuket',
		},
		'TH-25': {
			'stateCode': 'TH-25',
			'name': 'Prachin Buri',
		},
		'TH-77': {
			'stateCode': 'TH-77',
			'name': 'Prachuap Khiri Khan',
		},
		'TH-85': {
			'stateCode': 'TH-85',
			'name': 'Ranong',
		},
		'TH-70': {
			'stateCode': 'TH-70',
			'name': 'Ratchaburi',
		},
		'TH-21': {
			'stateCode': 'TH-21',
			'name': 'Rayong',
		},
		'TH-45': {
			'stateCode': 'TH-45',
			'name': 'Roi Et',
		},
		'TH-27': {
			'stateCode': 'TH-27',
			'name': 'Sa Kaeo',
		},
		'TH-47': {
			'stateCode': 'TH-47',
			'name': 'Sakon Nakhon',
		},
		'TH-11': {
			'stateCode': 'TH-11',
			'name': 'Samut Prakan',
		},
		'TH-74': {
			'stateCode': 'TH-74',
			'name': 'Samut Sakhon',
		},
		'TH-75': {
			'stateCode': 'TH-75',
			'name': 'Samut Songkhram',
		},
		'TH-19': {
			'stateCode': 'TH-19',
			'name': 'Saraburi',
		},
		'TH-91': {
			'stateCode': 'TH-91',
			'name': 'Satun',
		},
		'TH-17': {
			'stateCode': 'TH-17',
			'name': 'Sing Buri',
		},
		'TH-33': {
			'stateCode': 'TH-33',
			'name': 'Sisaket',
		},
		'TH-90': {
			'stateCode': 'TH-90',
			'name': 'Songkhla',
		},
		'TH-64': {
			'stateCode': 'TH-64',
			'name': 'Sukhothai',
		},
		'TH-72': {
			'stateCode': 'TH-72',
			'name': 'Suphan Buri',
		},
		'TH-84': {
			'stateCode': 'TH-84',
			'name': 'Surat Thani',
		},
		'TH-32': {
			'stateCode': 'TH-32',
			'name': 'Surin',
		},
		'TH-63': {
			'stateCode': 'TH-63',
			'name': 'Tak',
		},
		'TH-92': {
			'stateCode': 'TH-92',
			'name': 'Trang',
		},
		'TH-23': {
			'stateCode': 'TH-23',
			'name': 'Trat',
		},
		'TH-34': {
			'stateCode': 'TH-34',
			'name': 'Ubon Ratchathani',
		},
		'TH-41': {
			'stateCode': 'TH-41',
			'name': 'Udon Thani',
		},
		'TH-61': {
			'stateCode': 'TH-61',
			'name': 'Uthai Thani',
		},
		'TH-53': {
			'stateCode': 'TH-53',
			'name': 'Uttaradit',
		},
		'TH-95': {
			'stateCode': 'TH-95',
			'name': 'Yala',
		},
		'TH-35': {
			'stateCode': 'TH-35',
			'name': 'Yasothon',
		},
	},
	'TR': {
		'TR01': {
			'stateCode': 'TR01',
			'name': 'Adana',
		},
		'TR02': {
			'stateCode': 'TR02',
			'name': 'Adıyaman',
		},
		'TR03': {
			'stateCode': 'TR03',
			'name': 'Afyon',
		},
		'TR04': {
			'stateCode': 'TR04',
			'name': 'Ağrı',
		},
		'TR05': {
			'stateCode': 'TR05',
			'name': 'Amasya',
		},
		'TR06': {
			'stateCode': 'TR06',
			'name': 'Ankara',
		},
		'TR07': {
			'stateCode': 'TR07',
			'name': 'Antalya',
		},
		'TR08': {
			'stateCode': 'TR08',
			'name': 'Artvin',
		},
		'TR09': {
			'stateCode': 'TR09',
			'name': 'Aydın',
		},
		'TR10': {
			'stateCode': 'TR10',
			'name': 'Balıkesir',
		},
		'TR11': {
			'stateCode': 'TR11',
			'name': 'Bilecik',
		},
		'TR12': {
			'stateCode': 'TR12',
			'name': 'Bingöl',
		},
		'TR13': {
			'stateCode': 'TR13',
			'name': 'Bitlis',
		},
		'TR14': {
			'stateCode': 'TR14',
			'name': 'Bolu',
		},
		'TR15': {
			'stateCode': 'TR15',
			'name': 'Burdur',
		},
		'TR16': {
			'stateCode': 'TR16',
			'name': 'Bursa',
		},
		'TR17': {
			'stateCode': 'TR17',
			'name': 'Çanakkale',
		},
		'TR18': {
			'stateCode': 'TR18',
			'name': 'Çankırı',
		},
		'TR19': {
			'stateCode': 'TR19',
			'name': 'Çorum',
		},
		'TR20': {
			'stateCode': 'TR20',
			'name': 'Denizli',
		},
		'TR21': {
			'stateCode': 'TR21',
			'name': 'Diyarbakır',
		},
		'TR22': {
			'stateCode': 'TR22',
			'name': 'Edirne',
		},
		'TR23': {
			'stateCode': 'TR23',
			'name': 'Elazığ',
		},
		'TR24': {
			'stateCode': 'TR24',
			'name': 'Erzincan',
		},
		'TR25': {
			'stateCode': 'TR25',
			'name': 'Erzurum',
		},
		'TR26': {
			'stateCode': 'TR26',
			'name': 'Eskişehir',
		},
		'TR27': {
			'stateCode': 'TR27',
			'name': 'Gaziantep',
		},
		'TR28': {
			'stateCode': 'TR28',
			'name': 'Giresun',
		},
		'TR29': {
			'stateCode': 'TR29',
			'name': 'Gümüşhane',
		},
		'TR30': {
			'stateCode': 'TR30',
			'name': 'Hakkari',
		},
		'TR31': {
			'stateCode': 'TR31',
			'name': 'Hatay',
		},
		'TR32': {
			'stateCode': 'TR32',
			'name': 'Isparta',
		},
		'TR33': {
			'stateCode': 'TR33',
			'name': 'İçel',
		},
		'TR34': {
			'stateCode': 'TR34',
			'name': 'İstanbul',
		},
		'TR35': {
			'stateCode': 'TR35',
			'name': 'İzmir',
		},
		'TR36': {
			'stateCode': 'TR36',
			'name': 'Kars',
		},
		'TR37': {
			'stateCode': 'TR37',
			'name': 'Kastamonu',
		},
		'TR38': {
			'stateCode': 'TR38',
			'name': 'Kayseri',
		},
		'TR39': {
			'stateCode': 'TR39',
			'name': 'Kırklareli',
		},
		'TR40': {
			'stateCode': 'TR40',
			'name': 'Kırşehir',
		},
		'TR41': {
			'stateCode': 'TR41',
			'name': 'Kocaeli',
		},
		'TR42': {
			'stateCode': 'TR42',
			'name': 'Konya',
		},
		'TR43': {
			'stateCode': 'TR43',
			'name': 'Kütahya',
		},
		'TR44': {
			'stateCode': 'TR44',
			'name': 'Malatya',
		},
		'TR45': {
			'stateCode': 'TR45',
			'name': 'Manisa',
		},
		'TR46': {
			'stateCode': 'TR46',
			'name': 'Kahramanmaraş',
		},
		'TR47': {
			'stateCode': 'TR47',
			'name': 'Mardin',
		},
		'TR48': {
			'stateCode': 'TR48',
			'name': 'Muğla',
		},
		'TR49': {
			'stateCode': 'TR49',
			'name': 'Muş',
		},
		'TR50': {
			'stateCode': 'TR50',
			'name': 'Nevşehir',
		},
		'TR51': {
			'stateCode': 'TR51',
			'name': 'Niğde',
		},
		'TR52': {
			'stateCode': 'TR52',
			'name': 'Ordu',
		},
		'TR53': {
			'stateCode': 'TR53',
			'name': 'Rize',
		},
		'TR54': {
			'stateCode': 'TR54',
			'name': 'Sakarya',
		},
		'TR55': {
			'stateCode': 'TR55',
			'name': 'Samsun',
		},
		'TR56': {
			'stateCode': 'TR56',
			'name': 'Siirt',
		},
		'TR57': {
			'stateCode': 'TR57',
			'name': 'Sinop',
		},
		'TR58': {
			'stateCode': 'TR58',
			'name': 'Sivas',
		},
		'TR59': {
			'stateCode': 'TR59',
			'name': 'Tekirdağ',
		},
		'TR60': {
			'stateCode': 'TR60',
			'name': 'Tokat',
		},
		'TR61': {
			'stateCode': 'TR61',
			'name': 'Trabzon',
		},
		'TR62': {
			'stateCode': 'TR62',
			'name': 'Tunceli',
		},
		'TR63': {
			'stateCode': 'TR63',
			'name': 'Şanlıurfa',
		},
		'TR64': {
			'stateCode': 'TR64',
			'name': 'Uşak',
		},
		'TR65': {
			'stateCode': 'TR65',
			'name': 'Van',
		},
		'TR66': {
			'stateCode': 'TR66',
			'name': 'Yozgat',
		},
		'TR67': {
			'stateCode': 'TR67',
			'name': 'Zonguldak',
		},
		'TR68': {
			'stateCode': 'TR68',
			'name': 'Aksaray',
		},
		'TR69': {
			'stateCode': 'TR69',
			'name': 'Bayburt',
		},
		'TR70': {
			'stateCode': 'TR70',
			'name': 'Karaman',
		},
		'TR71': {
			'stateCode': 'TR71',
			'name': 'Kırıkkale',
		},
		'TR72': {
			'stateCode': 'TR72',
			'name': 'Batman',
		},
		'TR73': {
			'stateCode': 'TR73',
			'name': 'Şırnak',
		},
		'TR74': {
			'stateCode': 'TR74',
			'name': 'Bartın',
		},
		'TR75': {
			'stateCode': 'TR75',
			'name': 'Ardahan',
		},
		'TR76': {
			'stateCode': 'TR76',
			'name': 'Iğdır',
		},
		'TR77': {
			'stateCode': 'TR77',
			'name': 'Yalova',
		},
		'TR78': {
			'stateCode': 'TR78',
			'name': 'Karabük',
		},
		'TR79': {
			'stateCode': 'TR79',
			'name': 'Kilis',
		},
		'TR80': {
			'stateCode': 'TR80',
			'name': 'Osmaniye',
		},
		'TR81': {
			'stateCode': 'TR81',
			'name': 'Düzce',
		},
	},
	'TZ': {
		'TZ01': {
			'stateCode': 'TZ01',
			'name': 'Arusha',
		},
		'TZ02': {
			'stateCode': 'TZ02',
			'name': 'Dar es Salaam',
		},
		'TZ03': {
			'stateCode': 'TZ03',
			'name': 'Dodoma',
		},
		'TZ04': {
			'stateCode': 'TZ04',
			'name': 'Iringa',
		},
		'TZ05': {
			'stateCode': 'TZ05',
			'name': 'Kagera',
		},
		'TZ06': {
			'stateCode': 'TZ06',
			'name': 'Pemba North',
		},
		'TZ07': {
			'stateCode': 'TZ07',
			'name': 'Zanzibar North',
		},
		'TZ08': {
			'stateCode': 'TZ08',
			'name': 'Kigoma',
		},
		'TZ09': {
			'stateCode': 'TZ09',
			'name': 'Kilimanjaro',
		},
		'TZ10': {
			'stateCode': 'TZ10',
			'name': 'Pemba South',
		},
		'TZ11': {
			'stateCode': 'TZ11',
			'name': 'Zanzibar South',
		},
		'TZ12': {
			'stateCode': 'TZ12',
			'name': 'Lindi',
		},
		'TZ13': {
			'stateCode': 'TZ13',
			'name': 'Mara',
		},
		'TZ14': {
			'stateCode': 'TZ14',
			'name': 'Mbeya',
		},
		'TZ15': {
			'stateCode': 'TZ15',
			'name': 'Zanzibar West',
		},
		'TZ16': {
			'stateCode': 'TZ16',
			'name': 'Morogoro',
		},
		'TZ17': {
			'stateCode': 'TZ17',
			'name': 'Mtwara',
		},
		'TZ18': {
			'stateCode': 'TZ18',
			'name': 'Mwanza',
		},
		'TZ19': {
			'stateCode': 'TZ19',
			'name': 'Coast',
		},
		'TZ20': {
			'stateCode': 'TZ20',
			'name': 'Rukwa',
		},
		'TZ21': {
			'stateCode': 'TZ21',
			'name': 'Ruvuma',
		},
		'TZ22': {
			'stateCode': 'TZ22',
			'name': 'Shinyanga',
		},
		'TZ23': {
			'stateCode': 'TZ23',
			'name': 'Singida',
		},
		'TZ24': {
			'stateCode': 'TZ24',
			'name': 'Tabora',
		},
		'TZ25': {
			'stateCode': 'TZ25',
			'name': 'Tanga',
		},
		'TZ26': {
			'stateCode': 'TZ26',
			'name': 'Manyara',
		},
		'TZ27': {
			'stateCode': 'TZ27',
			'name': 'Geita',
		},
		'TZ28': {
			'stateCode': 'TZ28',
			'name': 'Katavi',
		},
		'TZ29': {
			'stateCode': 'TZ29',
			'name': 'Njombe',
		},
		'TZ30': {
			'stateCode': 'TZ30',
			'name': 'Simiyu',
		},
	},
	'LK': {},
	'RS': {
		'RS00': {
			'stateCode': 'RS00',
			'name': 'Belgrade',
		},
		'RS14': {
			'stateCode': 'RS14',
			'name': 'Bor',
		},
		'RS11': {
			'stateCode': 'RS11',
			'name': 'Braničevo',
		},
		'RS02': {
			'stateCode': 'RS02',
			'name': 'Central Banat',
		},
		'RS10': {
			'stateCode': 'RS10',
			'name': 'Danube',
		},
		'RS23': {
			'stateCode': 'RS23',
			'name': 'Jablanica',
		},
		'RS09': {
			'stateCode': 'RS09',
			'name': 'Kolubara',
		},
		'RS08': {
			'stateCode': 'RS08',
			'name': 'Mačva',
		},
		'RS17': {
			'stateCode': 'RS17',
			'name': 'Morava',
		},
		'RS20': {
			'stateCode': 'RS20',
			'name': 'Nišava',
		},
		'RS01': {
			'stateCode': 'RS01',
			'name': 'North Bačka',
		},
		'RS03': {
			'stateCode': 'RS03',
			'name': 'North Banat',
		},
		'RS24': {
			'stateCode': 'RS24',
			'name': 'Pčinja',
		},
		'RS22': {
			'stateCode': 'RS22',
			'name': 'Pirot',
		},
		'RS13': {
			'stateCode': 'RS13',
			'name': 'Pomoravlje',
		},
		'RS19': {
			'stateCode': 'RS19',
			'name': 'Rasina',
		},
		'RS18': {
			'stateCode': 'RS18',
			'name': 'Raška',
		},
		'RS06': {
			'stateCode': 'RS06',
			'name': 'South Bačka',
		},
		'RS04': {
			'stateCode': 'RS04',
			'name': 'South Banat',
		},
		'RS07': {
			'stateCode': 'RS07',
			'name': 'Srem',
		},
		'RS12': {
			'stateCode': 'RS12',
			'name': 'Šumadija',
		},
		'RS21': {
			'stateCode': 'RS21',
			'name': 'Toplica',
		},
		'RS05': {
			'stateCode': 'RS05',
			'name': 'West Bačka',
		},
		'RS15': {
			'stateCode': 'RS15',
			'name': 'Zaječar',
		},
		'RS16': {
			'stateCode': 'RS16',
			'name': 'Zlatibor',
		},
		'RS25': {
			'stateCode': 'RS25',
			'name': 'Kosovo',
		},
		'RS26': {
			'stateCode': 'RS26',
			'name': 'Peć',
		},
		'RS27': {
			'stateCode': 'RS27',
			'name': 'Prizren',
		},
		'RS28': {
			'stateCode': 'RS28',
			'name': 'Kosovska Mitrovica',
		},
		'RS29': {
			'stateCode': 'RS29',
			'name': 'Kosovo-Pomoravlje',
		},
		'RSKM': {
			'stateCode': 'RSKM',
			'name': 'Kosovo-Metohija',
		},
		'RSVO': {
			'stateCode': 'RSVO',
			'name': 'Vojvodina',
		},
	},
	'SE': {},
	'UA': {
		'VN': {
			'stateCode': 'VN',
			'name': 'Vinnytsia Oblast',
		},
		'VL': {
			'stateCode': 'VL',
			'name': 'Volyn Oblast',
		},
		'DP': {
			'stateCode': 'DP',
			'name': 'Dnipropetrovsk Oblast',
		},
		'DT': {
			'stateCode': 'DT',
			'name': 'Donetsk Oblast',
		},
		'ZT': {
			'stateCode': 'ZT',
			'name': 'Zhytomyr Oblast',
		},
		'ZK': {
			'stateCode': 'ZK',
			'name': 'Zakarpattia Oblast',
		},
		'ZP': {
			'stateCode': 'ZP',
			'name': 'Zaporizhzhia Oblast',
		},
		'IF': {
			'stateCode': 'IF',
			'name': 'Ivano-Frankivsk Oblast',
		},
		'KV': {
			'stateCode': 'KV',
			'name': 'Kyiv Oblast',
		},
		'KH': {
			'stateCode': 'KH',
			'name': 'Kirovohrad Oblast',
		},
		'LH': {
			'stateCode': 'LH',
			'name': 'Luhansk Oblast',
		},
		'LV': {
			'stateCode': 'LV',
			'name': 'Lviv Oblast',
		},
		'MY': {
			'stateCode': 'MY',
			'name': 'Mykolaiv Oblast',
		},
		'OD': {
			'stateCode': 'OD',
			'name': 'Odessa Oblast',
		},
		'PL': {
			'stateCode': 'PL',
			'name': 'Poltava Oblast',
		},
		'RV': {
			'stateCode': 'RV',
			'name': 'Rivne Oblast',
		},
		'SM': {
			'stateCode': 'SM',
			'name': 'Sumy Oblast',
		},
		'TP': {
			'stateCode': 'TP',
			'name': 'Ternopil Oblast',
		},
		'KK': {
			'stateCode': 'KK',
			'name': 'Kharkiv Oblast',
		},
		'KS': {
			'stateCode': 'KS',
			'name': 'Kherson Oblast',
		},
		'KM': {
			'stateCode': 'KM',
			'name': 'Khmelnytskyi Oblast',
		},
		'CK': {
			'stateCode': 'CK',
			'name': 'Cherkasy Oblast',
		},
		'CH': {
			'stateCode': 'CH',
			'name': 'Chernihiv Oblast',
		},
		'CV': {
			'stateCode': 'CV',
			'name': 'Chernivtsi Oblast',
		},
	},
	'UG': {
		'UG314': {
			'stateCode': 'UG314',
			'name': 'Abim',
		},
		'UG301': {
			'stateCode': 'UG301',
			'name': 'Adjumani',
		},
		'UG322': {
			'stateCode': 'UG322',
			'name': 'Agago',
		},
		'UG323': {
			'stateCode': 'UG323',
			'name': 'Alebtong',
		},
		'UG315': {
			'stateCode': 'UG315',
			'name': 'Amolatar',
		},
		'UG324': {
			'stateCode': 'UG324',
			'name': 'Amudat',
		},
		'UG216': {
			'stateCode': 'UG216',
			'name': 'Amuria',
		},
		'UG316': {
			'stateCode': 'UG316',
			'name': 'Amuru',
		},
		'UG302': {
			'stateCode': 'UG302',
			'name': 'Apac',
		},
		'UG303': {
			'stateCode': 'UG303',
			'name': 'Arua',
		},
		'UG217': {
			'stateCode': 'UG217',
			'name': 'Budaka',
		},
		'UG218': {
			'stateCode': 'UG218',
			'name': 'Bududa',
		},
		'UG201': {
			'stateCode': 'UG201',
			'name': 'Bugiri',
		},
		'UG235': {
			'stateCode': 'UG235',
			'name': 'Bugweri',
		},
		'UG420': {
			'stateCode': 'UG420',
			'name': 'Buhweju',
		},
		'UG117': {
			'stateCode': 'UG117',
			'name': 'Buikwe',
		},
		'UG219': {
			'stateCode': 'UG219',
			'name': 'Bukedea',
		},
		'UG118': {
			'stateCode': 'UG118',
			'name': 'Bukomansimbi',
		},
		'UG220': {
			'stateCode': 'UG220',
			'name': 'Bukwa',
		},
		'UG225': {
			'stateCode': 'UG225',
			'name': 'Bulambuli',
		},
		'UG416': {
			'stateCode': 'UG416',
			'name': 'Buliisa',
		},
		'UG401': {
			'stateCode': 'UG401',
			'name': 'Bundibugyo',
		},
		'UG430': {
			'stateCode': 'UG430',
			'name': 'Bunyangabu',
		},
		'UG402': {
			'stateCode': 'UG402',
			'name': 'Bushenyi',
		},
		'UG202': {
			'stateCode': 'UG202',
			'name': 'Busia',
		},
		'UG221': {
			'stateCode': 'UG221',
			'name': 'Butaleja',
		},
		'UG119': {
			'stateCode': 'UG119',
			'name': 'Butambala',
		},
		'UG233': {
			'stateCode': 'UG233',
			'name': 'Butebo',
		},
		'UG120': {
			'stateCode': 'UG120',
			'name': 'Buvuma',
		},
		'UG226': {
			'stateCode': 'UG226',
			'name': 'Buyende',
		},
		'UG317': {
			'stateCode': 'UG317',
			'name': 'Dokolo',
		},
		'UG121': {
			'stateCode': 'UG121',
			'name': 'Gomba',
		},
		'UG304': {
			'stateCode': 'UG304',
			'name': 'Gulu',
		},
		'UG403': {
			'stateCode': 'UG403',
			'name': 'Hoima',
		},
		'UG417': {
			'stateCode': 'UG417',
			'name': 'Ibanda',
		},
		'UG203': {
			'stateCode': 'UG203',
			'name': 'Iganga',
		},
		'UG418': {
			'stateCode': 'UG418',
			'name': 'Isingiro',
		},
		'UG204': {
			'stateCode': 'UG204',
			'name': 'Jinja',
		},
		'UG318': {
			'stateCode': 'UG318',
			'name': 'Kaabong',
		},
		'UG404': {
			'stateCode': 'UG404',
			'name': 'Kabale',
		},
		'UG405': {
			'stateCode': 'UG405',
			'name': 'Kabarole',
		},
		'UG213': {
			'stateCode': 'UG213',
			'name': 'Kaberamaido',
		},
		'UG427': {
			'stateCode': 'UG427',
			'name': 'Kagadi',
		},
		'UG428': {
			'stateCode': 'UG428',
			'name': 'Kakumiro',
		},
		'UG101': {
			'stateCode': 'UG101',
			'name': 'Kalangala',
		},
		'UG222': {
			'stateCode': 'UG222',
			'name': 'Kaliro',
		},
		'UG122': {
			'stateCode': 'UG122',
			'name': 'Kalungu',
		},
		'UG102': {
			'stateCode': 'UG102',
			'name': 'Kampala',
		},
		'UG205': {
			'stateCode': 'UG205',
			'name': 'Kamuli',
		},
		'UG413': {
			'stateCode': 'UG413',
			'name': 'Kamwenge',
		},
		'UG414': {
			'stateCode': 'UG414',
			'name': 'Kanungu',
		},
		'UG206': {
			'stateCode': 'UG206',
			'name': 'Kapchorwa',
		},
		'UG236': {
			'stateCode': 'UG236',
			'name': 'Kapelebyong',
		},
		'UG126': {
			'stateCode': 'UG126',
			'name': 'Kasanda',
		},
		'UG406': {
			'stateCode': 'UG406',
			'name': 'Kasese',
		},
		'UG207': {
			'stateCode': 'UG207',
			'name': 'Katakwi',
		},
		'UG112': {
			'stateCode': 'UG112',
			'name': 'Kayunga',
		},
		'UG407': {
			'stateCode': 'UG407',
			'name': 'Kibaale',
		},
		'UG103': {
			'stateCode': 'UG103',
			'name': 'Kiboga',
		},
		'UG227': {
			'stateCode': 'UG227',
			'name': 'Kibuku',
		},
		'UG432': {
			'stateCode': 'UG432',
			'name': 'Kikuube',
		},
		'UG419': {
			'stateCode': 'UG419',
			'name': 'Kiruhura',
		},
		'UG421': {
			'stateCode': 'UG421',
			'name': 'Kiryandongo',
		},
		'UG408': {
			'stateCode': 'UG408',
			'name': 'Kisoro',
		},
		'UG305': {
			'stateCode': 'UG305',
			'name': 'Kitgum',
		},
		'UG319': {
			'stateCode': 'UG319',
			'name': 'Koboko',
		},
		'UG325': {
			'stateCode': 'UG325',
			'name': 'Kole',
		},
		'UG306': {
			'stateCode': 'UG306',
			'name': 'Kotido',
		},
		'UG208': {
			'stateCode': 'UG208',
			'name': 'Kumi',
		},
		'UG333': {
			'stateCode': 'UG333',
			'name': 'Kwania',
		},
		'UG228': {
			'stateCode': 'UG228',
			'name': 'Kween',
		},
		'UG123': {
			'stateCode': 'UG123',
			'name': 'Kyankwanzi',
		},
		'UG422': {
			'stateCode': 'UG422',
			'name': 'Kyegegwa',
		},
		'UG415': {
			'stateCode': 'UG415',
			'name': 'Kyenjojo',
		},
		'UG125': {
			'stateCode': 'UG125',
			'name': 'Kyotera',
		},
		'UG326': {
			'stateCode': 'UG326',
			'name': 'Lamwo',
		},
		'UG307': {
			'stateCode': 'UG307',
			'name': 'Lira',
		},
		'UG229': {
			'stateCode': 'UG229',
			'name': 'Luuka',
		},
		'UG104': {
			'stateCode': 'UG104',
			'name': 'Luwero',
		},
		'UG124': {
			'stateCode': 'UG124',
			'name': 'Lwengo',
		},
		'UG114': {
			'stateCode': 'UG114',
			'name': 'Lyantonde',
		},
		'UG223': {
			'stateCode': 'UG223',
			'name': 'Manafwa',
		},
		'UG320': {
			'stateCode': 'UG320',
			'name': 'Maracha',
		},
		'UG105': {
			'stateCode': 'UG105',
			'name': 'Masaka',
		},
		'UG409': {
			'stateCode': 'UG409',
			'name': 'Masindi',
		},
		'UG214': {
			'stateCode': 'UG214',
			'name': 'Mayuge',
		},
		'UG209': {
			'stateCode': 'UG209',
			'name': 'Mbale',
		},
		'UG410': {
			'stateCode': 'UG410',
			'name': 'Mbarara',
		},
		'UG423': {
			'stateCode': 'UG423',
			'name': 'Mitooma',
		},
		'UG115': {
			'stateCode': 'UG115',
			'name': 'Mityana',
		},
		'UG308': {
			'stateCode': 'UG308',
			'name': 'Moroto',
		},
		'UG309': {
			'stateCode': 'UG309',
			'name': 'Moyo',
		},
		'UG106': {
			'stateCode': 'UG106',
			'name': 'Mpigi',
		},
		'UG107': {
			'stateCode': 'UG107',
			'name': 'Mubende',
		},
		'UG108': {
			'stateCode': 'UG108',
			'name': 'Mukono',
		},
		'UG334': {
			'stateCode': 'UG334',
			'name': 'Nabilatuk',
		},
		'UG311': {
			'stateCode': 'UG311',
			'name': 'Nakapiripirit',
		},
		'UG116': {
			'stateCode': 'UG116',
			'name': 'Nakaseke',
		},
		'UG109': {
			'stateCode': 'UG109',
			'name': 'Nakasongola',
		},
		'UG230': {
			'stateCode': 'UG230',
			'name': 'Namayingo',
		},
		'UG234': {
			'stateCode': 'UG234',
			'name': 'Namisindwa',
		},
		'UG224': {
			'stateCode': 'UG224',
			'name': 'Namutumba',
		},
		'UG327': {
			'stateCode': 'UG327',
			'name': 'Napak',
		},
		'UG310': {
			'stateCode': 'UG310',
			'name': 'Nebbi',
		},
		'UG231': {
			'stateCode': 'UG231',
			'name': 'Ngora',
		},
		'UG424': {
			'stateCode': 'UG424',
			'name': 'Ntoroko',
		},
		'UG411': {
			'stateCode': 'UG411',
			'name': 'Ntungamo',
		},
		'UG328': {
			'stateCode': 'UG328',
			'name': 'Nwoya',
		},
		'UG331': {
			'stateCode': 'UG331',
			'name': 'Omoro',
		},
		'UG329': {
			'stateCode': 'UG329',
			'name': 'Otuke',
		},
		'UG321': {
			'stateCode': 'UG321',
			'name': 'Oyam',
		},
		'UG312': {
			'stateCode': 'UG312',
			'name': 'Pader',
		},
		'UG332': {
			'stateCode': 'UG332',
			'name': 'Pakwach',
		},
		'UG210': {
			'stateCode': 'UG210',
			'name': 'Pallisa',
		},
		'UG110': {
			'stateCode': 'UG110',
			'name': 'Rakai',
		},
		'UG429': {
			'stateCode': 'UG429',
			'name': 'Rubanda',
		},
		'UG425': {
			'stateCode': 'UG425',
			'name': 'Rubirizi',
		},
		'UG431': {
			'stateCode': 'UG431',
			'name': 'Rukiga',
		},
		'UG412': {
			'stateCode': 'UG412',
			'name': 'Rukungiri',
		},
		'UG111': {
			'stateCode': 'UG111',
			'name': 'Sembabule',
		},
		'UG232': {
			'stateCode': 'UG232',
			'name': 'Serere',
		},
		'UG426': {
			'stateCode': 'UG426',
			'name': 'Sheema',
		},
		'UG215': {
			'stateCode': 'UG215',
			'name': 'Sironko',
		},
		'UG211': {
			'stateCode': 'UG211',
			'name': 'Soroti',
		},
		'UG212': {
			'stateCode': 'UG212',
			'name': 'Tororo',
		},
		'UG113': {
			'stateCode': 'UG113',
			'name': 'Wakiso',
		},
		'UG313': {
			'stateCode': 'UG313',
			'name': 'Yumbe',
		},
		'UG330': {
			'stateCode': 'UG330',
			'name': 'Zombo',
		},
	},
	'UM': {
		'67': {
			'stateCode': '67',
			'name': 'Johnston Atoll',
		},
		'71': {
			'stateCode': '71',
			'name': 'Midway Atoll',
		},
		'76': {
			'stateCode': '76',
			'name': 'Navassa Island',
		},
		'79': {
			'stateCode': '79',
			'name': 'Wake Island',
		},
		'81': {
			'stateCode': '81',
			'name': 'Baker Island',
		},
		'84': {
			'stateCode': '84',
			'name': 'Howland Island',
		},
		'86': {
			'stateCode': '86',
			'name': 'Jarvis Island',
		},
		'89': {
			'stateCode': '89',
			'name': 'Kingman Reef',
		},
		'95': {
			'stateCode': '95',
			'name': 'Palmyra Atoll',
		},
	},
	'US': {
		'AL': {
			'stateCode': 'AL',
			'name': 'Alabama',
		},
		'AK': {
			'stateCode': 'AK',
			'name': 'Alaska',
		},
		'AZ': {
			'stateCode': 'AZ',
			'name': 'Arizona',
		},
		'AR': {
			'stateCode': 'AR',
			'name': 'Arkansas',
		},
		'CA': {
			'stateCode': 'CA',
			'name': 'California',
		},
		'CO': {
			'stateCode': 'CO',
			'name': 'Colorado',
		},
		'CT': {
			'stateCode': 'CT',
			'name': 'Connecticut',
		},
		'DE': {
			'stateCode': 'DE',
			'name': 'Delaware',
		},
		'DC': {
			'stateCode': 'DC',
			'name': 'District Of Columbia',
		},
		'FL': {
			'stateCode': 'FL',
			'name': 'Florida',
		},
		'GA': {
			'stateCode': 'GA',
			'name': 'Georgia',
		},
		'HI': {
			'stateCode': 'HI',
			'name': 'Hawaii',
		},
		'ID': {
			'stateCode': 'ID',
			'name': 'Idaho',
		},
		'IL': {
			'stateCode': 'IL',
			'name': 'Illinois',
		},
		'IN': {
			'stateCode': 'IN',
			'name': 'Indiana',
		},
		'IA': {
			'stateCode': 'IA',
			'name': 'Iowa',
		},
		'KS': {
			'stateCode': 'KS',
			'name': 'Kansas',
		},
		'KY': {
			'stateCode': 'KY',
			'name': 'Kentucky',
		},
		'LA': {
			'stateCode': 'LA',
			'name': 'Louisiana',
		},
		'ME': {
			'stateCode': 'ME',
			'name': 'Maine',
		},
		'MD': {
			'stateCode': 'MD',
			'name': 'Maryland',
		},
		'MA': {
			'stateCode': 'MA',
			'name': 'Massachusetts',
		},
		'MI': {
			'stateCode': 'MI',
			'name': 'Michigan',
		},
		'MN': {
			'stateCode': 'MN',
			'name': 'Minnesota',
		},
		'MS': {
			'stateCode': 'MS',
			'name': 'Mississippi',
		},
		'MO': {
			'stateCode': 'MO',
			'name': 'Missouri',
		},
		'MT': {
			'stateCode': 'MT',
			'name': 'Montana',
		},
		'NE': {
			'stateCode': 'NE',
			'name': 'Nebraska',
		},
		'NV': {
			'stateCode': 'NV',
			'name': 'Nevada',
		},
		'NH': {
			'stateCode': 'NH',
			'name': 'New Hampshire',
		},
		'NJ': {
			'stateCode': 'NJ',
			'name': 'New Jersey',
		},
		'NM': {
			'stateCode': 'NM',
			'name': 'New Mexico',
		},
		'NY': {
			'stateCode': 'NY',
			'name': 'New York',
		},
		'NC': {
			'stateCode': 'NC',
			'name': 'North Carolina',
		},
		'ND': {
			'stateCode': 'ND',
			'name': 'North Dakota',
		},
		'OH': {
			'stateCode': 'OH',
			'name': 'Ohio',
		},
		'OK': {
			'stateCode': 'OK',
			'name': 'Oklahoma',
		},
		'OR': {
			'stateCode': 'OR',
			'name': 'Oregon',
		},
		'PA': {
			'stateCode': 'PA',
			'name': 'Pennsylvania',
		},
		'RI': {
			'stateCode': 'RI',
			'name': 'Rhode Island',
		},
		'SC': {
			'stateCode': 'SC',
			'name': 'South Carolina',
		},
		'SD': {
			'stateCode': 'SD',
			'name': 'South Dakota',
		},
		'TN': {
			'stateCode': 'TN',
			'name': 'Tennessee',
		},
		'TX': {
			'stateCode': 'TX',
			'name': 'Texas',
		},
		'UT': {
			'stateCode': 'UT',
			'name': 'Utah',
		},
		'VT': {
			'stateCode': 'VT',
			'name': 'Vermont',
		},
		'VA': {
			'stateCode': 'VA',
			'name': 'Virginia',
		},
		'WA': {
			'stateCode': 'WA',
			'name': 'Washington',
		},
		'WV': {
			'stateCode': 'WV',
			'name': 'West Virginia',
		},
		'WI': {
			'stateCode': 'WI',
			'name': 'Wisconsin',
		},
		'WY': {
			'stateCode': 'WY',
			'name': 'Wyoming',
		},
		'AA': {
			'stateCode': 'AA',
			'name': 'Armed Forces (AA)',
		},
		'AE': {
			'stateCode': 'AE',
			'name': 'Armed Forces (AE)',
		},
		'AP': {
			'stateCode': 'AP',
			'name': 'Armed Forces (AP)',
		},
	},
	'UY': {
		'UY-AR': {
			'stateCode': 'UY-AR',
			'name': 'Artigas',
		},
		'UY-CA': {
			'stateCode': 'UY-CA',
			'name': 'Canelones',
		},
		'UY-CL': {
			'stateCode': 'UY-CL',
			'name': 'Cerro Largo',
		},
		'UY-CO': {
			'stateCode': 'UY-CO',
			'name': 'Colonia',
		},
		'UY-DU': {
			'stateCode': 'UY-DU',
			'name': 'Durazno',
		},
		'UY-FS': {
			'stateCode': 'UY-FS',
			'name': 'Flores',
		},
		'UY-FD': {
			'stateCode': 'UY-FD',
			'name': 'Florida',
		},
		'UY-LA': {
			'stateCode': 'UY-LA',
			'name': 'Lavalleja',
		},
		'UY-MA': {
			'stateCode': 'UY-MA',
			'name': 'Maldonado',
		},
		'UY-MO': {
			'stateCode': 'UY-MO',
			'name': 'Montevideo',
		},
		'UY-PA': {
			'stateCode': 'UY-PA',
			'name': 'Paysandú',
		},
		'UY-RN': {
			'stateCode': 'UY-RN',
			'name': 'Río Negro',
		},
		'UY-RV': {
			'stateCode': 'UY-RV',
			'name': 'Rivera',
		},
		'UY-RO': {
			'stateCode': 'UY-RO',
			'name': 'Rocha',
		},
		'UY-SA': {
			'stateCode': 'UY-SA',
			'name': 'Salto',
		},
		'UY-SJ': {
			'stateCode': 'UY-SJ',
			'name': 'San José',
		},
		'UY-SO': {
			'stateCode': 'UY-SO',
			'name': 'Soriano',
		},
		'UY-TA': {
			'stateCode': 'UY-TA',
			'name': 'Tacuarembó',
		},
		'UY-TT': {
			'stateCode': 'UY-TT',
			'name': 'Treinta y Tres',
		},
	},
	'VE': {
		'VE-A': {
			'stateCode': 'VE-A',
			'name': 'Capital',
		},
		'VE-B': {
			'stateCode': 'VE-B',
			'name': 'Anzoátegui',
		},
		'VE-C': {
			'stateCode': 'VE-C',
			'name': 'Apure',
		},
		'VE-D': {
			'stateCode': 'VE-D',
			'name': 'Aragua',
		},
		'VE-E': {
			'stateCode': 'VE-E',
			'name': 'Barinas',
		},
		'VE-F': {
			'stateCode': 'VE-F',
			'name': 'Bolívar',
		},
		'VE-G': {
			'stateCode': 'VE-G',
			'name': 'Carabobo',
		},
		'VE-H': {
			'stateCode': 'VE-H',
			'name': 'Cojedes',
		},
		'VE-I': {
			'stateCode': 'VE-I',
			'name': 'Falcón',
		},
		'VE-J': {
			'stateCode': 'VE-J',
			'name': 'Guárico',
		},
		'VE-K': {
			'stateCode': 'VE-K',
			'name': 'Lara',
		},
		'VE-L': {
			'stateCode': 'VE-L',
			'name': 'Mérida',
		},
		'VE-M': {
			'stateCode': 'VE-M',
			'name': 'Miranda',
		},
		'VE-N': {
			'stateCode': 'VE-N',
			'name': 'Monagas',
		},
		'VE-O': {
			'stateCode': 'VE-O',
			'name': 'Nueva Esparta',
		},
		'VE-P': {
			'stateCode': 'VE-P',
			'name': 'Portuguesa',
		},
		'VE-R': {
			'stateCode': 'VE-R',
			'name': 'Sucre',
		},
		'VE-S': {
			'stateCode': 'VE-S',
			'name': 'Táchira',
		},
		'VE-T': {
			'stateCode': 'VE-T',
			'name': 'Trujillo',
		},
		'VE-U': {
			'stateCode': 'VE-U',
			'name': 'Yaracuy',
		},
		'VE-V': {
			'stateCode': 'VE-V',
			'name': 'Zulia',
		},
		'VE-W': {
			'stateCode': 'VE-W',
			'name': 'Federal Dependencies',
		},
		'VE-X': {
			'stateCode': 'VE-X',
			'name': 'La Guaira (Vargas)',
		},
		'VE-Y': {
			'stateCode': 'VE-Y',
			'name': 'Delta Amacuro',
		},
		'VE-Z': {
			'stateCode': 'VE-Z',
			'name': 'Amazonas',
		},
	},
	'VN': {},
	'YT': {},
	'ZA': {
		'EC': {
			'stateCode': 'EC',
			'name': 'Eastern Cape',
		},
		'FS': {
			'stateCode': 'FS',
			'name': 'Free State',
		},
		'GP': {
			'stateCode': 'GP',
			'name': 'Gauteng',
		},
		'KZN': {
			'stateCode': 'KZN',
			'name': 'KwaZulu-Natal',
		},
		'LP': {
			'stateCode': 'LP',
			'name': 'Limpopo',
		},
		'MP': {
			'stateCode': 'MP',
			'name': 'Mpumalanga',
		},
		'NC': {
			'stateCode': 'NC',
			'name': 'Northern Cape',
		},
		'NW': {
			'stateCode': 'NW',
			'name': 'North West',
		},
		'WC': {
			'stateCode': 'WC',
			'name': 'Western Cape',
		},
	},
	'ZM': {
		'ZM-01': {
			'stateCode': 'ZM-01',
			'name': 'Western',
		},
		'ZM-02': {
			'stateCode': 'ZM-02',
			'name': 'Central',
		},
		'ZM-03': {
			'stateCode': 'ZM-03',
			'name': 'Eastern',
		},
		'ZM-04': {
			'stateCode': 'ZM-04',
			'name': 'Luapula',
		},
		'ZM-05': {
			'stateCode': 'ZM-05',
			'name': 'Northern',
		},
		'ZM-06': {
			'stateCode': 'ZM-06',
			'name': 'North-Western',
		},
		'ZM-07': {
			'stateCode': 'ZM-07',
			'name': 'Southern',
		},
		'ZM-08': {
			'stateCode': 'ZM-08',
			'name': 'Copperbelt',
		},
		'ZM-09': {
			'stateCode': 'ZM-09',
			'name': 'Lusaka',
		},
		'ZM-10': {
			'stateCode': 'ZM-10',
			'name': 'Muchinga',
		},
	},
};
