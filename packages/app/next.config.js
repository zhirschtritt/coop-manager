module.exports = {
  webpack5: true,
  async rewrite() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5000/graphql',
      },
    ];
  },
};
