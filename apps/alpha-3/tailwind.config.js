const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const defaultPresets = require('../../configs/tailwind.config');

module.exports = {
  content: [
    join(
      __dirname,
      '{components,app,libs}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [defaultPresets],
};
