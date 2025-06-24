import { Button } from "@/components/ui/button";
import { FC } from "react";

interface DataPaginationProps {
  page: number,
  totalPages: any,
  onPageChange: (page: number) => void,
}

const DataPagination: FC<DataPaginationProps> = (props) => {
  const { page, totalPages, onPageChange } = props;

  return (
    <div
      className="flex items-center justify-between"
    >
      <div
        className="flex-1 text-sm text-muted-foreground"
      >
        Page {page} of {totalPages || 1}
      </div>
      <div
        className="flex items-center justify-end space-x-2 py-4"
      >
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export { DataPagination }