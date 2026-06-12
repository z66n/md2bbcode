# md2bbcode

A modernized fork of [mcbbs-markdown2bbcode-converter](https://github.com/ustc-zzzz/mcbbs-markdown2bbcode-converter), a frontend utility to convert Markdown to Discuz! flavoured BBCode.

## What's New?

The original repository was built on an older tech stack. This fork has been completely overhauled to ensure compatibility with modern browsers, fix security vulnerabilities, and improve the developer experience:

- **React 18** & **React DOM** (Upgraded from React 16)
- **Material-UI v5** (Migrated from the deprecated `@material-ui/core` v4 to `@mui/material`)
- **TypeScript 5** (Upgraded from TS 3.9)
- **Webpack 5** & modern loaders (Removed deprecated `url-loader` and `source-map-loader` in favor of native Asset Modules)
- **Marked v12** (Upgraded from v0.7 to fix critical ReDoS security vulnerabilities)
- **GitHub Actions** updated to use the latest Node.js LTS and official Pages deployment.

## Features

- Minimal, client-side React + TypeScript frontend
- Converts common Markdown (headings, lists, code, images, links) to Discuz! flavoured BBCode
- No server required, run in the browser

## Quick start

- Open [https://z66n.github.io/md2bbcode](https://z66n.github.io/md2bbcode) in your browser for the built demo.
- Or run locally:

```
npm install
npm start
```

## Build

```
npm run build
```

## Contributing

Contributions and fixes are welcome. Please open issues or pull requests against this repository.

## License

See the `LICENSE` file for licensing information.
