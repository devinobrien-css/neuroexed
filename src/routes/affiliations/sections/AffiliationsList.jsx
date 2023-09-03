import { useEffect, useState } from "react";
import { fetchData } from "../../../shared/api/dba";
import { SectionTitle } from "../../../shared/components/common.library";
import Loader from "../../../shared/components/Loader.component";
import Modal from "../../../shared/components/modals/modal";

const Affiliation = (args) => {
  const affiliate = args.data;
  const modal_content = (
    <div className="bg-white rounded py-8 px-4">
      <div className="text-xl md:text-4xl">
        <p>You're about to leave our site!</p>
      </div>
      <div className="mx-auto block text-center rounded bg-gray-300 w-fit my-1 p-2 hover:scale-105 transform transition-all">
        <a href={affiliate.data.M.source.S}>Click to continue</a>
      </div>
    </div>
  );

  return (
    <div
      className="hover:shadow-xl shadow-gray-400 max-w-[450px] md:w-5/12 mx-auto transition-all my-4 bg-white rounded-xl hover:scale-105 transform shadow overflow-hidden pb-4 cursor-pointer"
      onClick={() => Modal(modal_content)}
    >
      <img
        src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/affiliations/${affiliate.data.M.slug.S.toLowerCase()}.png`}
        className="block max-w-full min-h-[200px]"
        alt={`Website of ${affiliate.name.S}`}
      />
      <p className="text-2xl my-2 text-center font-lato font-light">
        {affiliate.name.S}
      </p>
    </div>
  );
};

const AffiliationsList = () => {
  const [affiliations, setAffiliations] = useState();
  const [loading, setLoading] = useState();
  const getAffiliations = async () => {
    setLoading(true);
    const res = await fetchData("affiliations");
    setAffiliations(res.Items);
    setLoading();
  };
  useEffect(() => {
    getAffiliations();
  }, []);

  return (
    <div className="p-4 my-16">
      <SectionTitle className="text-center pb-12">Our Affiliates</SectionTitle>
      <div className="flex flex-wrap">
        {loading ? (
          <div className="flex flex-col items-center w-full min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <></>
        )}
        {affiliations?.map((affiliate, index) => {
          return <Affiliation key={affiliate} data={affiliate} />;
        })}
      </div>
    </div>
  );
};

export default AffiliationsList;
