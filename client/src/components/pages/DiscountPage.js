import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const DiscountsPage = () => {
  const discounts = [
    {
      id: 1,
      title: "20% discount on all products",
      description: "Get a 20% discount on all products until the end of the month.",
      expirationDate: "2025-01-31",
      products: [
        { id: 1, name: "Laminat France", oldPrice: 1500, newPrice: 1200 },
        { id: 3, name: "Leviafan block 15", oldPrice: 1500, newPrice: 1200 }
      ]
    },
    {
      id: 2,
      title: "Discount on laminated flooring",
      description: "10% discount on all laminated flooring.",
      expirationDate: "2025-02-28",
      products: [
        { id: 4, name: "Dark Edge Forser", oldPrice: 1900, newPrice: 1700 }
      ]
    }
  ];

  return (
    <div className='ms-3 mt-3'>
      <h1>Promotions and discounts</h1>
      <Row className="gx-0">
        {discounts.map((discount) => (
          <Col key={discount.id} sm={2} md={3} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{discount.title}</Card.Title>
                <Card.Text>{discount.description}</Card.Text>
                <Card.Text>
                  <strong>Validity period:</strong> {discount.expirationDate}
                </Card.Text>
                <Button variant="primary">More details</Button>
                <h5 className="mt-4">Discounted products</h5>
                {discount.products.map((product) => (
                  <div key={product.id} className="d-flex justify-content-between">
                    <span>{product.name}</span>
                    <span>
                      <del>{product.oldPrice}$</del> {product.newPrice}$
                    </span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DiscountsPage;
