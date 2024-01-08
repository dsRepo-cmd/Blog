export function getCurrentDate(): string {
  const currentDate: Date = new Date();

  const day: string = ("0" + currentDate.getDate()).slice(-2);
  const month: string = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const year: number = currentDate.getFullYear();

  const formattedDate: string = `${day}.${month}.${year}`;

  return formattedDate;
}

export const getDate = (time: string): string => {
  const date = new Date(time);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}.${month} ${hours}:${minutes}`;

  return formattedDate;
};

// Format Date '12:25'

export const getTime = (time: string): string => {
  const date = new Date(time);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};

// Format Date  '10 min. ago'

export const getTimeAgoString = (dateString: string): string => {
  const currentDate = new Date();

  const date = new Date(dateString);
  const timeDifference = currentDate.getTime() - date.getTime();
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));

  if (minutesAgo < 60) {
    return `${minutesAgo} ${pluralize(minutesAgo, "minute")} ago`;
  } else if (minutesAgo < 1440) {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} ${pluralize(hoursAgo, "hour")} ago`;
  } else {
    const daysAgo = Math.floor(minutesAgo / 1440);
    return `${daysAgo} ${pluralize(daysAgo, "day")} ago`;
  }
};

const pluralize = (count: number, noun: string): string => {
  if (count === 1) {
    return noun;
  } else {
    return noun + "s";
  }
};

// Format Date  '10.11.2001 11:00'
export function getStandartformatDate(dateString: string): string {
  const date = new Date(dateString);

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return date.toString();
  }

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Format Date  '10.11.2001'
export function getParticalformatDate(dateString: string): string {
  const date = new Date(dateString);

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return date.toString();
  }

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

// Format Date  '25 Oct, 15:20'

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = shortMonths[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month}, ${hours}:${minutes}`;
};
