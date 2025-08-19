
// Assets



// Variable Defaults


// Widths and Heights
export const positionChangeHeightSm = 700
export const positionChangeWidthSm = 600
export const positionChangeWidthMd = 900
export const positionChangeWidthLg = 1200
export const iconImageDimension = '115px'
export const ministepsHeight = '25px' // Height for the ministep/arrow elements

// Navbar and Footer
export const navbarHeight = '70px' //Height for the navigation bar
export const footerHeight = '150px' //Height for the footer bar

// Colors
export const pjsGreen = '#00643C' // Paris Metro Green
export const pjsBlue = '#2B5797' // Paris Metro Blue
export const pjsYellow = '#D4AF37' // Paris Metro Yellow
export const swipelyticsTurquoise = '#00ffff' // Swipelytics Turqoise
export const swipelyticsPink = '#f06292' // Swipelytics Pink
export const simcapTurquoise = '#00ffff' // SimCap Turqoise
export const simcapPink = '#f06292' // SimCap Pink
export const sheirGreen = '#59e19c' // sHeir green
export const sheirBlue = '#2979ff' //sHeir blue
export const sheirYellow = '#FFEB3B' //sHeir yellow
export const wrap3dPurple = 'purple' // 3D Wrap Purple
export const pozoBlue = '#0000ff' // PoZo Blue
export const pozoYellow = '#fcee21' // PoZo Yellow
export const minesweeperYellow = '#ffcf00' // Minesweeper Yellow

export const navbarBgDefaultColor = 'whitesmoke' // black

// IDs
export const gtagID = process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID


