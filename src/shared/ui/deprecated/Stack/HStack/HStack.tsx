import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, "direction">;
/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
