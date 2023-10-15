import { useState } from 'react';
import { TriuneBrain } from '../../../shared/assets/img/TriuneBrain.component';
import { BRAIN_DATA, BrainSectionEnum } from './ProjectBrainData';

const ProjectsBrain = () => {
  const [selected, setSelected] = useState<BrainSectionEnum>(
    BrainSectionEnum.NEO,
  );

  return (
    <div className="my-32 flex flex-wrap-reverse justify-between rounded-xl md:flex-wrap">
      <div className="bg-light-hex w-full rounded-r-lg  border bg-cover bg-bottom bg-no-repeat md:w-1/2">
        <div className="mx-auto -mt-8 w-10/12 rounded bg-white p-2 shadow-std">
          <p className="font-raleway text-4xl transition-all md:text-6xl">
            The Triune Brain
          </p>
          <p>Select a layer of the brain to explore further</p>
          <br />
          <p className="font-raleway text-3xl font-light">
            {BRAIN_DATA[selected].title}
          </p>
          <p className="py-3">{BRAIN_DATA[selected].description}</p>
        </div>
      </div>
      <div className="w-full p-2 md:w-1/2">
        <TriuneBrain setState={setSelected} />
      </div>
    </div>
  );
};

export default ProjectsBrain;
