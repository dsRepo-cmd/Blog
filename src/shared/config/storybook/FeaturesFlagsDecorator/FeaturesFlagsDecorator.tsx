import { StoryFn } from "@storybook/react";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { setFeatureFlags } from "@/shared/lib/features";

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComponent: StoryFn) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };
