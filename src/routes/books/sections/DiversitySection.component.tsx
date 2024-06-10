const DiversitySection = () => {
  return (
    <div className="my-4 rounded p-12">
      <div className="p-4 md:flex">
        <div className="mx-auto min-h-[300px] shrink-0 bg-diversity bg-contain bg-center bg-no-repeat md:w-1/4"></div>
        <div>
          <div>
            <p className="font-raleway text-5xl font-light">
              Diversity at College
            </p>
            <br />
            <p className="text-justify font-lato font-light">
              In 2020, eight lab members and recent college graduates produced a
              book, Diversity at College: Real Stories of Students Conquering
              Bias and Making Higher Education more Inclusive. The book is fully
              co-authored (not edited) and applies lessons from experiential
              education and social neuroscience thinking to five key
              student-centered stories, such as implicit bias or stereotype
              threat. The book was named as finalist for the 2021 Indie book
              awards in the social change category and serves as a basis for
              recent panel discussions.
            </p>
          </div>
          <div className="mx-auto my-2 flex justify-evenly md:w-1/2">
            <button
              className="mx-auto my-6 block rounded bg-blue-900 px-4 py-2 text-white transition-all hover:scale-105 hover:bg-blue-400 hover:text-gray-600"
              onClick={() =>
                (window.location.href =
                  'https://www.amazon.com/Diversity-College-Conquering-Education-Inclusive/dp/1646870352')
              }
              title="purchase this book on amazon"
            >
              buy this book
            </button>
            <button
              className="mx-auto my-6 block rounded bg-blue-900 px-4 py-2 text-white transition-all hover:scale-105 hover:bg-blue-400 hover:text-gray-600"
              onClick={() =>
                (window.location.href = 'https://diversityatcollege.com')
              }
              title="visit diversity at college's website"
            >
              visit their site
            </button>
          </div>
          <br />
          <div className="my-2 flex justify-evenly">
            <img
              src="img/bba-award.png"
              alt="Best Book Award Logo"
              className="w-1/3 max-w-[150px] shrink-0"
            />
            <img
              src="img/indie-award.png"
              alt="Indie Book Award Logo"
              className="w-1/3 max-w-[150px] shrink-0"
            />
          </div>
        </div>
      </div>
      <hr className="mx-auto my-4 w-5/6 border-2" />
      <div>
        <p className="mx-auto w-fit font-raleway text-3xl font-light ">
          What People are Saying
        </p>
        <div className="flex justify-evenly">
          <div className="my-2 w-2/3 p-4">
            <p className={'text-center text-sm font-light'}>
              "In this education policy book, Stellar and some former students
              at Queens College and the University of Albany (debut authors
              Martinez, Eggan, Poy, Weiser, Eager, Cohen, and Buras) present
              narratives of their personal experiences on campus. The book is
              strongest in the specific details the contributors share in their
              stories, like the distinction Poy draws between paid and unpaid
              internships as realistic options for low-income students. the
              informative book succeeds in its presentation of realistic and
              attainable tactics schools can implement based on the
              contributors' experiences, such as peer and faculty mentoring,
              ensuring all students are familiar with the norms of academia, and
              providing opportunities for experiential learning. The authors'
              addition to the field does an excellent job of drawing broad
              conclusions from a collection of individual experiences. An
              illuminating exploration of how colleges can support diversity."
            </p>
            <br />
            <p className="text-center text-xl font-light italic">
              -Kirkus Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiversitySection;
