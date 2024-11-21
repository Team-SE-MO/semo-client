const getCurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const getCurrentDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 0-based, so +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return date;
};

const getOneMinuteBefore = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  date.setMinutes(date.getMinutes() - 1);
  date.setHours(date.getHours() + 9);

  return date.toISOString().split('.')[0];
};

const getChartTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  date.setSeconds(date.getSeconds() - 5);
  date.setHours(date.getHours() + 9);

  return date.toISOString().split('.')[0];
};

export { getCurrentDate, getCurrentDateTime, getOneMinuteBefore, getChartTime };
