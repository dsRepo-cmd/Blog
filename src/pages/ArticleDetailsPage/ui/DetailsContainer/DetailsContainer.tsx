import { FC, memo } from "react";
import { ArticleDetails } from "@/entities/Article";
import Card from "@/shared/ui/redesigned/Card/Card";

interface DetailsContainterProps {
  className?: string;
}
const DetailsContainer: FC<DetailsContainterProps> = (props) => {
  const { className } = props;

  return (
    <Card max border={"partial"} className={className} padding="12">
      <ArticleDetails />
    </Card>
  );
};

export default memo(DetailsContainer);
