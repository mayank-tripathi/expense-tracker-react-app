import { Container, Grid, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { addExpenses, deleteExpenses, getExpensesData } from "../services";
import { theme } from "../styles";
import { AddExpenseContainer } from "./AddExpense";
import { ExpenseChart } from "./ExpenseChart";
import { ExpensesContainer } from './ExpenseList';
import { FilterExpenses } from "./Filter/FilterExpenses";

const getFilterData = expenses => {
  let years = [];
  
  for (const expense of expenses) {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();

    if (years.indexOf(expenseYear) === -1) {
      years.push(expenseYear);
    }
  }

  return years.sort();
};

const applyFilter = (filterYear, expenses) => {
  if (+filterYear === -1) return [...expenses];

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);

    return +filterYear === +expenseDate.getFullYear();
  });
};

const deleteExpense = (id, expenses) => {
  return expenses.filter(expense => expense.id !== id);
};

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([...expenses]);
  const [filterData, setFilterData] = useState([]);
  const [selectedFilterYear, setSelectedFilterYear] = useState(-1);

  useEffect(() => {
    async function setExpenseValue () {
      setExpenses(await getExpensesData());
    }
    
    setExpenseValue();
  }, []);

  useEffect(() => {
    setFilterData(getFilterData(expenses));
  }, [expenses]);

  useEffect(() => {
    setFilteredExpenses(applyFilter(selectedFilterYear, expenses));
  }, [selectedFilterYear, expenses]);

  const addExpense = newExpense => {
    console.log(newExpense);
    setExpenses(prevExpenses => {
      return [newExpense, ...prevExpenses];
    });
    addExpenses(newExpense);
  };

  const deleteSelectedExpense = id => {
    setExpenses(prevExpenses => {
      return deleteExpense(id, prevExpenses);
    });

    deleteExpenses(id);
  };

  const handleFilterChange = filterYear => {
    setSelectedFilterYear(filterYear);
  };

  return (
    <ThemeProvider theme = {theme}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ExpenseChart />
          </Grid>
          <Grid item xs={12}>
            <FilterExpenses filterData={filterData} selecterYear={selectedFilterYear} getFilterYear={handleFilterChange}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AddExpenseContainer sendAddedExpense={addExpense} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <ExpensesContainer expenses={filteredExpenses} getDeletedExpense={deleteSelectedExpense} />
          </Grid>
        </Grid>
      </Container> 
    </ThemeProvider>
  );
}

export default App;
