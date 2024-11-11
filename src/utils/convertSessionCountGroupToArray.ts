export function convertSessionCountGroupToArray(
  groupData: Record<string, { name: string; value: number }[]>
): Record<string, { name: string; value: number }[]> {
  const convertedData: Record<string, { name: string; value: number }[]> = {};

  Object.entries(groupData).forEach(([timestamp, data]) => {
    convertedData[timestamp] = data;
  });

  return convertedData;
}
