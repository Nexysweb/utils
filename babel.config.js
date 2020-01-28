const { BabelConfig } = require('@nexys/babelsetup');

BabelConfig.plugins.push("@babel/plugin-transform-typescript")
console.log(BabelConfig)

module.exports = BabelConfig;