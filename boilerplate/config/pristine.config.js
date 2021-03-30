const screens = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xl2: '1400px',
};

const pristineConfig = {
    screens,
    bootstrapBreakpoints: {
        min: 0,
        ...screens,
    },
    bootstrapMaxWidths: screens,
    gutters: {
        base: '15px',
    },
    colors: {},
    spacing: {},
    backgroundColor: {},
    backgroundPosition: {},
    backgroundSize: {},
    borderColor: {},
    borderRadius: {},
    borderWidth: {},
    boxShadow: {},
    container: {},
    cursor: {},
    fill: {},
    flex: {},
    flexGrow: {},
    flexShrink: {},
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    height: {},
    inset: {},
    letterSpacing: {},
    lineHeight: {},
    listStyleType: {},
    margin: {},
    maxHeight: {},
    maxWidth: {},
    minHeight: {},
    minWidth: {},
    objectPosition: {},
    opacity: {},
    order: {},
    padding: {},
    stroke: {},
    textColor: {},
    width: {},
    zIndex: {},
};

module.exports = pristineConfig;
