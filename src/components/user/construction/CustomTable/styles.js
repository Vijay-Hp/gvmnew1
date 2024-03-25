/* eslint-disable import/prefer-default-export */
import styled from "@emotion/styled";
// import { FONT } from '../../../theme/font';

export const CustomTableContainer = styled("div")({
  marginTop: "24px",
  ".MuiTable-root": {
    minWidth: "auto",
    backgroundColor: "#fff",
  },
  ".MuiTableCell-root": {
    borderBottom: "none",
  },
  ".MuiTableRow-root": {
    borderBottom: "1px solid #D1D1D1",
  },
  ".MuiTableHead-root": {
    backgroundColor: "#E2E2EC",
  },
  ".table-head-cell": {
    fontWeight: 500,
    fontSize: "18px",
    // fontFamily: FONT.w500,
    fontStyle: "normal",
    lineHeight: "24px",
    whiteSpace: "nowrap",
  },
  ".sort-icon": {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
    gap: "10px",
    ".rotate": {
      rotate: "180deg",
    },
  },
  ".table-cell": {
    // fontFamily: FONT.w500,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
  },
});

export const TableFooterWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  ".count-data": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    ".MuiTypography-root": {
      width: "100%",
    },
  },
  ".icons-container": {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },
});
