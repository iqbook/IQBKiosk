import { createSlice } from '@reduxjs/toolkit';

const themeColors = {
    Dark: {
        color1: "#09090B",
        color2: "#585858",
        inputColor: "#27272A80",
        borderColor: "hsla(240, 42%, 12%, 1.00)",
        color3: "#fff",
        textColor: "#F4F4F5B2",
        color4: "#111827",
        cardColor: "#1F2937",
        queueBorder: "#374151",
        tabBackground: '#151718',
        secondaryText: "#6b7280",
    },
    Light: {
        color1: "#F6F6F4",
        color2: "#A7A7A7",
        inputColor: "#D8D8D580",
        borderColor: "hsl(60, 3.7%, 85%)",
        color3: "#000",
        textColor: "#0B0B0AB2",
        color4: "#F9FAFB",
        cardColor: "#fff",
        queueBorder: "#e5e7eb",
        tabBackground: '#efefef',
        secondaryText: "#6b7280",
    }
};

const storedTheme = localStorage.getItem("theme") || "Dark";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: storedTheme,
        availableThemes: Object.keys(themeColors),
        colors: themeColors[storedTheme],
    },
    reducers: {
        setTheme: (state, action) => {
            if (state.availableThemes.includes(action.payload)) {
                state.currentTheme = action.payload;
                state.colors = themeColors[action.payload];
                localStorage.setItem("theme", action.payload);
            }
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
