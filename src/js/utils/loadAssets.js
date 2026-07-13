function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

function preloadFonts() {
  if (!document.fonts) return Promise.resolve();
  return document.fonts.ready;
}

export async function preloadAssets(imageSources = [], onProgress = () => {}) {
  const total = imageSources.length + 1;
  let loaded = 0;

  const bump = () => {
    loaded += 1;
    onProgress(Math.round((loaded / total) * 100));
  };

  await Promise.all([
    preloadFonts().then(bump),
    ...imageSources.map((src) => preloadImage(src).then(bump)),
  ]);
}
