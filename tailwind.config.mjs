/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/**/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  keyframes: {
			slideInRight: {
			  '0%': { transform: 'translateX(100%)' },
			  '100%': { transform: 'translateX(0)' },
			},
			slideOutRight: {
			  '0%': { transform: 'translateX(0)' },
			  '100%': { transform: 'translateX(100%)' },
			},
		  },
		  animation: {
			slideInRight: 'slideInRight 0.5s ease-out',
			slideOutRight: 'slideOutRight 0.5s ease-in',
		  },
		},
	  },
	plugins: [],
}
