import {
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  ButtonGroup
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EditIcon from '@material-ui/icons/Edit';
import { CalendarDate } from "./CalendarDate";
import { useUtilStyles } from "../../styles";

export const ExpenseTile = (props) => {
  const utilStyles = useUtilStyles();

  const deleteSelectedExpense = (id) => {
    props.getDeletedExpense(id);
  };

  return (
    <Box mb={props.isLast ? 0 : 2}>
      <Paper>
        <Box>
          <Grid container spacing={0} direction="row">
            <Grid item xs={12} sm={4} md={2}>
              <CalendarDate date={props.date} />
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={8}
              md={10}
              spacing={0}
              direction="row"
              justify="center"
              alignItems="flex-end"
            >
              <Grid item xs={12} sm={8} md={9}>
                <Box p={2}>
                  <Typography className={utilStyles.boldText} variant="body1">{props.title}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                >
                  <MonetizationOnIcon fontSize="large" color="primary" />
                  <Box ml={1}>
                    <Typography
                      align="center"
                      variant="body1"
                      className={utilStyles.boldText}
                      color="primary"
                    >
                      {props.balance}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup variant="text" fullWidth={true}>
                  <Button
                    color="secondary"
                    onClick={() => props.editHandler(props)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => deleteSelectedExpense(props.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
