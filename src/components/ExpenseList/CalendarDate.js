import { Box, Paper, Typography } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { useUtilStyles, useExpenseCalendarStyles } from "../../styles";

export const CalendarDate = (props) => {
  const utilStyles = useUtilStyles();
  const expenseCalendarStyles = useExpenseCalendarStyles();

  return (
    <Paper className={expenseCalendarStyles.expenseDateFill}>
      <Box p={1}>
        <Typography
          align="center"
          variant="body1"
          className={utilStyles.boldText}
        >
          <EventIcon fontSize="large" />
        </Typography>
        <Typography
          align="center"
          variant="subtitle1"
          className={utilStyles.boldText}
        >
          {`${props.date.toLocaleString("en-US", {
            day: "numeric",
          })} ${props.date.toLocaleString("en-US", { month: "long" })}`}
        </Typography>
        <Typography align="center" variant="body1">
          {props.date.toLocaleString("en-US", { year: "numeric" })}
        </Typography>
      </Box>
    </Paper>
  );
};
