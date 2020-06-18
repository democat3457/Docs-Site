module.exports = {
    purge: ["./components/**/*.ts", "./pages/**/*.ts", "./components/**/*.tsx", "./pages/**/*.tsx"],
    theme: {
        extend: {
            gridTemplateColumns: {
                '3-auto': `auto auto auto`,
                'content': `0.6fr 1.8fr 0.6fr`
            },
            minHeight: {
                'with-nav': 'calc(100vh - 4rem);'
            },
            maxHeight: {
                'with-nav': 'calc(100vh - 4rem);',
                '48perc': '48%'
            },
            height: {
                'with-nav': 'calc(100vh - 4rem);'
            },
            width: {
                '48perc': '48%',
                '72': "18rem",
                'content': `calc(100vw - 18rem)`
            },
            colors: {
                'dark': {
                    '010': '#FCFCFC',
                    '020': '#F9F9F9',
                    '030': '#F6F6F6',
                    '040': '#F3F3F3',
                    '050': '#F0F0F0',
                    '100': '#E6E6E6',
                    '200': '#C9C9C9',
                    '300': '#ADADAD',
                    '400': '#919191',
                    '500': '#757575',
                    '600': '#5C5C5C',
                    '700': '#454545',
                    '800': '#2E2E2E',
                    '900': '#1B1B1B',
                }
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
        borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd']
    },
    plugins: [
        require('tailwindcss-dark-mode')(),
    ],
};
