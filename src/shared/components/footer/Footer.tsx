import React, { useState } from 'react';
import { putData } from '../../api/dba';
import { useNavigate } from 'react-router-dom';
import { message } from '../../types/object_schema';
import { FooterLink } from './FooterLink';
import { Icon } from '@iconify/react';
import { Modal } from '../modals/Modal';
import { Button } from '../form/Button';

const BugModalContent = () => {
  const [sent, setSent] = useState(false);
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      {sent && (
        <div className="w-[60vw] rounded bg-white px-2 py-6">
          <p>Bug Reported!</p>
        </div>
      )}
      <div className="w-[90vw] overflow-clip rounded-xl bg-white pb-2 md:w-[60vw]">
        <div className=" bg-dark-hex w-full bg-cover bg-center">
          <p className="p-6 text-6xl font-light text-white">Report a Bug</p>
        </div>
        <div className="mx-auto w-full rounded p-4 shadow-lg md:w-4/5">
          <div className="pb-2">
            <p>Location</p>
            <input
              className="w-full outline-none"
              value={location}
              placeholder="location of bug..."
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div>
            <p>Description</p>
            <textarea
              className="w-full rounded border-0 p-0"
              value={content}
              placeholder="description of bug..."
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <button
          className="mx-auto mt-2 block rounded bg-blue-300 px-2"
          onClick={async () => {
            var timestamp = new Date().getTime();

            await putData(
              'messages',
              message(
                'error-' + timestamp,
                'Error Reporter',
                location,
                content,
                timestamp,
              ),
            );

            setContent('');
            setLocation('');
            setSent(true);
          }}
        >
          send
        </button>
      </div>
    </>
  );
};

