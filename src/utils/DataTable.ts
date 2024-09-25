export function getRowNumber({
  index,
  page,
  size,
}: {
  page: number;
  size: number;
  index: number;
}): number {
  return (page - 1) * size + (index + 1);
}
