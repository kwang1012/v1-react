import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PublicationCard from 'src/components/PublicationCard';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import ExperienceCard from 'src/components/ExperienceCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData, useProviders, usePublications, useResearchExperiences } from 'src/utils/data-loader';

export default function Home() {
  const [showMoreNews, setShowMoreNews] = useState(false);
  const data = useData({
    news: {
      sort: 'desc',
    },
  });
  const pubs = usePublications('desc', true);
  const providers = useProviders();
  const exps = useResearchExperiences('desc');

  return (
    <div>
      <div className="flex flex-wrap justify-center md:justify-start">
        <img src="/avatar.png" width={182} className="rounded-lg object-cover" />
        <div className="sm:ml-10">
          <h1 className="mb-0">{data.name}</h1>
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <div {...props} />,
            }}
          >
            {data.description}
          </ReactMarkdown>
          <div className="flex text-secondary my-2">
            {providers.map((provider, i) => (
              <FontAwesomeIcon
                key={i}
                className="cursor-pointer mr-4"
                icon={provider.icon}
                size="2x"
                onClick={() => window.open(provider.link, '_blank')}
              />
            ))}
          </div>
          <div>
            Email:{' '}
            <a href={`mailto:${data.email}`} target="_blank">
              <span className="text-blue-500 hover:underline cursor-pointer">{data.email}</span>
            </a>
          </div>
          <div className="mt-2 text-gray-500 leading-5 whitespace-pre-wrap">{data.location}</div>
        </div>
      </div>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">About Me</div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} className="text-blue-500! hover:underline! cursor-pointer" target="_blank" />
            ),
          }}
        >
          {data.about}
        </ReactMarkdown>
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">News</div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        <ul className="pl-6">
          {data.news.slice(0, 2).map((n, i: number) => (
            <ReactMarkdown
              key={i}
              components={{
                p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
              }}
            >
              {`[**${dayjs(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title} ${n.highlighted ? '⭐️' : ''}`}
            </ReactMarkdown>
          ))}
          {showMoreNews &&
            data.news.slice(2).map((n, i: number) => (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
                }}
              >
                {`[**${dayjs(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title}`}
              </ReactMarkdown>
            ))}
        </ul>
        {data.news.length > 2 && (
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setShowMoreNews((show) => !show)}
          >
            {showMoreNews ? 'view less' : 'view more'}
          </span>
        )}
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Selected Publictions
      </div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        {pubs.map((pub, i) => (
          <PublicationCard key={i} pub={pub} />
        ))}
        <Link to="/pubs">
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </motion.section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        viewport={{ once: true }}
      >
        {exps.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} sm />
        ))}
      </motion.section>
    </div>
  );
}
