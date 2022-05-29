const colors = require("tailwindcss/colors");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

	theme: {
		letterSpacing: {
			wide: ".01em",
			wider: ".05em",
			widest: ".5em",
		},
		screens: {
			sm: "480px",
			md: "1024px",
			lg: "1080px",
			xl: "1440px",
		},
		colors: {
			green: colors.green,
			black: colors.black,
			white: colors.white,
			gray: colors.neutral,
			bluegray: colors.slate,
			indigo: colors.indigo,
			red: colors.rose,
			yellow: colors.amber,
			orange: colors.orange,
			blue: colors.blue,
			lime: colors.lime,
			brand: {
				1: "#4c1d95",
				2: "#333137",
				3: "#5b21b6",
				4: "#EB9A56",
				5: "#E68354",
				6: "#427CD3",
				7: "#22c55e",
				8: "#EB5D60",
				9: "#e879f9",
				10: "#f5e5c8",
				11: "#e7e7e7",
				12: "#ff4e4e",
			},
		},
		fontFamily: {},
		fontSize: {
			xs: ".75rem",
			sm: ".875rem",
			tiny: ".875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "1.875rem",
			"4xl": "2.25rem",
			"5xl": "3rem",
			"6xl": "4rem",
			"7xl": "5rem",
			"8xl": "7rem",
			"9xl": "9rem",
			"10xl": "12rem",
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};