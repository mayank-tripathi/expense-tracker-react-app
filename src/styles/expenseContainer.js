import { makeStyles } from "@material-ui/core";

export const useExpenseContainerStyles = makeStyles({
  bgColor: {
    background: "#e9ecef"
  }
});

export const useExpenseCalendarStyles = makeStyles(theme => ({
  expenseDateFill: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  expenseAmountFill: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}))