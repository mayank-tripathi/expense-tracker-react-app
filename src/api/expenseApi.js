import axios from 'axios';
import { EXPENSE_API_URLS } from '../constants';

export const getExpensesData = async () => {
  try {
    const data = await axios.get(EXPENSE_API_URLS.GET_ALL);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};

export const deleteExpenses = async (id) => {
  try {
    const data = await axios.delete(`${EXPENSE_API_URLS.DELETE}/${id}`);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};

export const addExpenses = async (expense) => {
  try {
    const data = await axios.post(EXPENSE_API_URLS.ADD, expense);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};

export const modifyExpenses = async (expense) => {
  try {
    const data = await axios.patch(`${EXPENSE_API_URLS.UPDATE}/${expense.id}`, expense);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};