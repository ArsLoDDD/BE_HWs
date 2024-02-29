const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{html,js,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				xs: '375px',
				sm: '640px',
				md: '768px',
				md2: '832px',
				md3: '896px',
				md4: '960px',
				lg: '1024px',
				lg2: '1088px',
				lg3: '1152px',
				xl: '1280px',
				xl2: '1366px',
				'2xl': '1536px',
			},
			width: {
				87: '87%',
			},
			zIndex: {
				1000: '1000',
			},
			p: {
				2.5: '0.6rem',
			},
			borderWidth: {
				1: '1px',
			},
			height: {
				9.55: '2.43rem',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '96.666667%',
			},
			width: {
				'6.5/12': '55.166667%',
				'8.5/12': '70%',
			},
			h: {},
			scale: {
				70: '.7',
			},
			translate: {
				18: '4.5rem',
			},
			animation: {
				'custom-bounce': 'custom-bounce 1s infinite',
			},
			keyframes: {
				'custom-bounce': {
					'0%, 100%': {
						transform: 'translateY(-10%)',
						animationTimingFunction: 'ease-out',
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'ease-in',
					},
				},
			},
			colors: {
				'gray-title': '#838383',
				'gray-item': '#9197B3',
				'gray-bg': '',
				'gray-bg-item': '',
				'purple-bg-item-menu': '#5932EA',
				'green-status': '#00B087',
				'green-status-bg': '#16C09861',
				'red-status': '#DF0404',
				'red-status-bg': '#FFC5C5',
				'btn-gray': '#F5F5F5',
				'btn-gray-border': '#EEEEEE',
				'main-bg': '#fafbff',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans'],
				dmsans: ['DM Sans', 'mono'],
			},
			spacing: {},
			transitionDuration: {
				1500: '1500ms',
			},
		},
	},
	plugins: [],
}
