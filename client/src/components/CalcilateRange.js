import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const CalcilateRange = ({ price, onFilter }) => {
  const [rangeValue, setRangeValue] = useState(price || 0);

  
  useEffect(() => {
    setRangeValue(price || 0);
  }, [price]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setRangeValue(newValue);
    onFilter(newValue);
  };

  return (
    <div className="mt-3">
      <Form.Label>Price: {rangeValue} $</Form.Label>
      <Form.Range
        min={0}
        max={100000} 
        step={10}
        value={rangeValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default CalcilateRange;

