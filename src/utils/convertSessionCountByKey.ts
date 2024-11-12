interface SessionData {
  name: string;
  value: number;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    [key: string]: Record<string, SessionData[]>;
  };
}

export function convertSessionCountByKey(
  data: ApiResponse['data'],
  key: string
): Record<string, number[]> {
  const targetData = data[key];
  const result: Record<string, number[]> = {};

  Object.entries(targetData).forEach(([timestamp, sessionArray]) => {
    sessionArray.forEach(({ name, value }) => {
      if (!result[name]) {
        result[name] = [];
      }
      result[name].push(value);
    });
  });

  return result;
}
