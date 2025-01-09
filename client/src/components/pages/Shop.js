import React, { useContext, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TypeBar from '../TypeBar';
import BrandBar from '../BrandBar';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import GoodsList from '../GoodsList';
import CalcilateRange from '../CalcilateRange';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { fetchTypes, fetchBrands, fetchGoods } from '../../http/goodAPI';
import Pages from '../Pages';


const Shop = observer(() => {
  const { goods } = useContext(Context);
  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get('type'); 
    const brandFilter = queryParams.get('brand');
    if (queryParams.has('type') || queryParams.has('brand')) {
      navigate('/shop');}

    
    if (typeFilter) {
      const selectedType = goods.types.find(type => type.name === typeFilter);
      if (selectedType) {
        goods.setSelectedType(selectedType);
        localStorage.setItem('selectedType', JSON.stringify(selectedType)); 
      }
    } else {
      
      const savedType = JSON.parse(localStorage.getItem('selectedType'));
      if (savedType) {
        goods.setSelectedType(savedType);
      }
    }

  
    if (brandFilter) {
      const selectedBrand = goods.brands.find(brand => brand.name === brandFilter);
      if (selectedBrand) {
        goods.setSelectedBrand(selectedBrand);
        localStorage.setItem('selectedBrand', JSON.stringify(selectedBrand)); }
    } else {
      const savedBrand = JSON.parse(localStorage.getItem('selectedBrand'));
      if (savedBrand) {
        goods.setSelectedBrand(savedBrand);
      }
    }

      const savedMinPrice = localStorage.getItem('minPrice') || 0;
    goods.setMinPrice(Number(savedMinPrice));

     const loadInitialData = async () => {
      try {
        const types = await fetchTypes();
        goods.setTypes(types);

        const brands = await fetchBrands();
        goods.setBrands(brands);

        const fetchedGoods = await fetchGoods(
          goods.selectedType.id || null,
          goods.selectedBrand.id || null,
          1,
          goods.limit,
          savedMinPrice
        );
        goods.setGoods(fetchedGoods.rows);
        goods.setTotalCount(fetchedGoods.count);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    loadInitialData();
  }, [goods, location.search]);

  useEffect(() => {
    
    const loadFilteredGoods = async () => {
      try {
        const fetchedGoods = await fetchGoods(
          goods.selectedType.id || null,
          goods.selectedBrand.id || null,
          goods.page,
          goods.limit,
          goods.minPrice
        );
        goods.setGoods(fetchedGoods.rows);
        goods.setTotalCount(fetchedGoods.count);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    };

    loadFilteredGoods();
  }, [goods, goods.selectedType, goods.selectedBrand, goods.page, goods.minPrice, goods.limit]);
  
  const resetFilters = () => {
    goods.setSelectedType({});
    goods.setSelectedBrand({});
    goods.setMinPrice(0);
    goods.setPage(1);

    localStorage.removeItem('selectedType');
    localStorage.removeItem('selectedBrand');
    localStorage.removeItem('minPrice');
   
  };
  
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <CalcilateRange 
            price={goods.minPrice} 
            onFilter={(value) => {
              goods.setMinPrice(value);
              localStorage.setItem('minPrice', value); 
            }} 
          />
          <Button variant="outline-danger" onClick={resetFilters} className="mt-3">
            Сбросить фильтры
          </Button>
          <GoodsList />
          <Pages />
        </Col>
      </Row>
      <div style={{opacity: 0}}>
      <hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr><hr></hr></div>
    </Container>
  );
});

export default Shop;
