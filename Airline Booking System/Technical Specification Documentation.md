# Technical Specifications Document

## 1. Document Control
| Version | Date | Project Name | Author(s) |
| :--- | :--- | :--- | :--- |
| v1.0 | 2026-04-11 | Airline Booking System | B606 - Group 2 MCP Project |

## 2. Table of Contents
1. [Introduction](#3-introduction)
    - [Purpose](#31-purpose)
    - [System Overview](#32-system-overview)
    - [Scope](#33-scope)
    - [Technology Stack](#34-technology-stack)
2. [Overall Description](#4-overall-description)
    - [Product Perspective](#41-product-perspective)
    - [Product Functions](#42-product-functions)
    - [User Classes & Characteristics](#43-user-classes-and-characteristics)
    - [Operating Environment](#44-operating-environment)
    - [Assumptions & Dependencies](#45-assumptions-and-dependencies)
3. [Visual Mockup Reference](#5-visual-mockup-reference)
    - [Key Screen References](#51-key-screen-references)
    - [UI Logic Requirements](#52-ui-logic-requirements)
4. [System Features](#6-system-features)
    - [Smart Flight Search Engine](#61-smart-flight-search-engine)
    - [Multi-Passenger Booking Management](#62-multi-passenger-booking-management)
    - [Flight 606 - User Dashboard](#63-flight-606-user-dashboard)
5. [Functional Requirements](#7-functional-requirements)
6. [Non-Functional Requirements](#8-non-functional-requirements)
7. [Data Requirements](#9-data-requirements)
8. [External Interface Requirements](#10-external-interface-requirements)
9. [Glossary](#11-glossary)
10. [Appendices](#12-appendices)

## 3. Introduction

### 3.1 Purpose
To architect a seamless, 'Flight 606' travel experience. This document details the technical infrastructure required to power a modern airline booking platform, focusing on real-time availability, modern web-design, and robust data integrity.

### 3.2 System Overview
The Airline Booking System is a web-based platform designed to facilitate flight searches, real-time flight selection, and passenger reservations. It emphasizes a premium user experience ("Flight 606") while maintaining a normalized data structure for flight manifests.

### 3.3 Scope
* **In-Scope:** Flight searching, flight selection UI, passenger data management, Admin Control & Record and booking confirmation.
* **Out-of-Scope:** Actual credit card or e-wallet processing (mock payments only), real-time radar tracking, and global distribution system (GDS) live sync.

### 3.4 Technology Stack
* **Frontend:** HTML/CSS, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **API Testing:** Postman
* **Design:** Figma
* **Project Management:** Trello

## 4. Overall Description

### 4.1 Product Perspective
The Airline Booking System is a **standalone web application** designed to provide a seamless, end-to-end flight reservation experience. While the current version operates as an independent platform for school project purposes, the architecture is designed to support future integrations with external Flight Data APIs and Global Distribution Systems (GDS).

### 4.2 Product Functions
* **Flight Search & Discovery:** Multi-criteria search (One-way, Round-trip, Multi-city) based on origin, destination, and travel dates.
* **Interactive Booking Engine:** A multi-step workflow including real-time seat selection via a cabin map and optional travel add-ons (baggage, meals).
* **User & Passenger Management:** Distinct handling of User Accounts (login/profile) and Passenger Manifests (legal travel documents) to support group bookings and guest checkouts.
* **Flight Status Tracking:** Real-time search functionality for users to check the arrival and departure status of specific flight numbers.
* **Administrative Dashboard:** A secure interface for staff to manage flight schedules, update seat availability, and export passenger manifests.

### 4.3 User Classes and Characteristics
* **Travelers (End Users):** Casual or frequent flyers who prioritize a high-clarity, intuitive interface. They require mobile responsiveness for booking and checking flight statuses on the go.
* **Flight Administrators:** Internal staff responsible for operational data. They require a "data-rich" dashboard to manage fleet capacity, pricing, and scheduling.
* **Guest Users:** Unauthenticated users who can browse destinations and search for flights but must provide passenger details to complete a transaction.

### 4.4 Operating Environment
* **Client-side:** Optimized for modern evergreen browsers (Chrome, Firefox, Safari, Edge).
* **Server-side:** Built on a Node.js runtime environment.
* **Database:** MongoDB as the primary data store for the Airline-booking system to leverage its document-oriented architecture. This allows for the seamless storage of multi-faceted booking data within a single record, reducing query latency compared to traditional relational joins. 

### 4.5 Assumptions and Dependencies
* **Connectivity:** It is assumed that users have a stable internet connection to access real-time flight data.
* **Data Source:** Flight schedules and pricing are assumed to be managed via the Admin Dashboard or a local mock JSON server for this iteration.
* **Mock Payment:** Payment processing is assumed to be handled via internal wallet system (purely internal logic). No real financial transactions occur
* **Geolocation:** Location-based auto-fill uses the **Browser Geolocation API**(navigator.geolocation)- a built-in, free browser API that prompts the user for permission and returns their GPS coordinates. If the user denies permission, 'From' field defaults to empty and the user has to manually input.
* **Real-time pricing sync:** Stretch Goal and will only be implemented if the core features are completed first.

## 5. Visual Mockup Reference 
> [!IMPORTANT]
> **View High-Fidelity Mockups:** [https://www.figma.com/design/kgJUpm3z5jK5Ya3jaDYiQ8/APRIL-PROJECT?node-id=37-6284&t=KInoG9fmcZiqOFzD-0]

> [!IMPORTANT]
> **Blueprint of the System:** [https://drive.google.com/file/d/1k1MKMJo1E8MnAvm5vZh1KCKPLOtEL_ba/view]

* **Design System & Branding**: 
- **Theme Name**: Flight 606 (Premium Aviation Aesthetic)
- **Color Palette**: 
    - **Primary**: Rich Charcoal *(#1F1F1F)* for navigation and text.
    - **Accent**: Golden Sand *(#D4B982)* for the primary search widgets.
    - **Action**: Deep Navy *(#1B2B48)* for the CTA button.
    - **Background**: Champagne Cream *(#F9F6ED)* for the page background
- **Design Patterns**: High-contrast text overlays, linear gradients for legibility, and back-drop filters for container elements. 

### 5.1 Key Screen References

| Screen / Component | Description | Key UI Elements |
| :--- | :--- | :--- |
| Hero / Landing | The entry point for all users. | Search widget (One-way/Round-trip) Background aircraft image with Top-Down Linear Gradient. |
| Search Widget | The primary data-entry tool. | From/To dropdowns, Departure Date picker, Passenger count, ""Book now!"" button. |
| Featured Destinations | Dynamic grid of top travel spots. | 2-column responsive grid, fixed aspect-ratio images, location detection "Traveling from your location." |
| Interactive Cabin | Seat selection interface. | 2D Seat Map, Legend (Available, Occupied, Selected), ""Seat Locked"" timer logic. | 
| Discover / Editorial Cards | Highlights news, app promos, and destination features. | 3-column card grid, thumbnail images, short descriptions, inline text CTAs (Read More, Download Now, Explore More). | 
| Cheap Flights / Deals Section | Algorithmically curated low-fare suggestions. |  low-fare suggestions. 2-column card grid, destination image, city name, date range, flight duration, price. |
| Footer | Site-wide navigation and brand links. |  Multi-column link groups (Other Offerings, About Us, Corporate Travel, AskMH), newsletter Subscribe CTA, social media icons, legal links. |
| Passenger Details Page | Collects legal traveler information for all passengers on the booking. | Name, birthdate, gender, nationality, passport, expiry date, contact info fields. |
| Payment Page | Mock payment entry form. No real transactions. | Card number, expiry CVV fields. Stripe Test Mode badge. |
| Search Results Page | Displays flights matching the user's query with filter controls. | Flight result cards (airline, time, duration, stops, price), filter sidebar(price,time, stops). |
| Booking Confirmation | Success screen displayed after a booking is finalized. | Unique PNR code, flight summary, passenger list, digital boarding pass preview with QR code. |
| Digital Boarding Pass | Mobile-friendly standalone view of a confirmed flight ticket. | Flight number, route, passenger name, seat number, departure time, QR code for gate scanning. |
| User Dashboard | Personalized hub for authenticated users to manage their travels. | Upcoming trips, past booking history, boarding pass access, loyalty points(stretch goal). |
| Admin Dashboard | Secure management interface for Flight Administrators. | Flight schedule table, add/edit/remove flight controls, seat availability management, passenger manifest export. |
| Login/Register Page | User authentication screens. | Email and password fields, Register and Login CTAs, guest checkout option. | 


### 5.2 UI Logic Requirements
- **Hero & Navigation Logic**: 
  - **Sticky Header Transition**: As the user scrolls past the Hero image ($> 600px$), the navigation bar should transition from transparent to Rich Charcoal (#1F1F1F) with $90\%$ opacity to maintain legibility over content.
  - **Dynamic Tagline Carousel**: The text within the frosted glass box ("This view never gets old," "On cloud nine") should auto-rotate every $5$ seconds with a soft fade-in/out effect.
  - **Progress Slider**: The white progress bar below the tagline must sync with the carousel timer. Clicking the left/right arrows manually resets the timer to zero.

- **Smart Search Widget Logic**:  
    - **Trip Type Toggle**: Switching from "One way" to "Multi-city" must dynamically inject a new row of input fields (From/To) into the widget, expanding the golden container's height smoothly.
    - **Date Picker Constraint**: The "Departure Date" calendar must disable all dates prior to CurrentDate(). For "Round trip," the "Return Date" must disable all dates prior to the selected "Departure Date."
    - **Search Validation** The "Book now!" button remains disabled or returns an animation if the "From" and "To" fields are identical or if the date field is null.

- **Traveling From Your Location**:
  - **Geolocation**: On page load, the system calls navigator.geolocation.getCurrentPosition()- a free, built-in Browser API. If the user grants permission, the returned coordinates are matched to the nearest airport IATA code(e.g.,MNL for Manila) using a local airport lookup table. The 'From' input in the search widget is then pre-populated automatically. If the user denies location permission, the 'From' field remains empty and the user fills it manually.
  - **Real-time Pricing Sync(Stretch Goal)**: The price labels (e.g., $₱ 6,999$) should pull from a min_price variable in your Flights table. If a user changes their location, these cards should trigger a "shimmer" loading effect and refresh with new data.

- **Card Interaction & Animation**:
  - **Destination Card Hover**: On :hover, the destination image should scale by $1.05\times$ within its container (zoom effect) while the "Rich Charcoal" text on the right remains static. This provides tactile feedback without moving the text.
  - **View All / Explore More** Clicking "Explore more destinations" should trigger a smooth scroll or route change to a dedicated Catalog page with active category filters (e.g., "Beach," "City").


## 6. System Features
### 6.1 Smart Flight Search Engine
The core of the application, designed to handle complex travel queries with a focus on speed and accuracy.
    - **Multi-Type Routing**: "One-Way", "Multi-City", and "Round-trip"
    - **Geolocation-Aware**: Automatically pre-fills the "From" field with the user's nearest airport using navigator.geolocation. Requires user permission. Falls back to manual input if denied.
    - **Dynamic Filtering**: Allows users to narrow results by price range, departure time, and number of stops without a full page reload.
### 6.2 Multi-Passenger Booking Management
Recognizing the relationship between Users and Passengers, the system allows for flexible group bookings.
    - **Companion Profiles**: Authenticated users can save "Frequent Travelers" (Family/Friends) to their profile to auto-fill details for future bookings.
    - **Guest Checkout**: Allows passengers to be registered and tickets issued without requiring the user to create a permanent account.
    - **Document Validation**: Built-in logic to ensure Passport/ID formats and expiration dates are valid before proceeding to payment.
### 6.3 "Flight 606" User Dashboard
A personalized hub for managing the travel lifecycle.
    - **Digital Boarding Passes**: Generates a mobile-friendly view of flight details and QR codes upon successful booking.
    - **Trip History**: A chronological archive of past and upcoming flights.
    - **Reward Points Tracking**: (Optional/Stretch Goal) Displays loyalty points earned per kilometer traveled.


## 7. Functional Requirements
### Use Cases
- **Use Case 1**: User Authentication
  - **Description**: Users can register and log in to access personalized features.
  - **Actors**: End User.
  - **Inputs**: Email, password
  - **Preconditions**: User is on authentication page.
  - **Process**: User submits credentials > System validates input > Account is created or authenticated.
  - **Outputs**: User is logged in.
  - **Error Handling**:
    - Invalid email format > Show error message.
    - Existing email > Prompt login instead.

- **Use Case 2**: Flight Search
    - **Description**: Users can search for available flights based on route and date.
    - **Actors**: End User / Guest
    - **Preconditions**: Flight data exists in database.
    - **Process**: User submits search > System queries database > Returns matching flights.
    - **Outputs**: List of available flights or “No results”.
    - **Error Handling**:
      - No flights found > Suggest alternative dates.

- **Use Case 3**: Flight Booking (Core Feature)
    - **Description**: Users reserve a flight by providing passenger details.
    - **Actors**: End User / Guest
    - **Preconditions**: Flight is selected.
    - **Process**: User inputs details > System validates > Calculates price > Saves booking.
    - **Outputs**: Booking record with unique PNR.
    - **Error Handling**:
      - Invalid input > Show validation errors.
      - Flight full > Suggest alternatives.
      - Session timeout > Restart process.

- **Use Case 4**: Booking Management
    - **Description**: Users can view or cancel bookings.
    - **Actors**: Registered End User
    - **Process**: Retrieve bookings > Display details.
    - **Outputs**: Booking list or updated status.
    - **Error Handling**:
      - No bookings > Show empty state.
      - Cancellation failure > Show error.

- **Use Case 5**: Payment Processing (Mock)
    - **Description**: Users complete payment for booking.
    - **Actors**: End User / Guest
    - **Inputs**: Payment details
    - **Preconditions**: Booking exists.
    - **Process**: Validate input > Simulate payment transaction
    - **Outputs**: Payment confirmation and booking update
    - **Error Handling**:
      - Payment failed > Allow retry
      - Timeout > Cancel transaction.
    - **Note**: Payment processing is simulated. No real transactions occur.

- **Use Case 6**: Notifications
    - **Description**: Users receive updates about bookings.
    - **Inputs**: Booking, flight updates, or promotions.
    - **Preconditions**: User is logged in.
    - **Process**: System generates and sends notification
    - **Outputs**: Notification displayed
    - **Error Handling**:
      - Failed delivery → Retry or log error

- **Use Case 7**: Itinerary Management
    - **Description**: Users organize bookings into itineraries.
    - **Inputs**: Booking IDs, itinerary name
    - **Preconditions**: User is logged in and has at least one booking.
    - **Process**: Link bookings > Save itinerary.
    - **Outputs**: Structured itinerary.
    - **Error Handling**:
      - No bookings > Show message.

- **Use Case 8**: Seat Selection
    - **Description**: Users select available seats from a cabin map.
    - **Inputs**: Selected seat
    - **Preconditions**: User is logged in and has at least one booking.
    - **Process**: System checks availability > Locks seat temporarily
    - **Outputs**: Seat marked as selected
    - **Error Handling**:
      - Seat already taken > Prompt reselection


## 8. Non-Functional Requirements
- **Performance**: 
  - Initial page load: under 3 seconds. Search results API response: under 2 seconds. Seat map render: under 1 second after flight selection.
- **Security**: 
  - Passwords should be hashed using bcrypt(min. 10 salt rounds). All HTTP traffic served over HTTPS. API routes requiring authentication protected by JWT middleware. Form inputs validated both client-side and server-side to prevent injection.  
- **Usability**: 
  - Core booking flow completable in 5 steps or less. All error messages written in plain language with no error codes shown to users.
- **Responsiveness**:  
  - Tested and functional on desktop, tablet and mobile phones. All layouts built using Bootstrap 5's responsive grid system.
- **Reliability**: 
  - All API routes return structured JSON error responses. MongoDB connection errors are caught and return a user-friendly 503 message. Target uptime: 99% during the project demo period.
- **Supportability**: 
  - The code should be well-documented and maintainable.
- **Compatibility**: 
  - Tested on Chrome, Firefox, Edge and Safari. No browser-specific layout bugs on any supported screen size.
  

## 9. Data Requirements
- **Data Models**: 
  - **Aircraft**: { id, airlineId, model, totalSeats }
  - **Airline**: { id, name, iataCode, logoUrl }
  - **Airport**: { id, name, iataCode, city, country }
  - **Booking**: { id, userId, guestEmail, flightId, bookingReference, status, totalAmount, bookedAt }
  - **BookingPassenger**: { bookingId, passengerId, ticketNumber }
  - **Contact Message**: { id, userId, subject, message, status, submittedAt }
  - **Flight**: { id, aircraftId, originAirportId, destinationAirportId, flightNumber, departureTime, arrivalTime, status, basePrice }
  - **Itinerary**: { id, userId, name, notes, createdAt }
  - **Itinerary Booking**: { id, itineraryId, bookingId, sortOrder }
  - **Notification**: { id, userId, bookingId, type, message, isRead, sentAt }
  - **Passenger**: { id, firstName, lastName, dateOfBirth, passportNumber }
  - **Payment**: { bookingId, paymentMethod, status, amount, transactionId, paidAt }
  - **Travelers Profile**: { id, userId, firstName, lastName, dateOfBirth, passportNumber }
  - **User**: { id, email, password }
- **Database Requirements**: 
  - Use MongoDB for storing user, product, and order data.
- **Data Storage and Retrieval**: 
  - Users can retrieve their account and order information.

## 10. External Interface Requirements
- **User Interfaces**: 
  - Registration/Login page
  - Flight Search page
  - Flight Results page
  - Booking page (Passenger Details)
  - Payment page
  - Booking Confirmation page
  - My Trips / Itinerary page
  - Seat Selection Page
  - Admin Dashboard
  - Digital Boarding Pass

- **API Interfaces**: 
  - Payment gateway API (e.g., Stripe API) for processing payments.
- **Hardware Interfaces**: 
  - 'Hardware Agnostic' it runs on every device with modern browser installed in their device of choice e.g. smartphone, tablet, laptop, personal computer. 
- **Software Interfaces**: 
  - MongoDB database: Primary database. Express.js communicates with MongoDB via Mongoose ODM library.
  - Browser Geolocation API(navigator.geolocation): Used optionally to detect the user's nearest airport for search widget auto-fill. Free, built-in and requires user permission.

## 11. Glossary
- **API(Application Programming Interface)**: A defined set of rules enabling software components to communicate with each other.
- **Bootstrap 5**: A popular open-source CSS framework for building responsive, mobile-first web pages using pre-built UI components.
- **CTA:** Call To Action - a UI element(e.g. button) prompting the user to take a specific action.
- **Express.js**: A lightweight and flexible Node.js web application framework used to build server-side applications and RESTful APIs.
- **GDS(Global Distribution System)**: a network platform used by travel agencies to access real-time airline seat inventory and pricing.
- **SKU**: Stock Keeping Unit.
- **MongoDB**: A NoSQL, document-oriented database that stores data in flexible JSON-like documents instead of fixed relational tables
- **Node.js**: An open-source, cross-platform JavaScript runtime environment that executes JavaScript code server-side. 
- **PNR(Passenger Name Record)**: A unique alphanumeric booking reference code generated for each confirmed reservation. 
- **Postman**: A collaborative platform and tool used by developers to design, test, and debug API endpoints during development. 
- **REST(Representational State Transfer)**: A standard architectural style for designing networked APIs using HTTP methods. 
- **UID(User Identification)**: A unique identifier automatically assigned to each registered user account in the system.

## 12. Appendices
- **Supporting Information**: 
  - User flow diagrams- TBD
  - Wireframes- TBD
  - Trello Board- TBD
  - Figma Mockups- TBD

- **Revision History**: 
  - **v1.0**: Initial version - April 11, 2026
  - **v1.1**: First revision - April 14, 2026
      - Added details on Section 3.4, 5.
      - Added Feature 7 & 8 on system requirements
      - Added Glossary terms and Appendices
  - **v1.2**: Added missing details / improved sections - April 15, 2026

