import React from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardLink,
  CardText,
  Button,
  Col,
  Row,
} from "reactstrap";
export default function SearchResult() {
  const { searchText } = useParams();

  return (
    <div>
      <Nav />

      <Row md="3" sm="3" xs="1">
        <Col className="bg-light">
          <Card
            style={{
              width: "25rem",
              margin: "25px",
            }}
          >
            <CardBody>
              <CardTitle tag="h5">Film Adı</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Rating
              </CardSubtitle>
            </CardBody>
            <img
              alt="Card cap"
              src="https://picsum.photos/318/180"
              width="100%"
            />
            <CardBody>
              <CardText>Özet</CardText>
              <Button href="/moviedetails/1" color="warning">
                Detaylara Bak
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
