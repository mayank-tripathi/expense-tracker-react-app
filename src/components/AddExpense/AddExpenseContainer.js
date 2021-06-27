import DateFnsUtils from "@date-io/date-fns";
import { Typography, Paper, Box, TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUtilStyles } from "../../styles";
import { BaseContainer } from "../Common";

export const AddExpenseContainer = (props) => {
  const utilStyles = useUtilStyles();
  const [addedExpenseDetails, setAddedExpenseDetails] = useState("");
  const [addedExpenseAmount, setAddedExpenseAmount] = useState("");
  const [addedExpenseDate, setAddedExpenseDate] = useState(new Date());

  const modifyAddedExpenseDetails = (e) => {
    setAddedExpenseDetails(e.target.value);
  };

  const modifyAddedExpenseAmount = (e) => {
    setAddedExpenseAmount(e.target.value);
  };

  const modifyAddedExpenseDate = (date) => {
    setAddedExpenseDate(date);
  };

  const addExpenseAndClose = (e) => {
    e.preventDefault();

    const expenseData = {
      title: addedExpenseDetails,
      balance: addedExpenseAmount,
      date: addedExpenseDate,
      id: uuidv4(),
    };

    props.sendAddedExpense(expenseData);
  };

  return (
    <BaseContainer>
      <Box mb={2}>
        <Typography
          variant="h5"
          className={utilStyles.boldText}
          color="secondary"
        >
          Add Expense
        </Typography>
      </Box>
      <Paper>
        <Box p={2}>
          <form noValidate autoComplete="off" onSubmit={addExpenseAndClose}>
            <TextField
              id="expense-details"
              label="Expense Details"
              variant="outlined"
              value={addedExpenseDetails}
              onChange={modifyAddedExpenseDetails}
              className={utilStyles.marginBotton2}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <TextField
              id="expense-amount"
              label="Amount ($)"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 0.01,
                step: 0.01,
                max: 5000.0,
              }}
              value={addedExpenseAmount}
              onChange={modifyAddedExpenseAmount}
              className={utilStyles.marginBotton2}
              fullWidth
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{
                  width: "100%",
                }}
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                id="expense-date"
                label="Expense Date"
                onChange={modifyAddedExpenseDate}
                value={addedExpenseDate}
              />
            </MuiPickersUtilsProvider>
            <Box xs={12} mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </BaseContainer>
  );
};
