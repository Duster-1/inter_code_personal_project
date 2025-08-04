import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/test')
      .then(response => {
        setTests(response.data);
      })
      .catch(error => {
        console.error("Помилка", error);
      });
  }, []);

  return (
    <div>
      <h2>Список:</h2>
      <ul>
        {tests.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
