import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <div style={{}}>
    <footer style={{position:'fixed',bottom: 0, left: 0, width: '100%', backgroundColor: '#343a40' }}>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" style={{color:'white'}} disabled>
            Delete
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-2 mb-2" style={{color:'white'}}>Stay safe</p>
      <Nav className="justify-content-end" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="https://github.com/Penguin-Worker/NapolniPaki" style={{color:'white'}}>GitHub </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
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