import { ProjectMember } from '../../../shared/types/project.types';

const ProjectProfile = ({ member }: { member: ProjectMember }) => {
  return (
    <div className=" mx-4 flex min-w-[140px] flex-col justify-between rounded border bg-white p-2 shadow">
      <img
        className="mx-auto h-16 w-16 rounded object-cover"
        src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${member.last
          .toLowerCase()
          // eslint-disable-next-line quotes
          .replace("'", '')}.png`}
        alt={member.last.toLowerCase()}
      />
      <div>
        <p className="mx-auto text-center font-sans font-light">
          {member.first} {member.last}
        </p>
      </div>
    </div>
  );
};

export default ProjectProfile;
