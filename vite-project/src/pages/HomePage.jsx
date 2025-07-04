import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ActionButton from "../components/form/ActionButton";
import introVideo from "../assets/airplane scenic view.mp4";
import landingPageAirport from "../assets/landing page airplane.png";
import earthMap from "../assets/earth map.png";
import bookingBubble from "../assets/booking bubble.png";
import globeBubble from "../assets/global bubble.png";
import serviceBubble from "../assets/service bubble.png";
import valueBubble from "../assets/value bubble.png";

function HomePage() {
    return (
        <div className="home-page-about-container">
            <div className="home-page-container">
                {/* Background video */}
                <video autoPlay loop muted className="background-video">
                    <source src={introVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Main content */}
                <Container className="d-flex align-items-center justify-content-center vh-100">
                    <Container className="glass-effect-card-central">
                            <h1 className="main-heading">FlyHorizons</h1>
                            <h2 className="sub-heading">Adventure Awaits, Take Off with Us!</h2>

                            <Link to="/search-flights">
                                <ActionButton text="Book a Flight" size="lg" onClick={() => {}} />
                            </Link>
                    </Container>
                </Container>
            </div>
            <div className="home-page-about-container">
                <Container className="dual-card-holder-green">
                    <Container className="d-flex align-items-center">
                        <div>
                            <h3>Travel the world with FlyHorizons!</h3>
                            <p>Experience seamless travel like never before. Whether you're jetting off for business or leisure, FlyHorizons makes booking effortless, ensuring every journey is smooth from start to finish. With a wide range of destinations, top-tier service, and unbeatable convenience, your next adventure is just a click away. Discover the world with ease.
                                
                                FlyHorizons takes you there.
                            </p>
                        </div>
                        <div>
                            <Image src={landingPageAirport} width={"500px"} />
                        </div>
                    </Container>
                </Container>
                
                <Container className="mt-2">
                    <h2 className="medior-heading">Why choose FlyHorizons?</h2>
                </Container>

                <Container className="mini-cards-row-container">
                    <Container className="d-flex align-items-center booking-container">
                        <Container>
                            <Image src={bookingBubble}/>
                            <h5>Seamless Booking</h5>
                            <p className="booking-text">Effortlessly reserve your flights with our intuitive and streamlined booking system.</p>
                        </Container>
                    </Container>

                    <Container className="d-flex align-items-center booking-container">
                        <Container>
                            <Image src={globeBubble}/>
                            <h5>Global Reach</h5>
                            <p className="booking-text">Explore a vast network of destinations and make the world your playground.</p>
                        </Container>
                    </Container>

                    <Container className="d-flex align-items-center booking-container">
                        <Container>
                            <Image src={serviceBubble}/>
                            <h5>Exceptional Service</h5>
                            <p className="booking-text">Enjoy world-class hospitality, ensuring a smooth and comfortable journey.</p>
                        </Container>
                    </Container>

                    <Container className="d-flex align-items-center booking-container">
                        <Container>
                            <Image src={valueBubble}/>
                            <h5>Best Value</h5>
                            <p className="booking-text">Get competitive prices and exclusive deals without compromising on quality.</p>
                        </Container>
                    </Container>
                </Container>
                <Container className="dual-card-holder-white">
                    <Container className="d-flex align-items-center">
                        <div>
                            <Image src={earthMap} width={"500px"} />
                        </div>
                        <div>
                            <h3>Travel confidently across the globe</h3>
                            <p>FlyHorizons connects you to the world with ease and reliability. Whether you’re crossing continents or exploring hidden gems, our global network ensures you reach your destination smoothly. With top-tier safety, seamless booking, and exceptional service, every journey is stress-free. 

                                Wherever your adventure takes you, FlyHorizons gives you the confidence to explore without limits.
                            </p>
                        </div>
                    </Container>
                </Container>
            </div>
        </div>
    );
}

export default HomePage;