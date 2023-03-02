/** @type {import("prettier").Config} */
const config = {
  useTabs: true,
  tabWidth: 4,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
