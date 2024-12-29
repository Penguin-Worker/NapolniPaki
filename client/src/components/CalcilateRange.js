import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const CalcilateRange = ({ price, onFilter }) => {
  const [rangePrice, setRangePrice] = useState(price);

  const handleRangeChange = (e) => {
    const newPrice = Number(e.target.value);
    setRangePrice(newPrice);
    onFilter(newPrice); 
  };

  return (
    <div>
      <Form.Label>
        Minimum price: {rangePrice}$
      </Form.Label>
      <Form.Range
        min={0}
        max={10000}
        step={10}
        value={rangePrice}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default CalcilateRange;
