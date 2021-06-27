import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@material-ui/core";
import { useState } from "react";

const getMenuItems = (filterData) => {
  return filterData.length === 0
    ? ""
    : filterData.map((year) => (
        <MenuItem key={`filter-year-${year}`} value={year}>
          {year}
        </MenuItem>
      ));
};

export const FilterExpenses = (props) => {
  const [filterYear, setFilterYear] = useState(props.selecterYear);
  const onFilterChange = (e) => {
    setFilterYear(e.target.value);
    props.getFilterYear(e.target.value);
  };

  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <FormControl variant="outlined">
        <InputLabel id="filter-years-label">Years</InputLabel>
        <Select
          labelId="filter-years-label"
          id="filter-years"
          value={filterYear}
          onChange={onFilterChange}
          label="Year"
        >
          <MenuItem key="filter-year-null" value="-1">
            All Expenses
          </MenuItem>
          {getMenuItems(props.filterData)}
        </Select>
      </FormControl>
    </Box>
  );
};
