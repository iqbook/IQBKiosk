import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem("theme") || "Dark";

const ModeColors = {
    // default: { color1: "#ffffff", color2: "#000000", color3: "#ffffff33" },
    default: { color1: "#000000", color2: "#fff", color3: "#ffffff33" },
    rose: { color1: "#e11d48", color2: "#fff", color3: "#e11d4833" },
    blue: { color1: "#1d4ed8", color2: "#fff", color3: "#1d4ed833" },
    orange: { color1: "#EA580C", color2: "#fff", color3: "#EA580C33" },
    emerald: { color1: "#047857", color2: "#fff", color3: "#04785733" },
    oceanGreen: { color1: "#14b8a6", color2: "#fff", color3: "#14b8a633" }
};

const storedModeColor = localStorage.getItem("modeColor") || "default";

const modeColorSlice = createSlice({
    name: 'modeColor',
    initialState: {
        currentModeColor: storedModeColor,
        availableModeColors: ModeColors,
        modecolors: ModeColors[storedModeColor],
    },
    reducers: {
        setModeColor: (state, action) => {
            if (Object.keys(state.availableModeColors).includes(action.payload)) {
                state.currentModeColor = action.payload;
                state.modecolors = state.availableModeColors[action.payload];
                localStorage.setItem("modeColor", action.payload);
            }
        },
        setDefaultModeColor: (state, action) => {
            const { theme } = action.payload;

            // const dynamicColor1 = theme === "Dark" ? "#ffffff" : "#000000";
            // const dynamicColor2 = theme === "Dark" ? "#000000" : "#ffffff";
            // const dynamicColor3 = theme === "Dark" ? "#00000033" : "#ffffff33";

            // state.availableModeColors.default = { color1: dynamicColor1, color2: dynamicColor2, color3: dynamicColor3 };

            // if (state.currentModeColor === "default") {
            //     state.modecolors = state.availableModeColors.default;
            // }
        }

    },
});

export const { setModeColor, setDefaultModeColor } = modeColorSlice.actions;

export default modeColorSlice.reducer;
