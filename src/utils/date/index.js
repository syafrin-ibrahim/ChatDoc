export const getChatTime = date => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = xdate => {
  const year = xdate.getFullYear();
  const month = xdate.getMonth() + 1;
  const date = xdate.getDate();

  return `${year}-${month}-${date}`;
};
