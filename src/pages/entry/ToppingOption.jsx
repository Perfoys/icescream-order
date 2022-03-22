import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    if (event.target.checked) updateItemCount(name, 1);
    else updateItemCount(name, 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  )
};

export default ToppingOption;
