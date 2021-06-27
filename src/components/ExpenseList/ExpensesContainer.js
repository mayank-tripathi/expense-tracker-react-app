import { Box, LinearProgress, Typography } from "@material-ui/core";
import { ExpenseTile } from "./ExpenseTile";
import { BaseContainer } from "../Common";
import { useUtilStyles } from "../../styles";

const getAllExpenses = (expenses, getDeletedExpense) => {
  return expenses.length === 0
    ? ""
    : expenses.map((expense) => {
        return (
          <ExpenseTile
            title={expense.title}
            date={new Date(expense.date)}
            balance={expense.balance}
            id={expense.id}
            key={expense.id}
            getDeletedExpense={getDeletedExpense}
          />
        );
      });
};

export const ExpensesContainer = (props) => {
  const utilStyles = useUtilStyles();

  return (
    <BaseContainer>
      <Box mb={2}>
        <Typography variant="h5" className={utilStyles.boldText} color="secondary">
          Expenses
        </Typography>
      </Box>
      {props.expenses.length === 0 ? (
        <LinearProgress />
      ) : (
        getAllExpenses(props.expenses, props.getDeletedExpense)
      )}
    </BaseContainer>
  );
};
