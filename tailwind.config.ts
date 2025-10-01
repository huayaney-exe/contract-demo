
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'interbank-primary-green': 'hsl(var(--interbank-primary-green))',
				'interbank-primary-green-light': 'hsl(var(--interbank-primary-green-light))',
				'interbank-primary-green-bg': 'hsl(var(--interbank-primary-green-bg))',
				'interbank-secondary-blue': 'hsl(var(--interbank-secondary-blue))',
				'interbank-secondary-blue-light': 'hsl(var(--interbank-secondary-blue-light))',
				'interbank-secondary-blue-lighter': 'hsl(var(--interbank-secondary-blue-lighter))',
				'interbank-secondary-blue-pale': 'hsl(var(--interbank-secondary-blue-pale))',
				'interbank-secondary-blue-dark': 'hsl(var(--interbank-secondary-blue-dark))',
				'interbank-white': 'hsl(var(--interbank-white))',
				'interbank-black': 'hsl(var(--interbank-black))',
				'interbank-gray-50': 'hsl(var(--interbank-gray-50))',
				'interbank-gray-100': 'hsl(var(--interbank-gray-100))',
				'interbank-gray-200': 'hsl(var(--interbank-gray-200))',
				'interbank-gray-300': 'hsl(var(--interbank-gray-300))',
				'interbank-gray-400': 'hsl(var(--interbank-gray-400))',
				'interbank-gray-500': 'hsl(var(--interbank-gray-500))',
				'interbank-gray-600': 'hsl(var(--interbank-gray-600))',
				'interbank-gray-700': 'hsl(var(--interbank-gray-700))',
				'interbank-gray-800': 'hsl(var(--interbank-gray-800))',
				'interbank-gray-900': 'hsl(var(--interbank-gray-900))',
				'interbank-success': 'hsl(var(--interbank-success))',
				'interbank-error': 'hsl(var(--interbank-error))',
				'interbank-error-light': 'hsl(var(--interbank-error-light))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-light': 'pulse-light 3s ease-in-out infinite',
				'slide-in': 'slide-in 0.8s ease-out'
			},
			fontFamily: {
				sans: ['Montserrat', 'system-ui', 'sans-serif'],
				secondary: ['Inter', 'system-ui', 'sans-serif'],
				corporate: ['Geometria', 'Montserrat', 'sans-serif'],
			},
			boxShadow: {
				'sm': '0px 1px 4px rgba(0, 0, 0, 0.10)',
				'md': '0px 4px 10px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 4px 16px rgba(0,0,0,0.1)',
				'card-hover-active': '0 8px 32px rgba(0,0,0,0.15)',
			},
			spacing: {
				'xs': '4px',
				'sm': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '32px',
				'3xl': '48px',
				'4xl': '96px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
