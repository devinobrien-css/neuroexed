import { fetchData } from '../../../shared/api/dba';
import { useQuery } from '@tanstack/react-query';

const NotificationAccess = () => {
  const { data: notifications } = useQuery({
    queryKey: ['MESSAGES'],
    queryFn: async () => await fetchData('messages'),
  });

  return (
    <div>
      {notifications?.map((message) => {
        return (
          <div
            key={message.content}
            className="flex justify-between px-2 shadow-lg"
          >
            <div>
              {message.content}
              {/* <p className="font-bold">From :</p>
              <p> {current.data.M.from.S}</p>

              <p className="font-bold">Subject :</p>
              <p> {current.data.M.subject.S}</p>

              <p className="font-bold">Message :</p>
              <p> {current.data.M.content.S}</p>
            </div>
            <div>
              <p>
                {new Date(parseInt(current.timestamp.N)).toLocaleDateString()}
              </p>
              <p>
                {new Date(parseInt(current.timestamp.N)).toLocaleTimeString()}
            </p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default NotificationAccess;
