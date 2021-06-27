import DateFnsUtils from "@date-io/date-fns";
import { Paper, Box, TextField, Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUtilStyles } from "../../styles";

export const ExpenseForm = (props) => {
  const utilStyles = useUtilStyles();
  const [addedExpenseDetails, setAddedExpenseDetails] = useState(props.title);
  const [addedExpenseAmount, setAddedExpenseAmount] = useState(props.balance);
  const [addedExpenseDate, setAddedExpenseDate] = useState(props.date);
  const [addedExpenseId, setAddedExpenseId] = useState(props.id);

  useEffect(() => {
    if (!props.id) {
      setAddedExpenseId(uuidv4());
    }
  }, [props.id]);

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
      balance: +addedExpenseAmount,
      date: addedExpenseDate,
      id: addedExpenseId,
    };

    props.sendAddedExpense(expenseData);

    setAddedExpenseDetails("");
    setAddedExpenseAmount(0);
    setAddedExpenseDate(new Date());
    setAddedExpenseId(uuidv4());
  };

  return (
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
  );
};
