# 🧭 FlyHorizons – Frontend Web Application

This is the **official web interface** for **FlyHorizons**, an enterprise-grade airline booking platform. Built using **React** and **React Bootstrap**, the application enables both **users** and **administrators** to interact with all core booking functionalities in a seamless and intuitive UI.

---

## 🚀 Overview

The FlyHorizons frontend acts as the **primary user interface** for interacting with backend microservices via the **Kong API Gateway**. It provides dynamic views and workflows for:

- 🔎 Searching flights
- 🎫 Booking seats
- 💳 Handling payments
- 🧾 Viewing itineraries
- 🛂 Admin management (managing airports and flights)

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **UI Components**: [React Bootstrap](https://react-bootstrap.github.io/)
- **Styling**: HTML5, CSS3
- **Testing**: [Cypress](https://www.cypress.io/) for end-to-end and integration tests
- **API Gateway**: [Kong](https://konghq.com/) for routing and rate limiting
- **Communication**: RESTful APIs via Kong Proxy (backed by RabbitMQ-based services)

---

## 📦 Features

### 👤 User Side
- 🚪 Register and Login
- 🛫 Search and filter available flights
- 💺 Reserve and confirm seats
- 💳 Mock payment processing with status feedback
- 📧 View booking confirmations with downloadable QR codes
- 🧾 View past bookings and account details
- 👤 Update Account Information

### 🛠 Admin Side
- 🚪 Login
- ✈️ Add/edit/delete flight schedules
- 🏢 Manage airport data
- 👤 Update Account Information
---

## 🧪 Testing

The project uses **Cypress** for end-to-end (E2E) testing. Test coverage includes:

- ✅ Flight search workflow
- ✅ Booking and payment flow
- ✅ Admin dashboard interactions
- ✅ Login & role-based access
- ✅ Input validations and error states

### Run Cypress Tests

```bash
npm run cypress:open
```

## 📄 License
This project is shared for educational and portfolio purposes only.
Commercial use, redistribution, or modification is not allowed without explicit written permission.
All rights reserved © 2025 Beatrice Marro.

## 👤 Author
Beatrice Marro
GitHub: https://github.com/beamarro
