// this setup is for Jest with TypeScript

module.exports = {
  presets: [
    '@babel/typescript',
    '@babel/react',
    ['@babel/env', {
      loose: true,
      targets: { node: 'current' }
    }]
  ]
};