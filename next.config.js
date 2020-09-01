const path = require('path');
require('dotenv').config();

// const slug = require('remark-slug');
// const mdxTableOfContents = require('./lib/toc-module');

// const withMDX = require('@next/mdx')({
//   extension: /\.(md|mdx)$/,
//   options: {
//     remarkPlugins: [slug],
//     compilers: [mdxTableOfContents],
//   },
// });

// module.exports = withMDX({
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
//   webpack: config => {
//     config.module.rules.push({
//       test: /\.(md|mdx)$/,
//       use: path.join(__dirname, './lib/fm-loader'),
//     });

//     config.node = {
//       fs: 'empty',
//     };

//     return config;
//   },
// });

module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      // test: /\.md?$/,
      use: [
        options.defaultLoaders.babel,
        'raw-loader',
        // path.join(__dirname, './lib/fm-loader'),
      ],
    });
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
