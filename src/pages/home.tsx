import React from 'react';
import { simpleProviders } from 'src/const';
import { onClickProvider } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SimplePublicationCard from 'src/components/SimplePublicationCard';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExperienceCard from 'src/components/ExperienceCard';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Link } from 'react-router-dom';
import { getPubs } from 'src/const/pubs';
import { getRExps } from 'src/const/exps';
import { getNews } from 'src/const/news';

gsap.registerPlugin(ScrollTrigger);

const pubs = getPubs('desc', true);
const exps = getRExps('desc');
const news = getNews('desc');

export default function Home() {
  const [showMoreNews, setShowMoreNews] = useState(false);
  const setting = useSelector((state: RootState) => state.setting);

  const mainRef = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count == 0) {
      setCount(1);
      return;
    }
    const q = gsap.utils.selector(mainRef);
    const sectionList = q('section');
    sectionList.forEach((section) => {
      gsap.from(section, {
        ease: 'power3',
        duration: 1.2,
        opacity: 0,
        y: 50,
        scrollTrigger: section,
      });
    });
  }, [mainRef, count]);

  return (
    <div ref={mainRef}>
      <div className="flex flex-wrap justify-center md:justify-start">
        <img src="/avatar.jpg" width={182} height={182} className="rounded-full object-cover" />
        <div className="ml-10">
          <h1 className="mb-0">Kai Wang</h1>
          <div>
            A second-year PhD student @ <span className="font-bold">UIUC</span>
          </div>
          <div className="flex text-secondary my-2">
            {simpleProviders.map((provider, i) => (
              <FontAwesomeIcon
                key={i}
                className="cursor-pointer mr-4"
                icon={provider}
                size="2x"
                onClick={() => onClickProvider(provider as string, setting)}
              />
            ))}
          </div>
          <div>
            Email:{' '}
            <a href="mailto:kw37@illinois.edu" target="_blank">
              <span className="text-blue-500 hover:underline cursor-pointer">kw37@illinois.edu</span>
            </a>
          </div>
          <div className="mt-2 text-gray-500 leading-5">
            Room #3111, Thomas M. Siebel Center
            <br />
            201 N. Goodwin Avenue, Urbana, IL, 61801, USA
          </div>
        </div>
      </div>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">About Me</div>
      <section>
        <p>
          I am a second-year Ph.D. student at the{' '}
          <a className="text-blue-500 hover:underline cursor-pointer" href="https://illinois.edu/" target="_blank">
            University of Illinois at Urbana-Champaign
          </a>
          , working with Prof.{' '}
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            href="https://indy.cs.illinois.edu/"
            target="_blank"
          >
            Indy Gupta
          </a>{' '}
          as a member of the{' '}
          <a className="text-blue-500 hover:underline cursor-pointer" href="https://dprg.cs.uiuc.edu/" target="_blank">
            Distributed Protocols Research Group (DPRG)
          </a>
          .
        </p>
        Before starting my Ph.D., I received my Bachelor's and Master's degrees from{' '}
        <a
          className="text-blue-500 hover:underline cursor-pointer"
          href="https://nthu-en.site.nthu.edu.tw/"
          target="_blank"
        >
          National Tsing Hua University
        </a>
        , Taiwan.
        <p>
          My research interest covers topics around Systems for ML, Internet of Things, Cloud Computing, and Algorithmic
          optimization.
        </p>
        <p>Currently, I am especially interested in and focus on:</p>
        <ul>
          <li className="font-bold">LLM Serving</li>
          <li>Pipeline Parallelism with Churns</li>
          <li>GPU cluster orchestration</li>
        </ul>
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">News</div>
      <section>
        <ul className="pl-6">
          {news.slice(0, 2).map((n, i: number) => (
            <ReactMarkdown
              key={i}
              components={{
                p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
              }}
            >
              {`[**${moment(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title} ${n.highlighted ? '⭐️' : ''}`}
            </ReactMarkdown>
          ))}
          {showMoreNews &&
            news.slice(2).map((n, i: number) => (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ className, children }) => <li className={className + ' mb-2'}>{children}</li>,
                }}
              >
                {`[**${moment(n.date, 'MM/DD/YYYY').format('MMM YYYY')}**] ${n.title}`}
              </ReactMarkdown>
            ))}
        </ul>
        {news.length > 2 && (
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setShowMoreNews((show) => !show)}
          >
            {showMoreNews ? 'view less' : 'view more'}
          </span>
        )}
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Selected Publictions
      </div>
      <section>
        {pubs.map((pub, i) => (
          <SimplePublicationCard key={i} pub={pub} />
        ))}
        <Link to="/pubs">
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </section>
      {/* <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">Blog</div>
      <section>
        <p>
          A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use
          Mandarin for some posts. Despite me being a CS student, this will not be a technical blog.
        </p>
        {posts?.map((post, i) => (
          <div key={i}>
            <ul className="pl-6">
              <li>
                [{moment(post.createdAt).format('MM/DD/YYYY')}]{' '}
                <Link href={`/blog/${post.slug}`}>
                  <a className="cursor-pointer text-blue-500 hover:underline">{post.title}</a>
                </Link>
              </li>
            </ul>
            <div className="pl-4 italic line-clamp-2 border-0 border-l-4 border-gray-300 border-solid">
              {post.abstract}
            </div>
          </div>
        ))}
        <Link href="/blog">
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </section> */}
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <section>
        {exps.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} sm />
        ))}
      </section>
      {/* <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Academic Services
      </div>
      <section>
        <p>Coming Soon</p>
      </section> */}
    </div>
  );
}