// Permitted Country Codes — https://www.iban.com/country-codes
export const permittedCountryCodes = [
  'US', // United States
  'FR', // France
  'AU', // Australia
  'AT', // Austria
  'BE', // Belgium
  'CA', // Canada
  'DK', // Denmark
  'FI', // Finland
  'DE', // Germany
  'GR', // Greece
  'HK', // Hong Kong
  'IE', // Ireland
  'IL', // Israel
  'IT', // Italy
  'JP', // Japan
  'LI', // Liechtenstein
  'LU', // Luxembourg
  'MX', // Mexico
  'NL', // The Netherlands
  'NZ', // New Zealand
  'NO', // Norwary
  'PL', // Poland
  'PT', // Portugal
  'PR', // Puerto Rico
  'SG', // Singapore
  'ES', // Spain
  'SE', // Sweden
  'CH', // Switzerland
  'GB', // Great Britain

  'AF', // Afghanistan
  'AL', // Albania
  'DZ', // Algeria
  'AM', // American Samoa
  'AD', // Andorra
  'AO', // Angola
  'AI', // Anguilla
  'AQ', // Antarctica
  'AG', // Antigua and Barbuda
  'AR', // Argentina
  'AM', // Armenia
  'AW', // Aruba
  'AZ', // Azerbaijan
  'BS', // The Bahamas
  'BH', // Bahrain
  'BD', // Bangladesh
  'BB', // Barbados
  'BY', // Belarus
  'BZ', // Belize
  'BJ', // Benin
  'BM', // Bermuda
  'BT', // Bhutan
  'BO', // Bolivia
  'BQ', // Bonaire
  'BA', // Bosnia and Herzegovina
  'BW', // Botswana
  'BV', // Bouvet Island
  'IO', // British Indian Ocean Territory
  'BN', // Brunei
  'BG', // Bulgaria
  'BF', // Burkina Faso
  'BI', // Burundi
  'CV', // Cabo Verde
  'KH', // Cambodia
  'CM', // Camaroon
  'KY', // the Cayman Islands
  'CF', // Central African Republic
  'TD', // Chad
  'CL', // Chile
  'CN', // China
  'CX', // Christmas Island
  'CC', // The Cocos Islands
  'CO', // Colombia
  'KM', // The Comoros
  'CD', // Democratic Republic of Congo
  'CG', // Congo
  'CK', // The Cook Islands
  'CR', // Costa Rica
  'HR', // Croatia
  'CU', // Cuba
  'CW', // Curacao
  'CY', // Cyprus
  'CZ', // Czech Republic
  'CI', // Ivory Coast
  'DJ', // Djibouti
  'DM', // Dominica
  'DO', // The Dominican Republic
  'EC', // Ecuador
  'EG', // Egypt
  'SV', // El Salvador
  'GQ', // Equatorial Guinea
  'ER', // Eritrea
  'EE', // Estonia
  'SZ', // Eswatini
  'ET', // Ethiopia
  'FK', // Falkland Islands
  'FO', // Faroe Islands
  'FJ', // Fiji
  'GF', // French Guiana
  'PF', // French Polynesia
  'TF', // French Southern Territories
  'GA', // Gabon
  'GM', // Gambia
  'GE', // Georgia
  'GH', // Ghana
  'GI', // Gibraltar
  'GL', // Greenland
  'GD', // Grenada
  'GP', // Guadeloupe
  'GU', // Guam
  'GT', // Guatemala
  'GG', // Guernsey
  'GN', // Guinea
  'GW', // Guinea-Bissau
  'GY', // Guyana
  'HT', // Haiti
  'HM', // Heard Island and McDonald Islands
  'VA', // The Holy See
  'HN', // Honduras
  'HU', // Hungary
  'IS', // Iceland
  'IN', // India
  'ID', // Indonesia
  'IR', // Iran
  'IQ', // Iraq
  'IM', // Isle of Man
  'JM', // Jamaica
  'JE', // Jersey
  'JO', // Jordan
  'KZ', // Kazakhstan
  'KE', // Kenya
  'KI', // Kiribati
  // 'KP', // North Korea
  'KR', // South Korea
  'KW', // Kuwait
  'KG', // Kyrgyzstan
  'LA', // Laos
  'LV', // Latvia
  'LB', // Lebanon
  'LS', // Lesotho
  'LR', // Liberia
  'LY', // Libya
  'LT', // Lithuania
  'MO', // Macao
  'MG', // Madagascar
  'MW', // Malawi
  'MY', // Malaysia
  'MV', // The Maldives
  'ML', // Mali
  'MT', // Malta
  'MH', // The Marshall Islands
  'MQ', // Martinique
  'MR', // Mauritania
  'MU', // Mauritius
  'YT', // Mayotte
  'FM', // Micronesia
  'MD', // Maldova
  'MC', // Monaco
  'MN', // Mongolia
  'ME', // Montenegro
  'MS', // Montserrat
  'MA', // Morocco
  'MZ', // Mozambique
  'MM', // Myanmar
  'NA', // Namibia
  'NR', // Nauru
  'NP', // Nepal
  'NC', // New Caledonia
  'NI', // Nicaragua
  'NE', // Niger
  'NG', // Nigeria
  'NU', // Niue
  'NF', // Norfolk Island
  'MP', // Northern Mariana Islands
  'OM', // Oman
  'PK', // Pakistan
  'PW', // Palau
  'PS', // Palestine
  'PA', // Panama
  'PG', // Papua New Guinea
  'PY', // Paraguay
  'PE', // Peru
  'PH', // The Philippines
  'PN', // Pitcairn
  'QA', // Qatar
  'MK', // Macedonia
  'RO', // Romania
  // 'RU', // Russia
  'RW', // Rwanda
  'RE', // Reunion
  'BL', // Saint Barthelemy
  'SH', // Saint Helena
  'KN', // Saint Kitts and Nevis
  'LC', // Saint Lucia
  'MF', // Saint Martin
  'PM', // Saint Pierre and Miquelon
  'VC', // Saint Vincent and the Grenadines
  'WS', // Samoa
  'SM', // San Marino
  'ST', // Sao Tome and Principe
  'SA', // Saudi Arabia
  'SN', // Senegal
  'RS', // Serbia
  'SC', // Seychelles
  'SL', // Sierra Leone
  'SX', // Sint Maarten
  'SK', // Slovakia
  'SI', // Slovenia
  'SB', // Solomon Islands
  'SO', // Somalia
  'ZA', // South Africa
  'GS', // South Georgia and the Sandwich Islands
  'SS', // South Sudan
  'LK', // Sri Lanka
  'SD', // Sudan
  'SR', // Suriname
  'SJ', // Svalbard
  'SY', // Syria
  'TW', // Taiwan
  'TJ', // Tajikistan
  'TZ', // Tanzania
  'TH', // Thailand
  'TL', // Timor-Leste
  'TG', // Togo
  'TK', // Tokelau
  'TO', // Tonga
  'TT', // Trinidad and Tobago
  'TN', // Tunisia
  'TR', // Turkey
  'TM', // Turkmenistan
  'TC', // Turks and Caicos
  'TV', // Tuvalu
  'UG', // Uganda
  'UA', // Ukraine
  'AE', // United Arab Emirates
  'UM', // United States Minor Outlying Islands
  'UY', // Uruguay
  'UZ', // Uzbekistan
  'VU', // Vanuatu
  'VE', // Venezuela
  'VN', // Vietnam
  'VG', // British Virgin Islands
  'VI', // US Virgin Islands
  'WF', // Wallis and Futuna
  'EH', // Western Sahara
  'YE', // Yemen
  'ZM', // Zambia
  'ZW', // Zimbabwe
  'AX', // Aland Islands
  ''
]