import { useEffect, useState } from 'react';
import { fetchHomeData } from '../services/cms';

const initialData = { ambassadors: [], programs: [], events: [], clubs: [], clubPolls: [], faqs: [] };

export function useCmsData() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let isActive = true;

    fetchHomeData().then((nextData) => {
      if (isActive) setData(nextData);
    });

    return () => {
      isActive = false;
    };
  }, []);

  return data;
}
