const LandingPublications = () => {
  return (
    <div className="my-32 bg-landing bg-cover bg-no-repeat shadow-2xl shadow-gray-400 backdrop-opacity-10">
      <div className="backdrop-contrast-30 p-16 backdrop-blur-md">
        <p className="mb-8 text-center font-raleway text-4xl text-white md:text-6xl">
          Our Books
        </p>
        <div className="my-4 justify-center md:flex md:border md:p-8">
          <img
            src="./img/diversity.png"
            alt="Diversity at College Book"
            className="hidden w-1/4 md:block md:p-12"
          />
          <div className="h-max-content flex flex-col md:w-2/5 md:pl-2">
            <div className="my-auto">
              <div className="flex shrink-0">
                <img
                  src="./img/diversity.png"
                  alt="Diversity at College Book"
                  className="block w-1/4 pr-2 md:hidden"
                />
                <p className="my-auto font-lato text-3xl font-light text-white md:text-5xl">
                  Diversity at College
                </p>
              </div>
              <br />
              <p className="text-justify font-lato text-sm text-gray-400 md:text-left md:text-lg">
                In 2020, eight lab members and recent college graduates produced
                a book, Diversity at College: Real Stories of Students
                Conquering Bias and Making Higher Education more Inclusive. The
                book is fully co-authored (not edited) and applies lessons from
                experiential education and social neuroscience thinking to five
                key student-centered stories, such as implicit bias or
                stereotype threat. The book was named as finalist for the 2021
                Indie book awards in the social change category and serves as a
                basis for recent panel discussions.
              </p>
              <button
                className="mx-auto my-6 block rounded border-2 border-white px-4 py-2 text-white transition-all hover:scale-105"
                onClick={() =>
                  (window.location.href =
                    'https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352')
                }
              >
                PURCHASE
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="my-4 justify-center md:flex md:border md:p-8">
          <div className="h-max-content flex flex-col pl-2 md:w-2/5">
            <div className="my-auto">
              <div className="flex shrink-0">
                <img
                  src="./img/education.png"
                  alt="Education That Works Book"
                  className="block w-1/4 pr-2 md:hidden"
                />
                <p className="my-auto font-lato text-3xl font-light text-white md:text-5xl">
                  Education That Works
                </p>
              </div>
              <br />
              <p className="text-justify font-lato text-sm text-gray-400 md:text-left md:text-lg">
                Experiential Education complements the classical academic nature
                of the classroom-based college experience by bringing in direct
                experience with industry, non-profits, and governments. In 2017,
                Stellar wrote a book on this topic, Education that Works: The
                Neuroscience of Building a more Effective Higher Education. The
                book argues that due to how the brain works, students develop
                insight, maturity, and even a passion for their career growth,
                as well as key work-place skills and abilities that make them of
                good students, good citizens, and good employees.
              </p>
              <button
                className="mx-auto my-6 block rounded border-2 border-white px-4 py-2 text-white transition-all hover:scale-105"
                onClick={() =>
                  (window.location.href =
                    'https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352')
                }
              >
                PURCHASE
              </button>
            </div>
          </div>
          <img
            src="./img/education.png"
            alt="Education that Works Book"
            className="hidden w-1/3 md:block md:p-12"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPublications;
