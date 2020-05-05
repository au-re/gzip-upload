[![exhibit banner](https://raw.githubusercontent.com/au-re/lib-template/master/static/assets/icon.png)](https://github.com/au-re/lib-template)
[![License](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)](https://github.com/au-re/lib-template/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/au-re/react-exhibit-template/status.svg?style=flat-square)](https://david-dm.org/au-re/react-exhibit-template)
[![devDependencies Status](https://david-dm.org/au-re/react-exhibit-template/dev-status.svg?style=flat-square)](https://david-dm.org/au-re/react-exhibit-template?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Scripts

A set of scripts are provided for you to test, build and analyze the project. Have a look at [create react app](https://github.com/facebook/create-react-app) for more information.

### Test

You can run all tests in the project with the following command:

```sh
npm run test
```

You can also generate a website with information on the code coverage with:

```sh
npm run test -- --coverage
```

This will generate a website in the folder `coverage`. You can launch it with any server of your
choice, for example [serve](https://www.npmjs.com/package/serve).

```sh
npm i -g serve && serve coverage
```

### Build

You can build a production ready version of your library by running:

```sh
npm run build
```

This will create a build folder containing your library.

You can also build a production ready version of your documentation by running:

```sh
npm run build:storybook
```

This will create a folder called `storybook-static` with your documentation.

### Deploy

After building your documentation, you can deploy it as a gh-page.
Make sure to add a homepage entry in your `package.json` like so:

```json
{
  "homepage": "https://my-github-name.github.io/my-library/",
}
```

Then simply run:
```sh
npm run deploy
```

You can also publish your library to `npm`. To do that, simply run:

```sh
npm publish
```

### Dependency map

You can generate a map of all dependencies, this can be very useful when trying to identify a
library causing bloat to the application. After building your application you can generate a map,
by running:

```sh
npm run analyze
```

This will look into your `build` folder and open an interactive map of the dependencies in your
browser.

## License

[ISC](https://github.com/au-re/react-exhibit-template/blob/master/LICENSE)
