import React, { useState, useEffect } from "react";
import { URLDeleteContact, URLUpdateContact, URLGetContact, URLAddContact, URLAllContacts } from "./settings";
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

function ContactCrud() {
  const initialValues = {
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    opportunities: [],
  };

  const [allContacts, setAllContacts] = useState([]);
  const [contact, setContact] = useState(initialValues);

  const fetchContacts = () => {
    fetch(URLAllContacts)
      .then((res) => res.json())
      .then((data) => {
        setAllContacts(data);
      });
  };

  const fetchContact = (email) => {
    fetch(URLGetContact + email)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const addContact = () => {
    const options = makeOptions("POST", contact);
    fetch(URLAddContact, options)
      .then((res) => res.json())
      .then((res) => fetchContacts())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };  

  const updateForm = (contact) => {
    const options = makeOptions("PUT", contact);

    fetch(URLUpdateContact, options)
      .then((res) => fetchContacts())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };  

  const deleteContact = (email) => {
    const options = makeOptions("DELETE");

    fetch(URLDeleteContact + email, options)
      .then((res) => res.json())
      .then((data) => {
        setAllContacts(data);
        fetchContacts();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };


  /*
  Function for POST, PUT and DELETE
  */
  function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setContact({ ...contact, [id]: value });
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    //fetchContacts();
    updateForm(contact);
  };






const userForm = () =>{
  return (
    <div>
      <Form inline onSubmit={handleSubmit}>
        <Form.Group className="mr-2" controlId="name">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mr-2" controlId="jobTitle">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Job title"
            value={contact.jobTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mr-2" controlId="company">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Company name"
            value={contact.company}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mr-2" controlId="phone">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Phone number"
            value={contact.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mr-2" controlId="email">
          <Form.Control
            size="sm"
            type="email"
            placeholder="Email address"
            value={contact.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Button size="sm" className="mr-2" variant="success" onClick={() => addContact()}>
          Add Contact
        </Button>        
        <Button size="sm" variant="primary" type="submit">
          Update
        </Button>        
      </Form>
    </div>
  );};

  const contactsFormTable = () => {
    return (
      <div>
        <Container>
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
                  {allContacts.all &&
                    allContacts.all.map((elem) => {
                      return (
                        <tr key={elem.email}>
                          <td>{elem.name}</td>
                          <td>{elem.jobTitle}</td>
                          <td>{elem.company}</td>
                          <td>{elem.phone}</td>
                          <td>{elem.email}</td>
                          <td>
                            <Button variant="warning" onClick={() => fetchContact(elem.email)}>
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button variant="danger" onClick={() => deleteContact(elem.email)}>
                              Delete
                            </Button>
                          </td>
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
    fetchContacts();
  }, []);

  return (
    <div>
      <Container>
        <h2 className="mb-4">Contacts CRUD</h2>
        {userForm()}
        </Container>
      {contactsFormTable()}
    </div>
  );
}

export default ContactCrud;