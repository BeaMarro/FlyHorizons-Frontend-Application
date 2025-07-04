import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenManager from "../api/TokenManager";
import { Container, Tab, Nav, Row, Col, Card } from "react-bootstrap";
import UserAPI from "../api/UserAPI";
import Loader from "../components/Loader";
import AccountActions from "../components/account/AccountActions";
import BookingAPI from "../api/BookingAPI";
import MiniBookingScroll from "../components/booking/MiniBookingScroll";
import AdminFlightManagement from "../components/admin/AdminFlightManagement";
import AdminAirportManagement from "../components/admin/AdminAirportManagement";

function ProfilePage() {
  const navigate = useNavigate();

  const accessToken = TokenManager.getAccessToken();
  const claims = TokenManager.getClaims();
  const id = claims ? claims.account_id : null;
  const role = claims?.role;

  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState({});
  const [userBookings, setUserBookings] = useState([]);

  const getAccount = async (id) => {
    try {
      const fetchedAccount = await UserAPI.getUserById(id);
      setAccount(fetchedAccount);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const getBookingsByUser = async () => {
    try {
        const fetchedBookings = await BookingAPI.getBookingsByUserID();
        setUserBookings(fetchedBookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await UserAPI.deleteUser(id);
      TokenManager.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await UserAPI.putUser(updatedAccount);
      setAccount(updatedAccount);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      getAccount(id);
      getBookingsByUser();
    }
  }, [accessToken, role, navigate, id]);
  
  return (
    <div className="account-background">
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-center mb-4">My Account</h1>
            <p>You are logged in as a {role.toLowerCase()}.</p>

            <Tab.Container defaultActiveKey="account">
              <Row className="w-100" style={{ maxWidth: "800px" }}>
                <Col sm={4}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="account">Account Info</Nav.Link>
                    </Nav.Item>
                    {role === "admin" ? (
                      <Nav.Item>
                        <Nav.Link eventKey="flights">Manage Flights</Nav.Link>
                        <Nav.Link eventKey="airports">Manage Airports</Nav.Link>
                      </Nav.Item>
                    ) : (
                      <Nav.Item>
                        <Nav.Link eventKey="bookings">My Bookings</Nav.Link>
                      </Nav.Item>
                    )}
                  </Nav>
                </Col>

                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="account">
                      <AccountActions
                        account={account}
                        updatedAccount={updatedAccount}
                        bookings={userBookings}
                        setUpdatedAccount={setUpdatedAccount}
                        showUpdateModal={showUpdateModal}
                        setShowUpdateModal={setShowUpdateModal}
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                        setShowDataModal={setShowDataModal}
                        showDataModal={showDataModal}
                      />
                    </Tab.Pane>

                    <Tab.Pane eventKey="bookings">
                      <Card className="semi-transparent-card p-3">
                        {userBookings && userBookings.length > 0 ? (
                            <MiniBookingScroll bookings={userBookings} />
                          ) : (
                            <p>No bookings have been created yet for this account.</p>
                          )}
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="flights">
                      <Card className="semi-transparent-card p-3">
                        <AdminFlightManagement />
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="airports">
                      <Card className="semi-transparent-card p-3">
                        <AdminAirportManagement />
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </>
        )}
      </Container>
    </div>
  );
}

export default ProfilePage;