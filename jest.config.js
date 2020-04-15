module.exports = {
  roots: ["<rootDir>"],
  moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy"
  },
  transform: {
      "^.+\\.tsx?$": "ts-jest",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
  },
  testMatch: null,
  testRegex: "(/tests/.*|(\\.|/)(test))\\.js$",
  moduleFileExtensions: ["tsx", "js"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true
      }
    },
    "window": {}
  },

  // Setup Enzyme
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/src/setupEnzyme.ts"]
};
