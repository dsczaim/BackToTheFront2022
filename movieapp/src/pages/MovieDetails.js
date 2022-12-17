import React from "react";
import { Button, Row, Col, Container } from "reactstrap";
import { useParams } from "react-router";
import Nav from "./../components/Nav";

export default function MovieDetails() {
  const { id } = useParams();

  return (
    <div>
      <Nav />
      <Container style={{ marginTop: "50px" }}>
        <Row md="2" sm="2" xs="1">
          <Col className="bg-light ">
            {" "}
            <img
              alt="Card cap"
              src="https://picsum.photos/318/180"
              width="100%"
            />
          </Col>
          <Col className="bg-light border borderR">
            <Row md="2" sm="2" xs="1">
              <Col className="bg-light border borderR">Film Adı</Col>
              <Col className="bg-light border borderR">Rating</Col>
            </Row>
            <Row md="2" sm="2" xs="1">
              <Col className="bg-light borderR">Genre</Col>
            </Row>
            <Row md="1" sm="2" xs="1">
              <Col className="bg-light borderR">Özet </Col>
            </Row>
            <Row md="3" sm="2" xs="1">
              <Col className="bg-light borderR">Oyuncular </Col>
              <Col className="bg-light border borderR">Oyuncu Adı</Col>
              <Col className="bg-light border borderR">Oyuncu Adı</Col>
            </Row>
            <Row md="1" sm="2" xs="1">
              <Col className="bg-light borderR">Platform </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
