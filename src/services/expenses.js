import axios from 'axios';

const API_URL = 'http://localhost:3001';
export const getExpensesData = async () => {
  try {
    const data = await axios.get(`${API_URL}/expenses`);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};

export const deleteExpenses = async (id) => {
  try {
    const data = await axios.delete(`${API_URL}/expenses/${id}`);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};

export const addExpenses = async (expense) => {
  try {
    const data = await axios.post(`${API_URL}/expenses`, expense);
    return data.data;
  } catch(err) {
    console.log(err);
  }
};