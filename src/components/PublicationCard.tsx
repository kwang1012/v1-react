import { useState } from 'react';

type Props = {
  pub: {
    title: string;
    authorList: { name: string; type: string }[];
    venue: { name: string; short: string; url?: string };
    abstract: string;
    url?: string;
    bib?: string;
    code?: string;
    image?: string;
  };
};

export default function PublicationCard({ pub, ...props }: Props) {
  const [showing, setShowing] = useState<null | 'abstract' | 'bib'>(null);
  return (
    <div {...props} className="shadow-md mt-4 border border-solid border-gray-200 p-5 rounded-md flex flex-wrap">
      <div className=" w-30 shrink-0 relative flex items-start flex-col">
        <div
          className={[
            'bg-primary text-white p-1 rounded-md text-sm z-10 top-0',
            pub.venue.url ? 'cursor-pointer' : '',
          ].join(' ')}
          onClick={() => pub.venue.url && window.open(pub.venue.url, '_blank')}
        >
          {pub.venue.short}
        </div>
        {pub.image && <img src={pub.image} width="100%" className="object-contain my-auto" />}
      </div>
      <div className="ml-5 flex-1">
        <div
          className={['font-extrabold line-clamp-2 hover:underline', pub.url ? 'cursor-pointer' : ''].join(' ')}
          onClick={() => pub.url && window.open(pub.url, '_blank')}
        >
          {pub.title}
        </div>
        <div className="my-2 line-clamp-1">
          {pub.authorList.map((author: any, i: number) => (
            <span key={i}>
              <span className={author.name.includes('Kai-Siang Wang') ? 'font-bold' : ''}>
                {author.name}
                {/* {author.type === 'First Author' && '*'} */}
              </span>
              {i !== pub.authorList.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
        <div className="italic line-clamp-2">{pub.venue.name}</div>
        <div className="flex mt-3">
          <span>
            [
            <a
              className="cursor-pointer text-blue-500! hover:underline!"
              onClick={() => setShowing((value) => (value === 'abstract' ? null : 'abstract'))}
            >
              Abstract
            </a>
            ]
          </span>
          <span>
            [
            <a
              className="cursor-pointer text-blue-500! hover:underline!"
              href={pub.url}
              rel="noreferrer"
              target="_blank"
            >
              Paper
            </a>
            ]
          </span>
          {pub.bib && (
            <span>
              [
              <a
                className="cursor-pointer text-blue-500! hover:underline!"
                onClick={() => setShowing((value) => (value === 'bib' ? null : 'bib'))}
              >
                Bibtex
              </a>
              ]
            </span>
          )}
          {pub.code && (
            <span>
              [
              <a
                className="cursor-pointer text-blue-500! hover:underline!"
                href={pub.code}
                rel="noreferrer"
                target="_blank"
              >
                Code
              </a>
              ]
            </span>
          )}
        </div>
        {showing === 'abstract' && <div className="mt-5 whitespace-pre-wrap text-sm">{pub.abstract}</div>}
        {showing === 'bib' && pub.bib && <div className="mt-5 whitespace-pre-wrap text-sm">{pub.bib}</div>}
      </div>
    </div>
  );
}
