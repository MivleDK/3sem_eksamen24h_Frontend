import React, { useState, useEffect } from "react";
import { URLGetOpportunities } from "./settings";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Table,
  Form,
} from "react-bootstrap";

function OpportunityCrud() {
  const initialValues = {
    status: "",
    name: "",
    contact: "",

  };

  const [allOpportunities, setAllOpportunities] = useState([]);
  const [Opportunity, setOpportunity] = useState(initialValues);

  const fetchOpportunities = () => {
    fetch(URLGetOpportunities)
      .then((res) => res.json())
      .then((data) => {
        setAllOpportunities(data);
      });
  };

  const opportunitiesFormTable = () => {
    return (
      <div>
        <Container>
          <Row className="mt-4">
            <Col>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {allOpportunities.all &&
                    allOpportunities.all.map((elem) => {
                      return (
                        <tr key={elem.name}>
                          <td>{elem.status}</td>
                          <td>{elem.name}</td>
                          <td>{elem.contact}</td>

                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div>
      <Container>
        <h2 className="mb-4">Opportunity CRUD</h2>
      {opportunitiesFormTable()}
        </Container>
    </div>
  );
}

export default OpportunityCrud;