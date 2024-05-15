import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetProfileRating,
  useRateProfile,
} from "../../api/ProfileRatingApi";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { RatingCard } from "@/entities/Rating";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating: React.FC<ProfileRatingProps> = ({ profileId }) => {
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetProfileRating({
    profileId,
    userId: userData?.id ?? "",
  });
  const [rateProfileMutatuon] = useRateProfile();

  const handleRateProfile = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateProfileMutatuon({
          userId: userData?.id ?? "",
          profileId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [profileId, rateProfileMutatuon, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateProfile(starsCount, feedback);
    },
    [handleRateProfile]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateProfile(starsCount);
    },
    [handleRateProfile]
  );

  const rating = data?.[0];

  if (isLoading) {
    return <Skeleton width={"100%"} height={140} />;
  }

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      title={t("Rate the profile")}
      feedbackTitle={t("Leave a review about the profile")}
      hasFeedback
    />
  );
};

export default memo(ProfileRating);
