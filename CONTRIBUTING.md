# Contributing to Exoole

Thank you for your interest in contributing to Exoole! This plugin is a modern page builder for WordPress with a primary focus on Gutenberg integration. We welcome contributions from the community and appreciate your help in making Exoole better.

Just a few general guidelines:

* All contributors who submit a pull request are agreeing to release their contribution under the [GPL-3.0-or-later license](https://github.com/theaminuli/exoole/blob/main/LICENSE).

## Providing feedback

If you've started using Exoole for building pages, experimenting with custom blocks, or integrating with Gutenberg, you may encounter limitations, have questions about the page builder functionality, or discover bugs. You might also have ideas for new blocks or features that would enhance the page building experience. In any case, please let us know by [opening an issue](https://github.com/theaminuli/exoole/issues/new/choose)!

## Contributing code

Pull requests are welcome! For small fixes, feel free to go right ahead and open one. For new features or larger enhancements (such as new blocks or major page builder improvements), we'd encourage you to open an issue first where we can scope and discuss the change. You can contribute by [forking this repository](https://github.com/theaminuli/exoole/fork) and later opening a pull request with your changes.

### Guidelines for contributing code

If you're interested in contributing code, please consider the following guidelines and best practices:

* All code must follow the [WordPress Coding Standards and best practices](https://developer.wordpress.org/coding-standards/), including documentation. They are enforced via the project's PHP_CodeSniffer configuration.
* All code must be backward-compatible with WordPress 6.7.0 and PHP 7.4.
* All PHP code must pass the automated code quality requirements via the project's PHPCodeSniffer and PHP Parallel Lint configurations.
* All JavaScript/TypeScript code must pass the automated code quality requirements via the project's ESLint and Prettier configurations.
* All functional code changes should be accompanied by appropriate tests.
* Block development should follow [WordPress Block Development best practices](https://developer.wordpress.org/block-editor/getting-started/create-block/).

### Getting started with writing code

For the development tools to work, you'll need to have [Composer](https://getcomposer.org/) and [Node.js](https://nodejs.org/) (version 20.10.0 or higher) installed on your machine. For the built-in development environment, you'll also need [Docker](https://www.docker.com/) or set up a WordPress Local [WP Local](https://localwp.com/) development environment. or set up a `@wp-now/wp-now` development environment.

To set up the plugin for the very first time, please run the following:

```sh
composer install
npm install
npm run build
```

The following commands are relevant to build the plugin:

* `npm run build`: Builds the JavaScript and CSS assets for production.
* `npm run start`: Starts the development server with hot reloading for block development.
* `npm run start:hot`: Starts the development server with hot module replacement.

The following linting commands are available:

**PHP Linting:**
* `composer run lint:wpcs`: Checks the PHP code with [PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer/) using WordPress Coding Standards.
* `composer run lint:wpcs:fix`: Automatically fixes PHP code problems detected by PHPCodeSniffer, where possible.
* `composer run lint:php`: Checks the PHP code with [PHP Parallel Lint](https://github.com/php-parallel-lint/PHP-Parallel-Lint).
* `npm run lint:standard`: Alternative way to run PHP_CodeSniffer.

**JavaScript/CSS Linting:**
* `npm run lint:js`: Checks the JavaScript code with [ESLint](https://eslint.org/).
* `npm run lint:css`: Checks the CSS code with [Stylelint](https://stylelint.io/).
* `npm run lint:fix`: Automatically fixes JavaScript and CSS code problems where possible.
* `npm run format`: Formats the code using [Prettier](https://prettier.io/).
* `npm run lint:md-docs`: Checks Markdown documentation.
* `npm run lint:pkg-json`: Validates package.json files.

**Additional Development Commands:**
* `npm run create-block`: Scaffold a new block using the custom block creation script.
* `npm run make-pot`: Generates translation files for internationalization.
* `npm run plugin-zip`: Creates a distributable zip file of the plugin.

### Development Environment
It is up to you to set up your development environment. You can use the built-in development environment using [wp-env](https://www.npmjs.com/package/@wordpress/env):

* `npm run wp-env start`: Starts the development environment (typically available at `http://localhost:8888/`).
* `npm run wp-env stop`: Stops the development environment.

### Block Development

When contributing new blocks or modifying existing ones:

1. Use the `npm run create-block` command to scaffold new blocks.
2. Follow the established directory structure in the `src/` folder.
3. Ensure your blocks are properly registered and follow WordPress block development standards.
4. Test your blocks thoroughly in the Gutenberg Editor and Exoole Editor.
5. Include proper block.json configuration files.
6. Add appropriate translations using the `exoole` text domain.

### Brand Guidelines

When contributing UI elements or styling, please consider Exoole's brand colors:

- Primary Green: `#33f078`
- Dark: `#1e1e1e`
- Blue: `#3858e9`

These colors are inspired by the [WordPress User Color Modern](https://make.wordpress.org/design/handbook/design-guide/foundations/colors/) palette.

### Submitting Your Contribution

1. Fork the repository and create a new branch for your feature or fix.
2. Make your changes following the guidelines above.
3. Run the linting commands to ensure code quality.
4. Test your changes thoroughly.
5. Commit your changes with clear, descriptive commit messages.
6. Push your branch and create a pull request.
7. Provide a clear description of your changes and any relevant context.

Thank you for contributing to Exoole! Your efforts help make this page builder better for the entire WordPress community.