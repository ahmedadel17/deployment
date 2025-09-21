import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addComponents, theme }) {
    addComponents({

        /* ====================
           BASE FOOTER STYLES
        ==================== */
        '.te-footer': {
            backgroundColor: theme('colors.gray.900'),
            color: theme('colors.gray.300'),

            '.dark &': {
                backgroundColor: theme('colors.gray.800'),
            }
        },

        '.te-footer-title': {
            fontSize: theme('fontSize.md'),
            fontWeight: theme('fontWeight.semibold'),
            color: theme('colors.white'),
            marginBottom: theme('spacing.6'),
        },

        '.te-footer-subtitle': {
            fontSize: theme('fontSize.base'),
            fontWeight: theme('fontWeight.medium'),
            color: theme('colors.gray.200'),
            marginBottom: theme('spacing.4'),
        },

        '.te-footer-content': {
            paddingTop: theme('spacing.10'),
            paddingBottom: theme('spacing.10'),
            [`@media (min-width: ${theme('screens.md')})`]: {
                paddingTop: theme('spacing.16'),
                paddingBottom: theme('spacing.16'),
            },
        },

        '.te-footer-bottom': {
            borderTop: `1px solid rgba(255,255,255, 0.051)`,
            paddingTop: theme('spacing.6'),
            paddingBottom: theme('spacing.6'),
        },


        /* ====================
           FOOTER GRID LAYOUTS
        ==================== */
        '.te-footer-grid': {
            display: 'grid',
            gap: theme('spacing.6'),
            gridTemplateColumns: '1fr',
            [`@media (min-width: ${theme('screens.md')})`]: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: theme('spacing.6')
            },
            [`@media (min-width: ${theme('screens.lg')})`]: {
                gridTemplateColumns: '1fr auto auto 1fr',
                gap: theme('spacing.12')
            },
        },

        '.te-footer-grid.te-footer-grid-4-equal': {
            [`@media (min-width: ${theme('screens.lg')})`]: {
                gridTemplateColumns: 'repeat(4, 1fr)', // Override to 4 equal columns
            },
        },

        '.te-footer-grid.te-footer-grid-5': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // Mobile: 2 columns
            gap: theme('spacing.8'),

            '& > :nth-child(5)': {
                gridColumn: '1 / -1', // Last item full width on mobile
            },

            [`@media (min-width: ${theme('screens.lg')})`]: {
                gridTemplateColumns: 'repeat(4, 1fr) 2fr', // 5 columns: last one bigger
                '& > :nth-child(5)': {
                    gridColumn: 'auto', // Last item takes its own column
                },
            },
        },


        /* ====================
           FOOTER BRAND/LOGO
        ==================== */
        '.te-footer-brand': {
            display: 'flex',
            alignItems: 'center',
            gap: theme('spacing.3'),
            marginBottom: theme('spacing.6'),
            textDecoration: 'none',
        },

        '.te-footer-logo': {
            width: '2.5rem',
            height: '2.5rem',
            background: `linear-gradient(135deg, ${theme('colors.primary.500')} 0%, ${theme('colors.secondary.500')} 100%)`,
            borderRadius: theme('borderRadius.lg'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme('colors.white'),
            fontWeight: theme('fontWeight.bold'),
            fontSize: theme('fontSize.lg'),
        },

        '.te-footer-brand-text': {
            fontSize: theme('fontSize.xl'),
            fontWeight: theme('fontWeight.bold'),
            color: theme('colors.white'),
        },

        /* ====================
           FOOTER LINKS
        ==================== */
        '.footer-widget .menu': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.2'),
        },

        '.te-footer-link': {
            color: theme('colors.gray.400'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            fontSize: theme('fontSize.sm'),
            '&:hover': {
                color: theme('colors.white'),
                transform: 'translateX(4px)',
            },
            '&:focus': {
                outline: 'none',
                color: theme('colors.primary.400'),
                borderRadius: theme('borderRadius.sm'),
            }
        },

        /* ====================
           FOOTER BOTTOM LAYOUTS
        ==================== */
        '.te-footer-bottom-content': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme('spacing.4'),
            [`@media (min-width: ${theme('screens.md')})`]: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            }
        },

        '.te-footer-copyright': {
            color: theme('colors.gray.400'),
            fontSize: theme('fontSize.sm'),
            textAlign: 'center',
            [`@media (min-width: ${theme('screens.md')})`]: {
                textAlign: 'left',
            }
        },

        '.te-footer-bottom-links': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: theme('spacing.6'),
            [`@media (min-width: ${theme('screens.md')})`]: {
                justifyContent: 'flex-end',
            }
        },

        '.te-footer-bottom-link': {
            color: theme('colors.gray.400'),
            textDecoration: 'none',
            fontSize: theme('fontSize.sm'),
            transition: 'color 0.2s ease-in-out',
            '&:hover': {
                color: theme('colors.white'),
            },
            '&:focus': {
                outline: 'none',
                color: theme('colors.primary.400'),
            }
        },

        /* ====================
           BACK TO TOP BUTTON
        ==================== */
        '.te-footer-back-to-top': {
            position: 'fixed',
            bottom: theme('spacing.8'),
            left: theme('spacing.8'),
            width: '3rem',
            height: '3rem',
            backgroundColor: theme('colors.primary.600'),
            color: theme('colors.white'),
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(100px)',
            zIndex: '40',
            border: 'none',
            boxShadow: theme('boxShadow.lg'),
            '&:hover': {
                backgroundColor: theme('colors.primary.700'),
                transform: 'translateY(0) scale(1.1)',
            },
            '&:focus': {
                outline: 'none',
                boxShadow: `0 0 0 3px ${theme('colors.primary.200')}, ${theme('boxShadow.lg')}`,
            },
            '&.show': {
                opacity: '1',
                visibility: 'visible',
                transform: 'translateY(0)',
            }
        },

        '.te-footer-back-to-top-icon': {
            width: '1.25rem',
            height: '1.25rem',
        },
    });
});