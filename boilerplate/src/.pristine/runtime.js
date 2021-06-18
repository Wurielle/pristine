/* Add scrollbar-width variable for accurate calculations with calc */
document.documentElement.style.setProperty(
    '--scrollbar-width',
    window.innerWidth - document.documentElement.clientWidth + 'px',
);
