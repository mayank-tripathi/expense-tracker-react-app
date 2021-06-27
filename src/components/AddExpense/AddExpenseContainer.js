import { Typography, Box } from "@material-ui/core";
import { useUtilStyles } from "../../styles";
import { BaseContainer } from "../Common";
import { ExpenseForm } from "./ExpenseForm";

export const AddExpenseContainer = (props) => {
  const utilStyles = useUtilStyles();

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
      <ExpenseForm sendAddedExpense={props.sendAddedExpense} title="" balance={0} date={new Date()} id={null} />
    </BaseContainer>
  );
};
