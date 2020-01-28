const { BabelConfig } = require('@nexys/babelsetup');

BabelConfig.plugins.push("@babel/plugin-transform-typescript");
BabelConfig.presets.push('@babel/typescript');

module.exports = BabelConfig;