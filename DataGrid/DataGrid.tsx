// library
import { ForwardedRef, forwardRef } from "react";
// custom
import { dataGridTypes } from "model/etc/data-grid.model";
import cs from "classnames";

import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridAlignment,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Skeleton from "@mui/material/Skeleton";
import { Backdrop, Grid } from "@mui/material";

const StyledDataGrid: any = styled(DataGrid)(({ theme }) => ({
  border: 0,
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

interface IProp {
  classname?: string;
  loading: boolean;
}
const CustomDataGrid = forwardRef(
  (props: dataGridTypes & IProp, ref: ForwardedRef<HTMLDivElement> | null) => {
    const { rows, columns, pageSize, rowsPerPageOptions, classname, loading } =
      props;

    //// disable sort
    const cols = columns.map((cl) => ({
      ...cl,
      sortable: false,
      headerClassName:
        "bg-primary text-PureWhite  border-none flex text-center",
      headerAlign: "center" as GridAlignment,
      cellClassName: "flex justify-center",
    }));
    return (
      <StyledDataGrid
        ref={ref}
        {...props}
        columns={cols}
        rows={rows}
        className={cs(classname, "font-sans")}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableExtendRowFullWidth
        disableSelectionOnClick
        disableIgnoreModificationsIfProcessingProps
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        components={{
          Pagination: CustomPagination,
          LoadingOverlay: <CustomSkeleton loading={loading} />,
        }}
        autoHeight
        loading={loading}
      />
    );
  }
);

export default CustomDataGrid;

const CustomSkeleton = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop open={loading} className="flex flex-col w-full h-full">
      <Skeleton width={"100%"} height={50} />
      <Skeleton width={"100%"} height={50} />
      <Skeleton width={"100%"} height={50} />
      <Skeleton width={"100%"} height={50} />
    </Backdrop>
  );
};
