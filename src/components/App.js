import { Container, Grid, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { addExpenses, deleteExpenses, getExpensesData } from "../api";
import { applyFilter, deleteExpense, getChartData, getFilterData } from "../service";
import { theme } from "../styles";
import { AddExpenseContainer } from "./AddExpense";
import { ExpenseChart } from "./ExpenseChart";
import { ExpensesContainer } from "./ExpenseList";
import { FilterExpenses } from "./Filter";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([...expenses]);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilterYear, setSelectedFilterYear] = useState(-1);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function setExpenseValue() {
      setExpenses(await getExpensesData());
    }

    setExpenseValue();
  }, []);

  useEffect(() => {
    setFilterData(getFilterData(expenses));
  }, [expenses]);

  useEffect(() => {
    const filteredData = applyFilter(selectedFilterYear, expenses);
    setFilteredExpenses(filteredData);
    setChartData(getChartData(filteredData, selectedFilterYear));
  }, [selectedFilterYear, expenses]);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      return [newExpense, ...prevExpenses];
    });
    addExpenses(newExpense);
  };

  const deleteSelectedExpense = (id) => {
    setExpenses((prevExpenses) => {
      return deleteExpense(id, prevExpenses);
    });

    deleteExpenses(id);
  };

  const handleFilterChange = (filterYear) => {
    setSelectedFilterYear(filterYear);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExpenseChart chartData={chartData} />
          </Grid>
          <Grid item xs={12}>
            <FilterExpenses
              filterData={filterData}
              selecterYear={selectedFilterYear}
              getFilterYear={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AddExpenseContainer sendAddedExpense={addExpense} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <ExpensesContainer
              expenses={filteredExpenses}
              getDeletedExpense={deleteSelectedExpense}
              updateExpenses={setExpenses}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
