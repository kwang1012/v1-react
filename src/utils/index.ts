import { RootState } from 'src/store';
import moment from 'moment';
import { useSelector } from 'react-redux';

export const format = (date: string | Date) => {
  if (typeof date === 'string') date = new Date(date);
  if (date.getMinutes()) return moment(date).format('h:m a');
  else return moment(date).format('h a');
};

export function onClickProvider(provider: string, setting: any) {
  switch (provider) {
    case 'facebook':
      window.open('https://www.facebook.com/kwang871012', '_blank');
      break;
    case 'instagram':
      window.open('https://www.instagram.com/kwang871012', '_blank');
      break;
    case 'twitter':
      window.open('https://twitter.com/kwang871012', '_blank');
      break;
    case 'google-scholar':
      window.open('https://scholar.google.com/citations?hl=en&user=wE-FPxoAAAAJ', '_blank');
      break;
    default: {
      if (provider.includes('cv')) window.open("/CV.pdf", '_blank');
      else if (provider.includes('google-scholar'))
        window.open('https://scholar.google.com/citations?hl=en&user=h_G1PyIAAAAJ', '_blank');
      else if (provider.includes('github')) window.open('https://github.com/kwang1012', '_blank');
      else if (provider.includes('twitter')) window.open('https://twitter.com/kwang871012', '_blank');
    }
  }
}

export function classNames(classes: Object | Array<any>) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
}

export function flat(array: any[]) {
  var result: any[] = [];
  array.forEach(function (a) {
    result.push(a);
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children));
    }
  });
  return result;
}

export function normalize(data: any) {
  const isObject = (data: any) => Object.prototype.toString.call(data) === '[object Object]';
  const isArray = (data: any) => Object.prototype.toString.call(data) === '[object Array]';

  const flatten = (data: any) => {
    if (!data.attributes) return data;

    return {
      id: data.id ? data.id : null,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item: any) => normalize(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = normalize(data[key]);
    }

    return data;
  }

  return data;
}
