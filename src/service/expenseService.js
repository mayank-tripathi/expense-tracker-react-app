export const getFilterData = (expenses) => {
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

export const applyFilter = (filterYear, expenses) => {
  if (+filterYear === -1) return [...expenses];

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return +filterYear === +expenseDate.getFullYear();
  });
};

export const deleteExpense = (id, expenses) => {
  return expenses.filter((expense) => expense.id !== id);
};

export const getYearWiseData = (expenseData) => {
  const tempData = {};

  for (const expense of expenseData) {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();

    if (typeof tempData[expenseYear] === "undefined") {
      tempData[expenseYear] = {
        name: `${expenseYear}`,
        TotalExpense: expense.balance,
      };
    } else {
      tempData[expenseYear].TotalExpense += expense.balance;
    }
  }

  return Object.keys(tempData).map((key) => tempData[key]);
};

export const getMonthWiseData = (expenseData) => {
  let chartData = [
    {
      name: "Jan",
      TotalExpense: 0,
    },
    {
      name: "Feb",
      TotalExpense: 0,
    },
    {
      name: "Mar",
      TotalExpense: 0,
    },
    {
      name: "Apr",
      TotalExpense: 0,
    },
    {
      name: "May",
      TotalExpense: 0,
    },
    {
      name: "Jun",
      TotalExpense: 0,
    },
    {
      name: "Jul",
      TotalExpense: 0,
    },
    {
      name: "Aug",
      TotalExpense: 0,
    },
    {
      name: "Sep",
      TotalExpense: 0,
    },
    {
      name: "Oct",
      TotalExpense: 0,
    },
    {
      name: "Nov",
      TotalExpense: 0,
    },
    {
      name: "Dec",
      TotalExpense: 0,
    },
  ];

  for (const expense of expenseData) {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();

    chartData[expenseMonth].TotalExpense += expense.balance;
  }

  return chartData;
};

export const getChartData = (expenseData, activeFilter) => {
  if (+activeFilter === -1) {
    return getYearWiseData(expenseData);
  } else {
    return getMonthWiseData(expenseData);
  }
};