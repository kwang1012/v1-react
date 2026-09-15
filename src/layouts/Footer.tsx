import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { getEvents } from 'src/utils';

export default function Footer() {
  const [events, setEvents] = useState([]);
  async function updateEvents(isMounted: boolean) {
    getEvents(true)
      .then((events) => {
        if (isMounted) setEvents(events);
      })
      .catch(console.log);
  }
  const year = new Date().getFullYear();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (window.location.hostname.startsWith('localhost')) {
      console.log('Skipping MapMyVisitors in local dev');
      return;
    }

    let isMounted = true;
    updateEvents(isMounted);

    // map script
    const script = document.createElement('script');

    script.src =
      '//mapmyvisitors.com/map.js?cl=ffffff&w=a&t=m&d=GbeRkUaa1BgogUCGorQ2dSq_oHkKdq8nu9SvmgnN9dw&co=cc3363&cmo=ff7272&cmn=78f778';
    script.id = 'mapmyvisitors';

    script.onload = () => {
      if (isMounted) setLoading(false);
    };

    script.onerror = () => {
      console.log('failed to load map');
    };

    document.getElementById('map-container')?.appendChild(script);
    return () => {
      isMounted = false;
      try {
        document.getElementById('map-container')?.removeChild(script);
      } catch {
        console.warn('Failed to remove map script');
      }
    };
  }, []);

  return (
    <div className="text-center mt-40 flex flex-col justify-end p-5">
      <div className="flex justify-center flex-wrap gap-4">
        <div className="shrink-0 w-[300px] mb-4" id="map-container" key="unique-map"></div>
        <Link to="/schedule">
          <div className="shrink-0 w-[300px] h-44">
            <Calendar
              calendarType="hebrew"
              minDetail="year"
              className="hide-navigation tile-center"
              tileClassName={({ date, activeStartDate }) => {
                return date.getMonth() !== activeStartDate.getMonth() ? 'disabled' : '';
              }}
              tileDisabled={({ date, activeStartDate }) => date.getMonth() !== activeStartDate.getMonth()}
              formatShortWeekday={(_, date) => dayjs(date).format('dd')[0]}
              tileContent={({ date }) => {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                if (!events[year] || !events[year][month] || !events[year][month][day]) return <></>;
                return <div className="h-1 w-1 shrink-0 rounded-full bg-primary mx-auto" />;
              }}
              formatDay={(_, date) => date.getDate().toString()}
            />
          </div>
        </Link>
      </div>
      <span className="mt-10">Copyright © 2021-{year} Kai Wang</span>
    </div>
  );
}
