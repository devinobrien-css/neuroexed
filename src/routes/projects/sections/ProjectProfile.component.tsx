import { useState } from 'react';
import { Modal } from '../../../shared/components/modals/Modal';
import { ProjectMember } from '../../../shared/types/project.types';

const ProjectProfile = ({ member }: { member: ProjectMember }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {/* {modal && (
        <Modal>
          <Profile data={member_data} />
        </Modal>
      )} */}
      <div
        className=" mx-4 flex min-w-[140px] flex-col justify-between rounded border bg-white p-2 shadow"
        onClick={() => setModal(true)}
      >
        <img
          className="mx-auto w-16 rounded"
          src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${member.last
            .toLowerCase()
            .replace("'", '')}.png`}
          alt={member.last.toLowerCase()}
        />
        <div>
          <p className="mx-auto text-center">
            {member.first} {member.last}
          </p>
          <button className="mx-auto block text-center text-blue-300 underline">
            view profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectProfile;
