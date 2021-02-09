module.exports = {
	roots: ["<rootDir>"],
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
	setupFiles: ["<rootDir>/config/setup.js"],
	testPathIgnorePatterns: [
		"<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]",
	],
	transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
	testEnvironment: "jsdom",
	testURL: "http://localhost",
	transform: {
		"^.+\\.(ts|tsx)$": "babel-jest",
	},
	testRegex: "/__tests__/.*\\.(test|spec)\\.tsx?$",
	// Format the snapshot to make it more readable
	snapshotSerializers: ["enzyme-to-json/serializer"],
	// Resolve error of importing css files
	moduleNameMapper: {
		"\\.(scss|sass|css)$": "identity-obj-proxy",
	},
	// Display the match tests while filtering the tests under jest watch mode
	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname",
	],
	// If tsconfig.json -> compilerOptions.baseUrl config is used for absolute paths feature
	moduleDirectories: ["node_modules", "src"],
};
