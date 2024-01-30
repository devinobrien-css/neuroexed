import { useState } from 'react';
import { getGender } from 'gender-detection-from-name';

export const SafeProfilePicture = ({
  image,
  firstName,
  className,
}: {
  image: string;
  firstName?: string;
  className?: string;
}) => {
  const [fallbackImage, setFallbackImage] = useState<boolean>();
  const assumedGender = getGender(firstName ?? '');

  return !fallbackImage ? (
    <img
      className={className}
      src={image}
      alt="User Profile"
      onError={() => setFallbackImage(true)}
    />
  ) : (
    <img
      className={className}
      src={`https://neuroexed-bucket.s3.us-east-1.amazonaws.com/profile_pictures/${
        assumedGender === 'unknown' ? 'female' : assumedGender
      }.png`}
      alt="Default Image"
    />
  );
};
