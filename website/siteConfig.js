/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/4DLogo.gif',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Doc center' /* title for your website */,
  tagline: 'Documentation for 4D Developers',
  url: 'https://arnaud4d.github.io' /* your website url */,
  //baseUrl: '/doc/' /* base url for your project */,
  baseUrl: '/doc/' /* base url for your project */,
// For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'doc',
  organizationName: 'arnaud4D',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'Concepts/doc1', label: 'Docs'},
    {doc: 'doc4', label: 'page4'},
	{href: 'http://doc.4d.com/', label: 'doc.4d.com'},
	{href: 'http://kb.4d.com/', label: 'knowledgebase'},
    {page: 'help', label: 'Help'},
    //{blog: false, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/4DLogo.gif',
  footerIcon: 'img/4dlogo.png',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    //primaryColor: '#2E8555',
    //secondaryColor: '#205C3B',
	//primaryColor: '#696969', gris
    primaryColor: '#004289',
	secondaryColor: '#696969',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' 4D SAS',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/4dlogo.png',
  twitterImage: 'img/4dlogo.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
