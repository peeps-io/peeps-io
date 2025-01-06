module.exports = {
  experimental: {
    appDir: true, // Ensure the app router is enabled
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
};
