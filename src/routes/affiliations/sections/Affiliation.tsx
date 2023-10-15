import { Affiliate } from '../../../shared/types/affiliate.types';

export const Affiliation = ({ affiliate }: { affiliate: Affiliate }) => {
  return (
    <a
      className="mx-auto my-4 max-w-[450px] cursor-pointer overflow-hidden rounded-xl bg-white pb-4 shadow shadow-gray-400 transition-all hover:scale-105 hover:shadow-xl md:w-5/12"
      href={affiliate.source}
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/affiliations/${affiliate.slug.toLowerCase()}.png`}
        className="block min-h-[200px] max-w-full"
        alt={`Website of ${affiliate.name}`}
      />
      <p className="my-2 text-center font-lato text-2xl font-light">
        {affiliate.name}
      </p>
    </a>
  );
};
