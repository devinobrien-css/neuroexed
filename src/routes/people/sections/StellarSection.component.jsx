import { useState } from 'react';

const StellarSection = () => {
  const [state, setState] = useState(false);

  return (
    <div className="bg-light-hex my-6 rounded-xl border bg-cover bg-no-repeat p-4 shadow-xl transition-all">
      <p className="text-6xl font-light">Our Lab Director, James Stellar</p>
      <div
        className={`group mx-auto my-2  mt-8 flex w-full flex-col justify-between border bg-white p-2 shadow transition-all hover:shadow-xl ${
          state ? 'w-full' : 'md:w-1/2'
        }`}
      >
        <div className="flex flex-wrap">
          <div className="mx-auto h-min w-32 overflow-hidden rounded-lg border-4 border-double  border-blue-300 shadow-lg transition-all group-hover:border-8 md:mx-0 ">
            <img
              src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/stellar.png`}
              alt="James Stellar"
            />
          </div>
          <div className="flex w-full flex-col justify-between pl-2 md:w-3/5">
            <p className="mb-2 w-full text-center text-4xl  font-light transition-all md:text-left md:text-4xl">
              {' '}
              Dr. James Stellar
            </p>
            <p className="border-t-8 border-double border-gray-400 text-center italic text-gray-600 md:text-left md:text-xl">
              Member since 2015
            </p>
          </div>
        </div>
        <div>
          <button
            className="mx-auto block text-blue-500 underline"
            onClick={() => {
              state ? setState(false) : setState(true);
            }}
          >
            {state ? 'close description' : 'read description'}
          </button>
          {state ? (
            <div>
              <p className="text-2xl font-light">Momentous beginnings..</p>
              <p className="mb-4 text-justify">
                Stellar's career began as a basic neuroscientist, trained at the{' '}
                <b>University of Pennsylvania</b> as a PhD and postdoctoral
                fellow, and then appointed as an assistant and associate
                (untenured professor) at the{' '}
                <b>Department of Psychology at Harvard University</b>. In 1985
                he wrote a book,{' '}
                <i>The Neurobiology of Motivation and Reward</i>, with his
                father, Eliot Stellar, also a neuroscience professor who had
                then returned to the faculty after serving as Provost at the{' '}
                <b>University of Pennsylvania</b>. In 1986, J. Stellar moved to{' '}
                <b>Northeastern University</b> in Boston, keeping his continuing
                research affiliation at McLean Hospital. His laboratory research
                focused on the dopamine brain systems in laboratory rats,
                beginning with studies of{' '}
                <i>
                  rewarding electrical stimulation of the brain and then moving
                  into cocaine research with an additional focus on craving from
                  a behavioral, neuroanatomical, and molecular genetic change
                  perspective{' '}
                </i>
              </p>

              <p className="text-2xl font-light">Evolving his career..</p>
              <p className="mb-4 text-justify">
                Stellar's senior administrative career began in 1998 as Dean of
                the large{' '}
                <b>College of Arts and Sciences at Northeastern University</b>,
                during the period of a remarkable rise in university ranking (US
                News - from 165 to eventually in the 40s) and in college
                applications (tripling to 15,000 with an attendant 250 point
                Freshman SAT increase). Given his long-term interest in working
                with and even hiring his own undergraduates as laboratory
                research assistants and given his leadership in a cooperative
                education university, it was only natural that he would take an
                interest in{' '}
                <i>
                  how learning from experience worked to transform the students
                  and the university itself
                </i>
                . This interest was expressed through the{' '}
                <b>World Association of Cooperative Education (WACE)</b>, where
                he co-founded and co-directed their{' '}
                <b>Experiential Education Planning Institute</b> that for over
                13 years worked with nearly 100 universities which developed
                institutional <i>Experiential Education Plans</i>. In 2008, he
                made a transition to administration in the public university as
                Provost at <b>Queens College CUNY</b> and then again as Provost
                at <b>University at Albany SUNY</b>. He also served at UAlbany
                as Interim President for an academic year before returning to
                the Provost position and then finally going back to the faculty
                as a Professor in the <b>Department of Psychology</b>.
              </p>

              <p className="text-2xl font-light">
                Reflecting on his neuroscience passion and work..
              </p>
              <p className="mb-4 text-justify">
                The union of Stellar's administrative career with his earlier
                work in basic neuroscience was reflected in his 2017 book,{' '}
                <i>
                  Education that Works: The Neuroscience of Building a more
                  Effective Higher Education (IdeaPress)
                </i>
                . The influence of the diversity mission at the public
                university is seen in a 2020 multi-authored book that he and
                recent college graduates have just produced,{' '}
                <i>
                  Diversity at College: Real Stories of Students Conquering Bias
                  and Making Higher Education More Inclusive
                </i>
                , from the same publisher. That basic union of behavioral
                neuroscience and combined learning from classic academics and
                direct experience remains the focus of this new virtual
                laboratory of students and colleagues that we are calling the{' '}
                <b>Center for Neuroscience and Experiential Education</b>. It is
                reflected in Stellar's blog and podcast and in new projects on
                teaching for engagement and the neuroscience of how professional
                knowledge and even wisdom develops with experiential learning.
              </p>

              <p className="text-2xl font-light">What's going on today..</p>
              <p className="mb-4 text-justify">
                Stellar teaches courses on introductory psychology (with an
                active engagement approach borrowed from experiential
                education), psychopharmacology, and seminars on cognitive-limbic
                integration in making decisions. He works with universities,
                companies, institutes, consulting firms, and cooperative
                education societies (e.g. WACE).
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
