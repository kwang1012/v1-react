import { ComponentRef, useState } from 'react';
import ContactCard from 'src/components/ContactCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useData, useProviders } from 'src/utils/data-loader';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function MiscellaneousView() {
  const [open, setOpen] = useState(false);
  const providers = useProviders();
  const data = useData();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const card = useRef<ComponentRef<typeof ContactCard>>(null);

  return (
    <>
      <div className="relative mt-24">
        <motion.div
          className="absolute -top-15 left-1/2 -translate-x-1/2 z-1"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <img src="/avatar.png" width={150} height={150} className="rounded-full object-cover shadow-app" />
        </motion.div>
        <motion.div
          className="mt-20 pt-24 max-w-[600px] mx-auto bg-[#f8f9fb] dark:bg-[#131313] rounded-md shadow-app flex flex-col items-center text-center duration-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex flex-col items-center self-stretch">
            <h2 className="mb-2">{data.miscellaneous.name}</h2>
            {/* <div className="text-gray-400 text-sm mt-2 tracking-tighter">{data.miscellaneous.description}</div> */}
            {/* <div className="text-sm px-8 pb-2 text-justify leading-[1.2] tracking-tighter">
              <ReactMarkdown>{data.miscellaneous.detail}</ReactMarkdown>
            </div> */}
            <div>
              Email:{' '}
              <a href={`mailto:${data.email}`} target="_blank">
                <span className="text-blue-500 hover:underline cursor-pointer">{data.email}</span>
              </a>
            </div>
            <div className="mt-2 text-gray-500 leading-5 whitespace-pre-wrap">{data.location}</div>
            {/* <div className="text-md tracking-tighter py-3 self-stretch">Interests: {data.miscellaneous.interests}</div> */}
            <div className="py-3 border-0 border-gray-300 border-solid self-stretch border-t mt-5">
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
            {/* <div className="py-3 border-0 border-gray-300 border-solid self-stretch border-t">
              <Button
                variant="contained"
                disableElevation
                sx={{}}
                size="small"
                className="normal-case"
                onClick={() => window.open(`mailto:${data.email}`, '_blank')}
              >
                Email me
              </Button>
              <div className="my-1 text-sm">or</div>
              <Button
                onClick={handleClickOpen}
                sx={{}}
                variant="contained"
                disableElevation
                size="small"
                className="normal-case"
              >
                Send message
              </Button>
            </div> */}
          </div>
        </motion.div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Drop me a line</DialogTitle>
        <DialogContent>
          <ContactCard inputOnly ref={card} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-[#a9a9a9]">
            Cancel
          </Button>
          <Button
            onClick={() => {
              card.current?.submit().then(() => {
                setOpen(false);
              });
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
