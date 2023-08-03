import Modal from "../../../shared/components/modals/modal";
import Profile from "../../people/sections/Profile.component";


const ProjectProfile = (args) => {
    const member_data = args.data.data.M

    return (
        <div className=' mx-4 min-w-[140px] bg-white rounded p-2 shadow border flex flex-col justify-between' 
            onClick={() => Modal(
                <div className='bg-white rounded overflow-hidden w-[100%]'>
                    <Profile data={member_data}/>
                </div>
            )}>
            <img 
                className='w-16 rounded mx-auto'
                src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${member_data.last.S.toLowerCase().replace("'","")}.png`} 
                alt={member_data.last.S.toLowerCase()}
            />
            <div>
                <p className='text-center mx-auto'>{member_data.first.S} {member_data.last.S}</p>
                <button className='underline text-blue-300 text-center mx-auto block'>view profile</button>
            </div>
        </div>
    )
}

export default ProjectProfile;