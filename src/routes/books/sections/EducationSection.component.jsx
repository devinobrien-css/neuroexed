import {
  SubTitleSm,
  TextSectionSm,
  TitleLg,
} from '../../../shared/components/common.library';

const EducationSection = () => {
  return (
    <div className="my-4 rounded border p-12 shadow-lg">
      <div className="p-4 md:flex">
        <div className="mx-auto min-h-[300px] shrink-0 bg-education bg-contain bg-center bg-no-repeat md:w-1/4"></div>
        <div className="">
          <div className="">
            <p className="font-raleway text-5xl font-light">
              Education that Works
            </p>
            <br />
            <p className="text-justify font-lato font-light">
              Experiential Education complements the classical academic nature
              of the classroom-based college experience by bringing in direct
              experience with industry, non-profits, and governments. In 2017,
              Stellar wrote a book on this topic, Education that Works: The
              Neuroscience of Building a more Effective Higher Education. The
              book argues that due to how the brain works, students develop
              insight, maturity, and even a passion for their career growth, as
              well as key work-place skills and abilities that make them of good
              students, good citizens, and good employees.
            </p>
          </div>
          <div className="mx-auto my-2 flex justify-evenly md:w-1/2">
            <button
              className="mx-auto my-6 block transform rounded bg-blue-900 px-4 py-2 text-white transition-all hover:scale-105 hover:bg-blue-400 hover:text-gray-600"
              onClick={() =>
                (window.location.href =
                  'https://www.amazon.com/Education-That-Works-Neuroscience-Effective/dp/1940858216')
              }
              title="purchase this book on amazon"
            >
              buy this book
            </button>
          </div>
        </div>
      </div>
      <hr className="mx-auto my-4 w-5/6 border-2" />
      <div>
        <TitleLg className="mx-auto w-fit">What People are Saying</TitleLg>

        <div className="flex justify-evenly">
          <div className="my-2 w-2/3 p-4">
            <TextSectionSm className="text-center font-light">
              "James Stellar draws on his deep knowledge of neuroscience and his
              years of experience as an academic officer at major universities
              to make the case for adding experiential education to traditional,
              class-based undergraduate programs. The book's title—Education
              That Works—tells it all. Quite simply, experiential education is a
              pedagogy that empowers young people more effectively than
              classroom study alone."
            </TextSectionSm>
            <br />

            <SubTitleSm className="text-center">
              -Richard Freeland, past President of Northeastern Universityand
            </SubTitleSm>

            <br />
            <br />

            <TextSectionSm className="text-center font-light">
              "At a time when states across the nation are mandating
              experiential learning in higher education, neuroscientist and
              academic leader James Stellar has written a beautiful book that
              educates and inspires us about the unique power of experiential
              learning to transform students' visions and decisions about their
              best futures. Read this book and learn why experiential learning
              is the right next turn for higher education."
            </TextSectionSm>
            <br />

            <SubTitleSm className="text-center">
              -Vita Rabinowitz, current Provost and Vice Chancellor of the CUNY
              system
            </SubTitleSm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
