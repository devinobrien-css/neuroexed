import { SafeProfilePicture } from '../../../shared/components/common/SafeProfilePicture';
import { ProjectMember } from '../../../shared/types/project.types';

const ProjectProfile = ({ member }: { member: ProjectMember }) => {
  const memberProfilePicture = `${
    import.meta.env.VITE_S3_PROFILE_PICTURES
  }${member.last
    .toLowerCase()
    // eslint-disable-next-line quotes
    .replace("'", '')}.png`;
  return (
    <div className=" mx-4 flex min-w-[140px] flex-col justify-between rounded border bg-white p-2 shadow">
      <SafeProfilePicture
        image={memberProfilePicture}
        firstName={member.first}
        className="mx-auto h-16 w-16 rounded object-cover"
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
