import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

interface SocialMediaPost {
  id: string;
  title: string;
  description: string;
  date: string;
  source: 'news' | 'linkedin' | 'research';
  url: string;
  imageUrl?: string;
  tags: string[];
  author?: string;
}

const SocialMediaSection = () => {
  const [shareDropdownOpen, setShareDropdownOpen] = useState<string | null>(
    null,
  );
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(event.target as Node)
      ) {
        setShareDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Share functionality
  const handleShare = async (post: SocialMediaPost) => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: post.url,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(post.url);
        // Show success feedback (you can replace console.log with a toast notification)
        alert('URL copied to clipboard!');
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(post.url);
        alert('URL copied to clipboard!');
      } catch (clipboardError) {
        alert('Unable to share or copy URL');
      }
    }
  };

  // Social media sharing functions
  const shareToTwitter = (post: SocialMediaPost) => {
    const text = encodeURIComponent(`${post.title} - ${post.description}`);
    const url = encodeURIComponent(post.url);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
    );
  };

  const shareToLinkedIn = (post: SocialMediaPost) => {
    const url = encodeURIComponent(post.url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
    );
  };

  const shareToFacebook = (post: SocialMediaPost) => {
    const url = encodeURIComponent(post.url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
    );
  };

  const copyToClipboard = async (post: SocialMediaPost) => {
    try {
      await navigator.clipboard.writeText(post.url);
      alert('URL copied to clipboard!');
      setShareDropdownOpen(null);
    } catch (error) {
      alert('Unable to copy URL');
    }
  };

  const socialPosts: SocialMediaPost[] = [
    {
      id: '1',
      title: "I've Looked at Higher Education from Both Sides",
      description:
        'James Stellar shares his unique perspective on higher education, drawing from his extensive experience in both academic and administrative roles, offering valuable insights into the educational landscape.',
      date: '2025-01-20',
      source: 'linkedin',
      url: 'https://www.linkedin.com/posts/james-stellar-2139a218_ive-looked-at-higher-education-from-both-activity-7309554256594829312-DL5Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAAClL9z0BtiN6rnyMD65661QKBOu7r3htQzA',
      tags: [
        'Higher Education',
        'Leadership',
        'Academic Perspective',
        'Experience',
      ],
      author: 'James Stellar',
    },
    {
      id: '2',
      title: "Exploring Effects of Pregnancy and Menopause on Alzheimer's Risk",
      description:
        "Dr. Zuloaga's groundbreaking research investigates how hormonal changes during pregnancy and menopause may influence Alzheimer's disease risk, offering new insights into women's brain health.",
      date: '2025-01-15',
      source: 'news',
      url: 'https://www.albany.edu/news-center/news/2025-zuloaga-exploring-effects-pregnancy-and-menopause-alzheimers-risk',
      tags: ["Alzheimer's", "Women's Health", 'Hormones', 'Research'],
      author: 'Pauline Meunier',
    },
    {
      id: '3',
      title: "Great Day at UAlbany's Undergraduate Research Conference",
      description:
        "Our lab members had an amazing time presenting their research at UAlbany's undergraduate research conference, showcasing innovative studies in neuroscience and experiential learning.",
      date: '2024-04-15',
      source: 'linkedin',
      url: 'https://www.linkedin.com/posts/vanessanyblom6801_had-a-great-day-at-ualbanys-undergraduate-activity-7191199474822598656-rZ-p/',
      tags: ['Conference', 'Undergraduate Research', 'Presentation'],
      author: 'Vanessa Nyblom',
    },
    {
      id: '4',
      title: 'Student Scientists Tackle Brain Chemistry & Poliovirus',
      description:
        'Our talented student researchers showcase innovative approaches to understanding brain chemistry and poliovirus mechanisms, demonstrating the next generation of scientific discovery.',
      date: '2023-05-10',
      source: 'research',
      url: 'https://www.albany.edu/news-center/news/2023-showcase-2023-student-scientists-tackle-brain-chemistry-poliovirus',
      tags: ['Student Research', 'Brain Chemistry', 'Poliovirus', 'Innovation'],
      author: 'Vanessa Nyblom',
    },
    {
      id: '5',
      title: 'Incredible Opportunity and Grateful for the Experience',
      description:
        'Nina Pluviose shares her gratitude for an amazing opportunity that has contributed to her growth and development in the neuroscience field, highlighting the positive experiences within our lab community.',
      date: '2024-12-10',
      source: 'linkedin',
      url: 'https://www.linkedin.com/posts/nina-pluviose_im-beyond-grateful-for-the-incredible-opportunity-activity-7285049809034436608-PDgm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAClL9z0BtiN6rnyMD65661QKBOu7r3htQzA',
      tags: [
        'Gratitude',
        'Professional Growth',
        'Lab Experience',
        'Opportunity',
      ],
      author: 'Nina Pluviose',
    },
    {
      id: '6',
      title: 'Perfect Way to Wrap Up the Semester',
      description:
        'Kassandra von Stein celebrates the perfect ending to her semester, showcasing the rewarding experiences and achievements that come from being part of our dynamic neuroscience research community.',
      date: '2024-04-16',
      source: 'linkedin',
      url: 'https://www.linkedin.com/posts/kassandra-von-stein_there-was-no-better-way-to-wrap-up-my-semester-activity-7191242642544885760-AAsI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAClL9z0BtiN6rnyMD65661QKBOu7r3htQzA',
      tags: [
        'Semester Completion',
        'Achievement',
        'Research Experience',
        'Success',
      ],
      author: 'Kassandra von Stein',
    },
  ];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'news':
        return 'tabler:news';
      case 'linkedin':
        return 'tabler:brand-linkedin';
      case 'research':
        return 'tabler:flask';
      default:
        return 'tabler:link';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'news':
        return 'from-blue-500 to-blue-600';
      case 'linkedin':
        return 'from-blue-600 to-blue-700';
      case 'research':
        return 'from-tiffany-blue to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(10,186,181,0.1),transparent_50%)]"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600 p-3">
              <Icon icon="tabler:share" className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-6 font-raleway text-4xl font-light md:text-5xl">
              <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
                Lab Highlights & Activities
              </span>
            </h2>
            <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Stay connected with the latest research breakthroughs, conference
              presentations, and exciting activities from our neuroscience lab
              community.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socialPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={item}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-tiffany-blue/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="dark:border-dark-border dark:bg-dark-surface relative h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Source Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${getSourceColor(
                      post.source,
                    )} px-3 py-1 text-sm font-medium text-white`}
                  >
                    <Icon
                      icon={getSourceIcon(post.source)}
                      className="mr-2 h-4 w-4"
                    />
                    {post.source.charAt(0).toUpperCase() + post.source.slice(1)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Content */}
                <h3 className="dark:text-dark-text mb-3 line-clamp-2 font-raleway text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {post.description}
                </p>

                {/* Author */}
                {post.author && (
                  <div className="mb-4 flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600">
                      <Icon icon="tabler:user" className="h-4 w-4 text-white" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {post.author}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {' '}
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="dark:bg-dark-border dark:text-dark-text-secondary inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    Read more
                    <Icon
                      icon="tabler:external-link"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </a>

                  <div className="flex items-center space-x-2">
                    {/* <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                      <Icon
                        icon="tabler:heart"
                        className="h-4 w-4 text-gray-600"
                      />
                    </button> */}
                    <div className="relative" ref={shareDropdownRef}>
                      <button
                        onClick={() =>
                          setShareDropdownOpen(
                            shareDropdownOpen === post.id ? null : post.id,
                          )
                        }
                        className="dark:bg-dark-border dark:hover:bg-dark-bg rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                        title="Share this post"
                      >
                        <Icon
                          icon="tabler:share-3"
                          className="h-4 w-4 text-gray-600"
                        />
                      </button>

                      {shareDropdownOpen === post.id && (
                        <div className="dark:border-dark-border dark:bg-dark-surface absolute bottom-full right-0 mb-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                          <div className="p-2">
                            <button
                              onClick={() => shareToTwitter(post)}
                              className="dark:text-dark-text-secondary dark:hover:bg-dark-border flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Icon
                                icon="tabler:brand-twitter"
                                className="mr-3 h-4 w-4 text-blue-400"
                              />
                              Share on Twitter
                            </button>
                            <button
                              onClick={() => shareToLinkedIn(post)}
                              className="dark:text-dark-text-secondary dark:hover:bg-dark-border flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Icon
                                icon="tabler:brand-linkedin"
                                className="mr-3 h-4 w-4 text-blue-600"
                              />
                              Share on LinkedIn
                            </button>
                            <button
                              onClick={() => shareToFacebook(post)}
                              className="dark:text-dark-text-secondary dark:hover:bg-dark-border flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Icon
                                icon="tabler:brand-facebook"
                                className="mr-3 h-4 w-4 text-blue-600"
                              />
                              Share on Facebook
                            </button>
                            <button
                              onClick={() => copyToClipboard(post)}
                              className="dark:text-dark-text-secondary dark:hover:bg-dark-border flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Icon
                                icon="tabler:copy"
                                className="mr-3 h-4 w-4 text-gray-600"
                              />
                              Copy Link
                            </button>
                            {typeof navigator !== 'undefined' &&
                              'share' in navigator && (
                                <button
                                  onClick={() => handleShare(post)}
                                  className="dark:text-dark-text-secondary dark:hover:bg-dark-border flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Icon
                                    icon="tabler:share"
                                    className="mr-3 h-4 w-4 text-gray-600"
                                  />
                                  Native Share
                                </button>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600 px-8 py-4 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/james-stellar-2139a218/recent-activity/all/',
                  '_blank',
                )
              }
            >
              <Icon icon="tabler:bell" className="mr-2 h-5 w-5" />
              Follow Our Updates
            </button>
            {/* <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border-2 border-blue-600 px-8 py-4 font-medium text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
            >
              <Icon icon="tabler:rss" className="mr-2 h-5 w-5" />
              Subscribe to News
            </button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
