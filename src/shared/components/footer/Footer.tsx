import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../auth/auth';
import { LoginModal, LogoutModal } from '../../../routes/login/Login';

interface FooterLinkProps {
  children: React.ReactNode | string;
  onClick?: () => void;
}
export const FooterLink = ({ children, onClick }: FooterLinkProps) => {
  return (
    <button
      className="mb-3 py-2 text-left font-raleway text-xl text-white transition hover:scale-105"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      {loginModal &&
        (getAccessToken() ? (
          <LogoutModal toggleModal={() => setLoginModal(false)} />
        ) : (
          <LoginModal toggleModal={() => setLoginModal(false)} />
        ))}
      <div className="bg-landing bg-cover bg-center bg-no-repeat">
        <div className="p-4 backdrop-blur-md">
          <div className="md:flex">
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
            onClick={() => setLoginModal(true)}
            className="absolute bottom-4 right-4"
          >
            <Icon
              icon="ic:twotone-admin-panel-settings"
              width={30}
              className="text-white"
            />
          </button>
          <p className="mx-auto text-center font-lato font-light text-white">
            © {new Date().getFullYear()} NeuroExed
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
