import React, {useState, useEffect} from "react";
import {AllUsers, DeleteUser, UpdateUser, GetUser, AddUser, URLAllContacts} from "./settings";
import{
  Container, 
  Row, 
  Col,
  Button,
  InputGroup,
  FormControl,
  Table, 
  Form
} from "react-bootstrap";

function ContactCrud(){
  const initialValues = {
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    opportunities: "",
  };

  const [allContacts, setAllContacts] = useState([]);
  const [contact, setContact] = useState(initialValues);

  useEffect(() => {
    fetchContacts();
  }, []);  

  const fetchContacts = () =>{
    fetch(URLAllContacts)
    .then((res) => res.json())
    .then((data) => {
      setAllContacts(data)
      console.log(data);
    });
  };

  const contactsFormTable = () =>{
    return(
    <div>
      <Container>
        <h2>Contacts CRUD</h2>
        <Row className="mt-4">
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job title</th>
                  <th>Company</th>                  
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {allContacts.all && allContacts.all.map((elem) =>{
                  return (
                    <tr key={elem.email}>
                      <td>{elem.name}</td>
                      <td>{elem.jobTitle}</td>
                      <td>{elem.company}</td>
                      <td>{elem.phone}</td>
                      <td>{elem.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
    )};

  const contactsForm  = () =>{
    return(
      <div></div>
    )
  }


  return(
    <div>
      {contactsFormTable()}
      {contactsForm()}
    </div>
  )

}

export default ContactCrud;