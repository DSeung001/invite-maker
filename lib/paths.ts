export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function sampleImageSrc(id: string): string {
  return assetPath(`/images/samples/${id}.svg`);
}
