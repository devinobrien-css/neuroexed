import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../auth/auth';
import { LoginModal, LogoutModal } from '../../../routes/login/Login';
import { motion } from 'framer-motion';

interface FooterLinkProps {
  children: React.ReactNode | string;
  onClick?: () => void;
}

export const FooterLink = ({ children, onClick }: FooterLinkProps) => {
  return (
    <motion.button
      className="mb-3 flex items-center gap-2 py-2 text-left font-raleway text-white/90 transition hover:translate-x-1 hover:text-white"
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      {loginModal &&
        (getAccessToken() ? (
          <LogoutModal toggleModal={() => setLoginModal(false)} />
        ) : (
          <LoginModal toggleModal={() => setLoginModal(false)} />
        ))}
      <footer className="relative overflow-hidden">
        {/* Top wave divider */}
        <div className="absolute inset-x-0 top-0 h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 left-0 w-full text-white"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,218.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Main footer content */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pt-20">
          <div className="relative">
            {/* Neural network decoration */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated dots */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-white opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Glowing orbs */}
              <motion.div
                className="absolute -left-20 bottom-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-tiffany-blue/10 blur-3xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              />
            </div>

            {/* Footer content with backdrop blur */}
            <div className="px-8 py-16 backdrop-blur-md backdrop-brightness-[0.7]">
              <div className="mx-auto max-w-7xl">
                {/* Logo and tagline */}
                <div className="mb-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="font-raleway text-3xl font-light text-white">
                      <span className="bg-gradient-to-r from-tiffany-blue to-blue-400 bg-clip-text text-transparent">
                        NeuroExed
                      </span>
                    </h2>
                    <p className="mt-2 font-lato text-sm font-light text-white/70">
                      Center for Neuroscience and Experiential Education
                    </p>
                  </motion.div>
                </div>

                {/* Footer sections */}
                <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
                  {/* Outreach section */}
                  <motion.div
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="mb-4 border-b border-white/20 pb-2 font-lato text-xl font-light uppercase tracking-wider text-white">
                      Outreach
                    </h3>
                    <div className="flex flex-col space-y-1">
                      <FooterLink
                        onClick={() =>
                          (window.location.href = 'http://otherlobe.com/')
                        }
                      >
                        <Icon icon="tabler:external-link" className="h-5 w-5" />
                        <span>The Other Lobe Blog</span>
                      </FooterLink>
                      <FooterLink onClick={() => navigate('/publications')}>
                        <Icon icon="tabler:book" className="h-5 w-5" />
                        <span>Our Lab's Publications</span>
                      </FooterLink>
                      <FooterLink
                        onClick={() =>
                          (window.location.href =
                            'https://experienced.simplecast.com/')
                        }
                      >
                        <Icon icon="tabler:microphone-2" className="h-5 w-5" />
                        <span>Simplecast Podcast</span>
                      </FooterLink>
                    </div>
                  </motion.div>

                  {/* Affiliates section */}
                  <motion.div
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="mb-4 border-b border-white/20 pb-2 font-lato text-xl font-light uppercase tracking-wider text-white">
                      Affiliates
                    </h3>
                    <div className="flex flex-col space-y-1">
                      <FooterLink
                        onClick={() =>
                          (window.location.href = 'https://waceinc.org/')
                        }
                      >
                        <Icon
                          icon="tabler:brand-open-source"
                          className="h-5 w-5"
                        />
                        <span>World Association of Cooperative Education</span>
                      </FooterLink>
                      <FooterLink
                        onClick={() =>
                          (window.location.href =
                            'https://thecenterforsympatheticintelligence.org/')
                        }
                      >
                        <Icon icon="tabler:brain" className="h-5 w-5" />
                        <span>Center for Sympathetic Intelligence</span>
                      </FooterLink>
                      <FooterLink
                        onClick={() =>
                          (window.location.href = 'https://www.iq4.com/')
                        }
                      >
                        <Icon icon="tabler:bulb" className="h-5 w-5" />
                        <span>IQ4 Transforming the Learning Economy</span>
                      </FooterLink>
                    </div>
                  </motion.div>

                  {/* Connect section */}
                  <motion.div
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="mb-4 border-b border-white/20 pb-2 font-lato text-xl font-light uppercase tracking-wider text-white">
                      Connect
                    </h3>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center gap-2 text-white/90">
                        <Icon
                          icon="tabler:map-pin"
                          className="h-5 w-5 text-tiffany-blue"
                        />
                        <span>Albany, NY</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Icon
                          icon="tabler:mail"
                          className="h-5 w-5 text-tiffany-blue"
                        />
                        <a
                          href="mailto:info@neuroexed.com"
                          className="hover:text-white hover:underline"
                        >
                          info@neuroexed.com
                        </a>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <motion.a
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon icon="tabler:brand-twitter" />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon icon="tabler:brand-linkedin" />
                        </motion.a>
                        <motion.a
                          href="#"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon icon="tabler:brand-youtube" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom section with GitHub link */}
                <div className="mt-16 border-t border-white/20 pt-8">
                  <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    {/* GitHub button */}
                    <motion.a
                      href="https://github.com/devinobrien-css/neuroexed"
                      className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-lato text-white backdrop-blur-sm transition-all hover:bg-white/20"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon icon="tabler:brand-github" className="h-5 w-5" />
                      <span>View source on GitHub</span>
                    </motion.a>

                    {/* Copyright text */}
                    <p className="text-center font-lato text-sm font-light text-white/70 md:text-right">
                      © {currentYear} NeuroExed • Center for Neuroscience and
                      Experiential Education
                    </p>

                    {/* Admin button */}
                    <motion.button
                      onClick={() => setLoginModal(true)}
                      className="rounded-full bg-white/10 p-2.5 backdrop-blur-sm transition-all hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Admin settings"
                    >
                      <Icon
                        icon="tabler:settings"
                        className="h-5 w-5 text-white"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
