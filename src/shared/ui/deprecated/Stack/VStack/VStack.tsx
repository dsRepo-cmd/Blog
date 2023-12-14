import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;
/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */
export const VStack = (props: VStackProps) => {
  const { align = "start" } = props;
  return <Flex {...props} direction="column" align={align} />;
};
