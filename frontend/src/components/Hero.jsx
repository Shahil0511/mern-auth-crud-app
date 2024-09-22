import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 flex-column align-items-center hero-card bg-light w-75">
          <h1>MERN Authentication CRUD</h1>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            commodi repellendus nisi, hic adipisci atque iure voluptate
            perferendis, cum, vitae veritatis cupiditate vel. Labore,
            exercitationem?
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign IN
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary" className="me-3">
                Sign OUT
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
