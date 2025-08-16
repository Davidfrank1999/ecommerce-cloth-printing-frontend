// konvaCanvas/utils/tour.js

/**
 * Configuration steps for the React Tour tutorial.
 * @param {boolean} isDesktop - A flag to determine if the view is desktop or mobile.
 */
export const getTourSteps = (isDesktop) => [
    {
        selector: 'body',
        content: 'Welcome to the T-Shirt Customizer! This quick tour will guide you through the available tools and features.',
        position: 'center',
    },
    {
        selector: '.tour-side-switcher',
        content: 'Use these buttons to switch between designing the front and back of your T-shirt.',
    },
    {
        selector: '.tour-main-tools',
        content: 'Here you\'ll find the main tools: Select, Draw, add Text, and upload your own Image.',
    },
    {
        selector: '.tour-canvas',
        content: 'This is your design area. All your creations will be placed inside this dashed square on the T-shirt.',
    },
    {
        selector: isDesktop ? '.tour-stickers-desktop' : '.tour-stickers-mobile',
        content: isDesktop 
            ? 'You can find a panel of stickers here to add to your design.'
            : 'Tap this button to open the sticker drawer.',
    },
    {
        selector: '.tour-header-controls',
        content: 'Don\'t worry about mistakes! You can use the undo and redo buttons. When you\'re done, click \'Export\' to save your design.',
    },
];

/**
 * Styles for the tour popover and mask.
 */
export const tourStyles = {
    popover: (base) => ({
        ...base,
        '--reactour-accent': '#007bff',
        borderRadius: '10px',
    }),
    maskArea: (base) => ({ ...base, rx: '10px' }),
};