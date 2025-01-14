module.exports = {
  siteUrl: "https://ainzx.com", // Replace with your site URL
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 5000, // Split sitemap if there are more than 5000 entries
  exclude: [], // Exclude specific pages from the sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://yourwebsite.com/custom-sitemap-1.xml", // Additional sitemaps if needed
    ],
  },
};
