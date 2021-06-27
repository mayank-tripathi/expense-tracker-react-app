import { Box, Paper } from '@material-ui/core';
import { useExpenseContainerStyles } from '../../styles';

export const BaseContainer = (props) => {
  const expenseContainerStyles = useExpenseContainerStyles();

  return (
    <Box p={0}>
      <Paper className = {expenseContainerStyles.bgColor} elevation={0}>
        <Box p={2}>
          {props.children}
        </Box>
      </Paper>
    </Box>
  );
};