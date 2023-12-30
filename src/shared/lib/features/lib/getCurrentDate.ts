export function getCurrentDate(): string {
  const currentDate: Date = new Date();

  // Извлекаем день, месяц и год из объекта Date
  const day: string = ("0" + currentDate.getDate()).slice(-2);
  const month: string = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const year: number = currentDate.getFullYear();

  // Форматируем дату в нужный формат
  const formattedDate: string = `${day}.${month}.${year}`;

  return formattedDate;
}
