import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const LandingRedirect = () => {
  const navigate = useNavigate();

  return (
    <div className="my-32">
      <p className="mb-8 text-center font-raleway text-4xl md:text-6xl">
        Start Exploring Our Lab
      </p>

      <div className="flex flex-col md:flex-row">
        <div className="m-4 my-auto rounded-lg border p-4 shadow-lg md:w-1/2">
          <img
            src="/img/brain.gif"
            alt="rotating brain"
            className="w-full rounded-lg"
          />
        </div>

        <div className="my-auto w-full p-4 md:w-1/2">
          <div className="m-auto overflow-hidden rounded-xl shadow-xl">
            <div className="flex border-b border-gray-400">
              <div
                className="group w-1/2 cursor-pointer p-4 transition-all hover:bg-gray-200"
                onClick={() =>
                  (window.location.href = 'https://www.otherlobe.com')
                }
              >
                <div className="flex justify-between">
                  <Icon
                    icon="material-symbols:library-books-rounded"
                    width={45}
                  />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">Papers</p>
                <p className="font-light text-paynes-grey">
                  Our papers and articles on The Other Lobe
                </p>
              </div>
              <div
                className="group w-1/2 cursor-pointer border-l border-gray-400 p-4 transition-all hover:bg-gray-200"
                onClick={() => navigate('publications')}
              >
                <div className="flex justify-between">
                  <Icon icon="mdi:book-multiple" width={45} />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">Books</p>
                <p className="font-light text-paynes-grey">
                  Our recent publications
                </p>
              </div>
            </div>
            <div className="flex border-b border-gray-400">
              <div
                className="group w-1/2 cursor-pointer p-4 transition-all hover:bg-gray-200"
                onClick={() =>
                  (window.location.href = 'https://experienced.simplecast.com/')
                }
              >
                <div className="flex justify-between">
                  <Icon
                    icon="material-symbols:video-library-rounded"
                    width={45}
                  />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">Podcasts</p>
                <p className="font-light text-paynes-grey">
                  Our podcasts with guest speakers
                </p>
              </div>
              <div
                className="group w-1/2 cursor-pointer border-l border-gray-400 p-4 transition-all hover:bg-gray-200"
                onClick={() => navigate('people')}
              >
                <div className="flex justify-between">
                  <Icon icon="mdi:user-box-multiple" width={45} />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">People</p>
                <p className="font-light text-paynes-grey">
                  The members of our lab team
                </p>
              </div>
            </div>
            <div className="flex ">
              <div
                className="group w-1/2 cursor-pointer p-4 transition-all hover:bg-gray-200"
                onClick={() => navigate('projects')}
              >
                <div className="flex justify-between">
                  <Icon icon="mdi:library-edit-outline" width={45} />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">Projects</p>
                <p className="font-light text-paynes-grey">
                  Our collaborative work broken down into clusters
                </p>
              </div>
              <div
                className="group w-1/2 cursor-pointer border-l border-gray-400 p-4 transition-all hover:bg-gray-200"
                onClick={() => navigate('affiliations')}
              >
                <div className="flex justify-between">
                  <Icon icon="ic:round-library-add" width={45} />
                  <Icon
                    icon="material-symbols:arrow-outward-rounded"
                    width={35}
                    className="transition-all group-hover:-mr-2 group-hover:-mt-2"
                  />
                </div>
                <br />
                <p className="text-xl font-light">Affiliates</p>
                <p className="font-light text-paynes-grey">
                  Our affiliates and collaborators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingRedirect;
