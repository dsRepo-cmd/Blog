import { FC, memo } from "react";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";
import { ArticlesFilters } from "@/widgets/ArticlesFilters";

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer: FC<FiltersContainerProps> = memo(
  ({ className }) => {
    const {
      onChangeSort,
      onChangeType,
      onChangeSearch,
      onChangeOrder,
      onChangePublished,
      sort,
      type,
      search,
      order,
      isPublished = true,
    } = useArticleFilters();

    return (
      <ArticlesFilters
        isPublished={isPublished}
        onChangePublished={onChangePublished}
        type={type}
        onChangeSearch={onChangeSearch}
        order={order}
        onChangeOrder={onChangeOrder}
        search={search}
        sort={sort}
        onChangeSort={onChangeSort}
        onChangeType={onChangeType}
        className={className}
      />
    );
  }
);
