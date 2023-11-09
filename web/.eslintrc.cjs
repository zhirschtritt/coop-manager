/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "prettier"],
	overrides: [
		{"comma-dangle": ["error", "always-multiline"]}
	]
};
