const COLORS_OUTLINED = {
    borderColor: "#76A9FF",
    hoverBorderColor: "#C4DAFF",
    controlColor: "#2264D1",
    focusColor: "#9DC2FF",
};

export const outlinedClasses = {
    h: "56px",
    px: "12px",
    w: "100%",
    borderRadius: "8px",
    transition: "box-shadow 100ms",
    _checked: {
        boxShadow: `0 0 0 2px ${COLORS_OUTLINED.borderColor}`,
    },
    "span[class*='checkbox__control']:not([data-disabled])": {
        borderColor: COLORS_OUTLINED.controlColor,
        borderRadius: "2px",
        _checked: {
            bg: COLORS_OUTLINED.controlColor,
            borderColor: COLORS_OUTLINED.controlColor,
        },
        _focus: {
            boxShadow: `0 0 0 2px ${COLORS_OUTLINED.focusColor}`,
            _checked: {
                boxShadow: `0 0 0 2px ${COLORS_OUTLINED.focusColor}`,
            },
        },
    },
    _hover: {
        boxShadow: `0 0 0 1px ${COLORS_OUTLINED.hoverBorderColor}`,
        transition: "box-shadow 150ms",
        _checked: {
            boxShadow: `0 0 0 2px ${COLORS_OUTLINED.borderColor}`,
        },
    },
};

const COLORS_SMOOTH = {
    bg: "#ECF7ED",
    bgHovered: "#F5FAF5",
    borderColor: "#76A9FF",
    hoverBorderColor: "#C4DAFF",
    controlColorChecked: "#37833B",
    controlColor: "#9696A0",
    focusColor: "#A9D3AB",
};

export const smoothClasses = {
    h: "auto",
    pr: 3,
    pl: 1,
    py: 1,
    w: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    borderRadius: "99px",
    transition: "all 150ms",
    _checked: {
        bg: COLORS_SMOOTH.bg,
    },
    "span[class*='checkbox__control']:not([data-disabled])": {
        borderColor: COLORS_SMOOTH.controlColor,
        borderRadius: "99px",
        borderWidth: "3px",
        h: "28px",
        w: "28px",
        "& svg": {
            w: "1.6em",
        },
        _checked: {
            bg: COLORS_SMOOTH.controlColorChecked,
            borderColor: COLORS_SMOOTH.controlColorChecked,
        },
        _focus: {
            boxShadow: `0 0 0 2px ${COLORS_SMOOTH.focusColor}`,
            _checked: {
                boxShadow: `0 0 0 2px ${COLORS_SMOOTH.focusColor}`,
            },
        },
    },
    _hover: {
        transition: "all 350ms",
        bg: COLORS_SMOOTH.bgHovered,
        _checked: {
            bg: COLORS_SMOOTH.bg,
        },
    },
};
