import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to 
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Form>
      <Form.Group controlId="terms and conditions">
        <Form.Check 
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order  
      </Button>
    </Form>
  );
};

export default SummaryForm;
