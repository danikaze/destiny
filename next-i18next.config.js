/*
 * Export an empty object `{}` or detele this file to disable i18n
 *
 * Otherwise, config is as stated here:
 * https://nextjs.org/docs/advanced-features/i18n-routing
 */
module.exports = {
  // https://github.com/isaachinman/next-i18next/issues/1255
  react: {
    useSuspense: false,
  },
  i18n: {
    localePath: 'public/static/locales',
    defaultLocale: 'en',
    defaultNS: 'common',
    locales: ['en', 'es'],
  },
};
