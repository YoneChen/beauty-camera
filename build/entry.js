const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  handFire: {
    import: resolve('../src/views/hand-fire/index.ts'),
    dependOn: 'core',
  },
  faceMagic: {
    import: resolve('../src/views/face-magic/index.ts'),
    dependOn: 'core',
  },
  filterEffect: {
    import: resolve('../src/views/filter-effect/index.ts'),
    dependOn: 'core',
  },
  faceBeauty: {
    import: resolve('../src/views/face-beauty/index.ts'),
    dependOn: 'core',
  },
}
