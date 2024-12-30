import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { goods } = useContext(Context);

  const handleTypeClick = (type) => {
    if (goods.selectedType.id === type.id) {
      goods.setSelectedType({});
      localStorage.removeItem('selectedType'); 
    } else {
      goods.setSelectedType(type);
      localStorage.setItem('selectedType', JSON.stringify(type)); }
  };

  return (
    <ListGroup >
      {goods.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer',backgroundColor: 'lightgray' }}
          active={type.id === goods.selectedType.id}
          onClick={() => handleTypeClick(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
