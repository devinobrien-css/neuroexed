import { Icon } from "@iconify/react";

const Profile = (args) => {
  const data = args.data;
  const socials = ["email", "twitter", "instagram", "linkedin"];

  const socialIcons = {
    email: "mdi:email-outline",
    twitter: "jam:twitter-square",
    instagram: "bi:instagram",
    linkedin: "ant-design:linkedin-outlined",
  };

  return (
    <div
      className={
        "group mx-auto my-8 p-4 bg-white md:w-[23%] transition-all shadow rounded-lg h-max-content flex flex-col justify-between"
      }
    >
      <div>
        <img
          className="mx-auto block shrink-0 rounded-full border-8 w-4/5"
          src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${data[
            "last"
          ].S.toLowerCase().replace("'", "")}.png`}
          alt={`Lab Member ${data["first"].S} ${data["last"].S}`}
        />
        <p className="text-center font-lato font-light text-3xl mx-auto my-2">
          {data["first"].S} {data["last"].S}
        </p>
        <p className="text-center text-gray-600 md:text-xl font-light">
          Member since {new Date(data["year_joined"].S).getFullYear()}
        </p>
      </div>
      <div>
        <p className="my-2 text-gray-600 md:text-lg font-lato font-light text-center text-xs">
          {data["lab_title"].S}
        </p>
        <div className="flex space-x-2 justify-center">
          {socials.map((social) => {
            if (data.socials.M[social].S !== "") {
              return (
                <a
                  key={data.socials.M[social].S}
                  className="cursor-pointer hover:scale-110 transition-all"
                  rel="noreferrer"
                  target="_blank"
                  href={
                    (social === "email" ? "mailto:" : "") +
                    data.socials.M[social].S
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
