import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import Card from "@/shared/ui/redesigned/Card/Card";

interface DetailsContainterProps {
  className?: string;
}
const DetailsContainer: FC<DetailsContainterProps> = (props) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }
  return (
    <Card max border={"partial"} className={className} padding="24">
      <ArticleDetails id={id} />
    </Card>
  );
};

export default memo(DetailsContainer);