const EmailModalContent = () => {
  const [sent, setSent] = useState(false);
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  if (sent) {
    return (
      <div className="w-[60vw] rounded bg-white px-2 py-6">
        <p>Message Sent!</p>
      </div>
    );
  } else {
    return (
      <div className="w-[90vw] overflow-clip rounded-xl bg-white pb-2 md:w-[60vw]">
        <div className=" bg-dark-hex w-full bg-cover bg-center">
          <p className="p-6 text-6xl font-light text-white">
            Contact NeuroExed
          </p>
        </div>

        <div className="mx-auto w-full rounded p-4 shadow-lg md:w-4/5">
          <div className="w-full">
            <p className="text-xl">From</p>
            <input
              value={from}
              className="w-full focus:outline-none"
              placeholder="email or name"
              onChange={(event) => {
                setFrom(event.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Subject</p>
            <input
              value={subject}
              className="w-full focus:outline-none"
              placeholder="topic of message"
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Message</p>
            <textarea
              value={content}
              className="w-full rounded border-0 p-0 focus:outline-none"
              placeholder="Hey there,"
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <button
          className="mx-auto my-4 block rounded bg-blue-300 px-2"
          onClick={async () => {
            const timestamp = new Date().getTime();

            await putData(
              'messages',
              message(
                'message-' + timestamp,
                from,
                subject,
                content,
                timestamp,
              ),
            );

            setFrom('');
            setSubject('');
            setContent('');

            setSent(true);
          }}
        >
          send
        </button>
      </div>
    );
  }
};

const Footer = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <Modal className="h-min md:w-2/5" closeModal={() => setModal(false)}>
          <div className="mx-auto flex h-full flex-col border md:p-12">
            <div className="my-auto py-8">
              <h1 className="text-center font-lato text-4xl font-light">
                Login
              </h1>
              <p className="py-4 text-center font-lato font-light">
                Entering the administrative portal requires a login. <br />{' '}
                Please enter your credentials below
              </p>

              <div className="my-5">
                <p className="text-center font-lato text-gray-600">
                  Username or Email
                </p>
                <div className="mx-auto flex rounded-lg bg-gray-200 p-2 md:w-2/5">
                  <Icon icon="solar:user-bold-duotone" className="my-auto" />
                  <input className="my-auto w-full border-0 bg-transparent pl-1 font-lato font-light outline-0" />
                </div>
              </div>
              <div className="my-5">
                <p className="text-center font-lato text-gray-600">Password</p>
                <div className="mx-auto flex rounded-lg bg-gray-200 p-2 md:w-2/5">
                  <Icon
                    icon="solar:lock-password-bold-duotone"
                    className="my-auto"
                  />
                  <input
                    className="my-auto w-full border-0 bg-transparent py-0 pl-1 font-lato font-light outline-0 ring-0"
                    type="password"
                  />
                </div>
              </div>
              <Button color="blue" title="login" className="mx-auto block" />
              <br />
              <br />
              <hr />
              <div className="mx-auto mt-6 flex w-fit">
                <Icon icon="twemoji:brain" width={40} />
                <span className="my-auto font-lato text-3xl font-light">
                  Neuroexed
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="bg-landing bg-cover bg-center bg-no-repeat">
        <div className="p-4 backdrop-blur-md">
          <div className="flex">
            <div className="mx-4 w-full border-b border-white p-4 md:w-1/3">
              <p className="border-b border-white font-lato text-2xl font-light uppercase text-white">
                OUTREACH
              </p>
              <div className="flex flex-col p-2">
                <FooterLink
                  onClick={() =>
                    (window.location.href = 'http://otherlobe.com/')
                  }
                >
                  The Other Lobe Blog
                </FooterLink>
                <FooterLink onClick={() => navigate('/publications')}>
                  Our Lab's Publications
                </FooterLink>
                <FooterLink
                  onClick={() =>
                    (window.location.href =
                      'https://experienced.simplecast.com/')
                  }
                >
                  Simplecast Podcast
                </FooterLink>
              </div>
            </div>
            <div className="mx-4 w-full border-b border-white p-4 md:w-1/3">
              <p className="border-b border-white font-lato text-2xl font-light uppercase text-white">
                AFFILIATES
              </p>
              <div className="flex flex-col p-2">
                <FooterLink
                  onClick={() =>
                    (window.location.href = 'https://waceinc.org/')
                  }
                >
                  World Association of Cooperative Education
                </FooterLink>
                <FooterLink
                  onClick={() =>
                    (window.location.href =
                      'https://thecenterforsympatheticintelligence.org/')
                  }
                >
                  Center for Sympathetic Intelligence
                </FooterLink>
                <FooterLink
                  onClick={() =>
                    (window.location.href = 'https://www.iq4.com/')
                  }
                >
                  IQ4 Transforming the Learning Economy
                </FooterLink>
              </div>
            </div>
            <div className="mx-4 w-full border-b border-white p-4 md:w-1/3 ">
              <p className="border-b border-white font-lato text-2xl font-light uppercase text-white">
                CONTACT
              </p>
              <div className="flex flex-col p-2">
                {/* onClick={() => Modal(<EmailModalContent />)} */}
                <FooterLink>send us a message</FooterLink>
                <FooterLink onClick={() => navigate('/people')}>
                  email a staff member
                </FooterLink>
                {/* onClick={() => Modal(<BugModalContent />)} */}
                <FooterLink>report a bug</FooterLink>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="mx-auto flex pb-8 text-white">
            <a
              href="#footer"
              className="mx-auto flex gap-x-2 font-lato text-lg font-light text-white"
            >
              <Icon icon="simple-icons:github" className="my-auto" />
              <span className="my-auto">
                view this page's source on github{' '}
              </span>
            </a>
          </div>

          <button
            onClick={() => setModal(true)}
            className="absolute bottom-4 right-4"
          >
            {/* <Icon icon='fxemoji:lock' width={30}/> */}
            {/* <Icon icon='eos-icons:admin-outlined' width={30} className='text-white'/> */}
            <Icon
              icon="ic:twotone-admin-panel-settings"
              width={30}
              className="text-white"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
