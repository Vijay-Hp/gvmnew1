/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { CustomTableContainer, TableFooterWrapper } from "./styles";

const SortableColumn = ({ td, arrowColor }) => {
  const [toggle, setToggle] = useState(false);
  const isSort = td?.sortColumn ? true : false;
  const handleSort = () => {
    setToggle(!toggle);
    isSort && td?.sortColumn(td);
  };
  return (
    <TableCell align="left" className="table-head-cell" onClick={handleSort}>
      <div className="sort-icon">
        {td.label}{" "}
        {isSort && (
          <ArrowDownwardIcon
            style={{ color: arrowColor }}
            className={toggle ? "rotate" : ""}
          />
        )}
      </div>
    </TableCell>
  );
};
const CustomTable = ({
  tableData,
  apiData,
  primaryKey,
  handleRowClick = () => {},
  tableFooter = false,
  arrowColor = "#1565C0",
  handleRefreshClick,
}) => {
  return (
    <CustomTableContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableData.map((td) => {
                return (
                  <SortableColumn
                    td={td}
                    key={td.field}
                    arrowColor={arrowColor}
                  />
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((apiTd) => {
              return (
                <TableRow
                  key={apiTd[primaryKey]}
                  onClick={() => {
                    handleRowClick?.(apiTd);
                  }}
                >
                  {tableData.map((td) => {
                    const res = td?.render
                      ? td.render(apiTd)
                      : apiTd?.[td.field] ?? "";
                    const align = td?.align ? td?.align : "left";
                    return (
                      <TableCell
                        key={td[primaryKey]}
                        align={align}
                        className="table-cell"
                        variant="regular"
                      >
                        {res}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          {tableFooter && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={tableData.length}>
                  <TableFooterWrapper>
                    <div className="count-data">
                      <Typography>{apiData.length} results</Typography>
                    </div>
                    <div className="icons-container">
                      {/* <FilterAltIcon />
                      <FileDownloadOutlinedIcon /> */}
                      <ReplayOutlinedIcon onClick={handleRefreshClick} />
                    </div>
                  </TableFooterWrapper>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </CustomTableContainer>
  );
};
export default CustomTable;
