// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": true
    },
    projects: [
      {
        root: './earthquake-transition',
        package: './package.json',
        snippetFolder: './.vscode/vetur/snippets',
        globalComponents: [
          './src/components/**/*.vue'
        ]
      }
    ]
  }
