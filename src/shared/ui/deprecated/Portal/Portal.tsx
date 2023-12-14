import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}
/**
 * Outdated, use new components from the redesigned folder
 * @deprecated
 */
const Portal = (props: PortalProps) => {
  const { children, element = document.body } = props;

  return createPortal(children, element);
};

export default Portal;
