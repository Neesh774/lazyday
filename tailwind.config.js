module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        fontFamily: {
            body: ["Inter", "sans-serif"]
        },
        extend: {
            keyframes: {
                fade: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(10px)"
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                }
            },
            animation: {
                fadeUp: "fade 0.2s ease-out"
            }
        }
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("autoprefixer")
    ]
};
