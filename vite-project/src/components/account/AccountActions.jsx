import React from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import ActionButton from "../form/ActionButton";

function AccountActions({ account, updatedAccount, bookings, setUpdatedAccount, showUpdateModal, setShowUpdateModal, showDeleteModal, setShowDeleteModal, handleUpdate, handleDelete, setShowDataModal, showDataModal }) {
  return (
    <>
      <Card className="semi-transparent-card">
        <Card.Header>
          <b>Account Information</b>
        </Card.Header>
        <Card.Body>
          <p><b>Full Name:</b> {account.full_name}</p>
          <p><b>Email:</b> {account.email}</p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <ActionButton
            text="Update"
            size="lg"
            onClick={() => {
              setUpdatedAccount(account);
              setShowUpdateModal(true);
            }}
          />
          <ActionButton
            text="Delete"
            size="lg"
            onClick={() => setShowDeleteModal(true)}
          />
          <ActionButton
            text="Personal Data"
            size="lg"
            onClick={() => setShowDataModal(true)}
          />
        </Card.Footer>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><b>Confirm Deletion</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><b>Update Account Information</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedAccount.full_name || ""}
                onChange={(e) =>
                  setUpdatedAccount({ ...updatedAccount, full_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedAccount.email || ""}
                onChange={(e) =>
                  setUpdatedAccount({ ...updatedAccount, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Personal Data Modal */}
      <Modal show={showDataModal} onHide={() => setShowDataModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title><b>Account Personal Data - GDPR</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The data below is all of the data collected from you by <b>FlyHorizons</b>:
          <br />
          <b>1. Account Information</b>
          <ul>
            <li><b>Full Name</b>: {account.full_name}</li>
            <li><b>Email</b>: {account.email}</li>
            <li><b>Account Type</b>: {account.type === 0 ? "Admin" : "User"}</li>
            <li><b>Password</b>: (Not shown for security purposes)</li>
          </ul>

          <b>2. Bookings</b>
          {bookings === null ? (
            <p>No Bookings have been created, <b>no data has been collected here</b>.</p>
          ) : (
            <>
              <p>You have created a total of <b>{bookings.length} Booking(s).</b></p>
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index}>
                    <b>Flight Code</b>: {booking.flight_code}<br />
                    <b>Flight Class</b>: {booking.flight_class === 0 ? "Economy" : "Business"}<br />
                    <b>Luggage</b>:
                    <ul>
                      {booking.luggage.map((luggage, luggageIndex) => (
                        <li key={luggageIndex}>{luggage}</li>
                      ))}
                    </ul>
                    <b>Seats</b>:
                    <ul>
                      {booking.seats.map((seat, seatIndex) => (
                        <li key={seatIndex}>
                          <b>Row</b>: {seat.row}
                          <br/>
                          <b>Column</b>: {seat.column}
                        </li>
                      ))}
                    </ul>
                    <b>Passengers</b>:
                    <ul>
                      {booking.passengers.map((passenger, passengerIndex) => (
                        <li key={passengerIndex}>
                          <b>Full Name</b>: {passenger.full_name}
                          <br/>
                          <b>Email</b>: {passenger.email}
                          <br/>
                          <b>Date of Birth</b>: {passenger.date_of_birth}
                          <br/>
                          <b>Passport Number</b>: {passenger.passport_number}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDataModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountActions;