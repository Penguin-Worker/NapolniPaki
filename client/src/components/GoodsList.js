import { observer } from 'mobx-react-lite';
import React, { useContext} from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import GoodItem from './GoodItem';


const GoodsList= observer(() => {
  const {goods} = useContext(Context)

  return (
      <Row className="d-flex">
          {goods.goods.map(goods =>
              <GoodItem key={goods.id} goods={goods}/>
          )}
      </Row>
  );
});
export default GoodsList;