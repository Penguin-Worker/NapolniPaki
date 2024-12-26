import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar= observer(() => {
    const {goods} = useContext(Context)
  return (
    <ListGroup>
      {goods.types.map(type =>
      <ListGroup.Item style={{cursor:'pointer'}} active={type.id === goods.selectedType.id}
       onClick={()=>goods.setSelectedType(type)}
       key={type.id}>
        {type.name}
      </ListGroup.Item>
      )}
    </ListGroup>
  );
})

export default TypeBar;