import {
  Box,
  LinearProgress,
  Typography,
  Modal,
  Grid,
} from "@material-ui/core";
import { ExpenseTile } from "./ExpenseTile";
import { BaseContainer } from "../Common";
import { useUtilStyles } from "../../styles";
import { useState } from "react";
import { ExpenseForm } from "../AddExpense";
import { modifyExpenses } from "../../api";

const getAllExpenses = (
  expenses,
  getDeletedExpense,
  setIsEditing,
  setActiveExpense
) => {
  const editHandler = (activeExpense) => {
    setActiveExpense({ ...activeExpense });
    setIsEditing(true);
  };

  return expenses.length === 0
    ? ""
    : expenses.map((expense, i) => {
        return (
          <ExpenseTile
            title={expense.title}
            date={new Date(expense.date)}
            balance={expense.balance}
            id={expense.id}
            key={expense.id}
            isLast={i === expenses.length -1}
            getDeletedExpense={getDeletedExpense}
            editHandler={editHandler}
          />
        );
      });
};

export const ExpensesContainer = (props) => {
  const utilStyles = useUtilStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [activeExpense, setActiveExpense] = useState({
    id: "",
    title: "",
    balance: 0,
    date: new Date(),
  });

  const saveEditedExpense = (expense) => {
    setIsEditing(false);

    props.updateExpenses((prevExpenses) =>
      prevExpenses.map((exp) =>
        expense.id === exp.id ? { ...expense } : { ...exp }
      )
    );

    modifyExpenses(expense);
  };

  return (
    <BaseContainer>
      <Box mb={2}>
        <Typography
          variant="h5"
          className={utilStyles.boldText}
          color="secondary"
        >
          Expenses
        </Typography>
      </Box>
      {props.expenses.length === 0 ? (
        <LinearProgress />
      ) : (
        getAllExpenses(
          props.expenses,
          props.getDeletedExpense,
          setIsEditing,
          setActiveExpense
        )
      )}
      {isEditing && (
        <Modal open={isEditing}>
          <Grid
            container
            xs={12}
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={8}>
              <Box mt={5}>
                <BaseContainer>
                  <Box mb={2}>
                    <Typography
                      variant="h5"
                      className={utilStyles.boldText}
                      color="secondary"
                    >
                      Edit Expense
                    </Typography>
                  </Box>
                  <ExpenseForm
                    sendAddedExpense={saveEditedExpense}
                    title={activeExpense.title}
                    balance={activeExpense.balance}
                    date={activeExpense.date}
                    id={activeExpense.id}
                  />
                </BaseContainer>
              </Box>
            </Grid>
          </Grid>
        </Modal>
      )}
    </BaseContainer>
  );
};
