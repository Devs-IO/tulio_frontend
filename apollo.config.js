module.exports = {
  client: {
    service: {
      name: "my-graphql-app",
      url: "http://localhost:3000/graphql",
    },
    includes: [
      "./src/**/*.vue",
      "./src/**/*.js",
      "./src/**/*.ts",
      "./**/*.tsx",
    ],
  },
};
