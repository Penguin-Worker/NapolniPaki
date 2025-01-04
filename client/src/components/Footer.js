import Nav from 'react-bootstrap/Nav';
import { BASKET_ROUTE, HOME_ROUTE } from './utils/consts';

const Footer = () => {
  return (
    <div style={{}}>
    <footer style={{position:'fixed',bottom: 0, left: 0, width: '100%', backgroundColor: '#343a40' }}>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href={HOME_ROUTE}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={BASKET_ROUTE} eventKey="link-1">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={HOME_ROUTE} eventKey="link-2">Think</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" style={{color:'white'}} disabled>
            Delete soon
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-1 mb-1" style={{color:'white'}}>Stay safe</p>
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="https://github.com/Penguin-Worker/NapolniPaki" style={{color:'white'}}>GitHub </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">FAQ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={HOME_ROUTE} eventKey="link-2">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" style={{color:'white'}} disabled>
            Soon
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </footer>
    </div>
  );
}

export default Footer;