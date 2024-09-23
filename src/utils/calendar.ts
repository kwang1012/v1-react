// const calendar = google.calendar({
//   version: 'v3',
//   auth,
// });

import axios from 'axios';

const calendarId = ['bruce1198@gmail.com'];

async function getEventsByCalendarId(year: string | number, month: string | number, cid: string) {
  year = Number(year);
  month = Number(month);
  const startYear = month === 1 ? year - 1 : year;
  let startMonth = (((month - 1) % 12) + 12) % 12;
  if (startMonth === 0) startMonth = 12;
  const endYear = month === 12 ? year + 1 : year;
  let endMonth = (((month + 1) % 12) + 12) % 12;
  if (endMonth === 0) endMonth = 12;
  let pageToken;
  let returnItems: any[] = [];
  do {
    const {
      data: { items, nextPageToken },
    } = (await axios.get(`https://next-me-simple.vercel.app/api/schedule`, {
      params: {
        year: year,
        month: month,
      },
      data: {
        // pageToken,
        // singleEvents: true,
        // timeMin: `${startYear}-${startMonth}-01T00:00:00-08:00`,
        // timeMax: `${endYear}-${endMonth}-28T00:00:00-08:00`,
        // orderBy: 'startTime',
      },
    })) as { data: any };
    returnItems = returnItems.concat(items);
    pageToken = nextPageToken;
  } while (pageToken);
  return returnItems;
}

export async function getEvents(year: string | number, month: string | number) {
  if (typeof calendarId === 'string') return getEventsByCalendarId(year, month, calendarId);

  let returnItems: any[] = [];
  for (const cid of calendarId) {
    try {
      const items = await getEventsByCalendarId(year, month, cid);
      returnItems = returnItems.concat(items);
    } catch (e: any) {
      console.log(e.message);
    }
  }
  return returnItems;
}
