import Nav from 'react-bootstrap/Nav';

function MiniNavBar({ links }) {
  return (
    <Nav variant="underline" defaultActiveKey="/">
      {links.map((link, index) => (
        <Nav.Item key={index}>
          <Nav.Link href={link.link}>{link.title}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default MiniNavBar;