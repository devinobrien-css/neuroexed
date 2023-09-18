import { Icon } from '@iconify/react';

const Profile = (args) => {
  const data = args.data;
  const socials = ['email', 'twitter', 'instagram', 'linkedin'];

  const socialIcons = {
    email: 'mdi:email-outline',
    twitter: 'jam:twitter-square',
    instagram: 'bi:instagram',
    linkedin: 'ant-design:linkedin-outlined',
  };

  return (
    <div className="h-max-content group mx-auto my-8 flex flex-col justify-between rounded-lg bg-white p-4 shadow transition-all md:w-[23%]">
      <div>
        <img
          className="mx-auto block h-48 w-48 shrink-0 rounded-full border-8"
          src={`${import.meta.env.VITE_S3_PROFILE_PICTURES}${data.last
            .toLowerCase()
            .replace("'", '')}.png`}
          alt={`Lab Member ${data.first} ${data.last}`}
        />
        <p className="mx-auto my-2 text-center font-lato text-3xl font-light">
          {data.first} {data.last}
        </p>
        <p className="text-center font-light text-gray-600 md:text-xl">
          Member since {new Date(data.year_joined).getFullYear()}
        </p>
      </div>
      <div>
        <p className="my-2 text-center font-lato text-xs font-light text-gray-600 md:text-lg">
          {data['lab_title'].S}
        </p>
        <div className="flex justify-center space-x-2">
          {socials.map((social) => {
            if (data.socials[social] !== '') {
              return (
                <a
                  key={data.socials[social]}
                  className="cursor-pointer transition-all hover:scale-110"
                  rel="noreferrer"
                  target="_blank"
                  href={
                    (social === 'email' ? 'mailto:' : '') + data.socials[social]
                  }
                >
                  <Icon icon={socialIcons[social]} width={40} />
                </a>
              );
            }
            return <></>;
          })}
        </div>
      </div>
      {/* <div>
                <div>
                    <button 
                        onClick={() => {
                            state?setState(false):setState(true)
                        }}
                        className="text-blue-500 block mx-auto underline p-2"    
                    >
                        {state?"close description":"read description"}
                    </button>
                    <p className={`transition-all  ${state?"h-48 overflow-scroll p-2":"p-0 h-0 overflow-hidden"}`}>{data['description'].S }</p>
                </div>
            </div> */}
    </div>
  );
};

export default Profile;
