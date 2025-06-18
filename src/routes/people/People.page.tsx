import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/footer/Footer';
import Header from '../../shared/components/Header';
import PeopleGrid from './components/PeopleGrid';
import { Loader } from '../../shared/components/Loader';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { useMembersQuery } from '../../shared/hooks/memberHooks';

const People = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce<string>(search, 300);
  const { data: people, isLoading } = useMembersQuery();

  console.log('People data:', people?.[1]);

  const filteredPeople = people?.filter(
    (person) =>
      person.first.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      person.last.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      person.lab_title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      person.description?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <>
      <Navbar />
      <Header
        title="Meet Our Team"
        sub_title="The innovators, researchers, and visionaries behind our groundbreaking work"
        scrollToId="team-main-content"
        buttonText="Meet the Team"
      />

      <section
        id="team-main-content"
        className="bg-gradient-to-b from-white to-gray-50 py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block bg-gradient-to-r from-tiffany-blue to-blue-500 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
              Our Brilliant Minds
            </span>
            <h2 className="mb-6 font-raleway text-4xl font-light text-gray-800 md:text-5xl">
              <span className="bg-gradient-to-r from-tiffany-blue to-blue-600 bg-clip-text text-transparent">
                The People Behind the Research
              </span>
            </h2>
            <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-600"></div>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our interdisciplinary team brings together expertise from
              neuroscience, education, psychology, and technology to explore the
              frontiers of experiential learning.
            </p>

            {/* Search bar with modern design */}
            <div className="mx-auto mt-10 max-w-md">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Icon
                    icon="tabler:search"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm transition-all focus:border-tiffany-blue focus:outline-none focus:ring focus:ring-tiffany-blue/20"
                  placeholder="Search by name, role, or expertise..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <Loader />
          ) : filteredPeople && filteredPeople.length > 0 ? (
            <PeopleGrid people={filteredPeople} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-xl bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm"
            >
              <Icon
                icon="tabler:mood-sad"
                className="mb-4 h-16 w-16 text-gray-400"
              />
              <h3 className="mb-2 text-2xl font-medium text-gray-700">
                No Results Found
              </h3>
              <p className="max-w-md text-gray-500">
                We couldn't find anyone matching your search criteria. Try using
                different keywords or browse our complete team listing.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tiffany-blue to-blue-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:translate-y-[-2px]"
                onClick={() => setSearch('')}
              >
                <Icon icon="tabler:refresh" className="h-5 w-5" />
                Reset Search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default People;
