# Canteen Administrative Portal - Frontend

## Project Overview

This repository contains the complete frontend architecture for the Canteen Administrative Portal, a comprehensive software solution meticulously designed for the modern food service proprietor. Engineered with leading web technologies, this portal provides a responsive, intuitive, and robust interface for the complete management of canteen operations, from order fulfillment to menu engineering and financial reporting.

The application has been architected with a "backend-ready" philosophy. Throughout the codebase, placeholder functions and detailed comments are provided to facilitate seamless integration with a custom RESTful API.

## Core Features & Capabilities

### I. The Command Dashboard

A central hub providing a real-time, at-a-glance overview of the canteen's operational status.

- **Actionable Order Queue:** A live feed of all pending orders, intelligently sorted by the most urgent delivery time and featuring a dynamic countdown timer for each.
- **Detailed Order Inspection:** A modal interface for in-depth review of any order, displaying itemized lists, total cost, customer details, and service type (Dine-in/Parcel), with immediate actions to mark orders as "Completed" or "Cancelled".
- **Performance Analytics:** A ranked list showcasing the top-selling menu items to inform business decisions.

### II. Menu & Inventory Management

A sophisticated, two-tiered system designed for granular control over all menu offerings.

- **Hierarchical Structure:** A top-level view of all menu categories, each displaying its name, representative image, and the total number of items it contains.
- **Time-Based Availability:** The ability to define specific operational hours (e.g., 08:00 to 12:00) for each category. Items within a category that is outside its active time range are automatically designated as "Out of Stock".
- **Full CRUD Operations:**
  - **Item Management:** Functionality to add, edit (name, price, image), and delete individual menu items.
  - **Category Management:** Functionality to add, edit (name, image, timings), and delete entire categories, including a safety protocol to prevent the deletion of categories that still contain items.
  - **Stock Control:** A simple toggle to manage the in-stock or out-of-stock status of any item, which is respected within the category's active hours.

### III. Comprehensive Record Keeping

- **Complete Order Ledger:** A historical archive of all processed orders. This includes advanced filtering capabilities, allowing the administrator to query records by status ("Completed", "Cancelled", "All") and within a specified date range.
- **Data Exportation:** A powerful reporting tool for generating business intelligence. Administrators can generate and download detailed reports in both **PDF** and **Excel (CSV)** formats, with data filtered by order status and date range.

### IV. System Configuration

A centralized module for managing global operational parameters.

- **Pricing Rules:** The ability to set and modify a global surcharge for all parcel orders.
- **Notification Protocols:** A system to register and manage up to three distinct mobile numbers for receiving critical order notifications.

### V. Foundational Technologies

- **Progressive Web App (PWA):** The application is a fully compliant PWA, enabling it to be installed on desktop or mobile devices for an enhanced, native-like user experience.
- **Secure Access:** A dedicated authentication portal to ensure secure access for authorized administrators.

## Architectural Foundation

- **Core Framework:** React
- **Development Environment & Build Tool:** Vite
- **Styling Engine:** Tailwind CSS
- **Document Generation Libraries:** `jspdf` & `jspdf-autotable`

## Local Development Environment Setup

To deploy and run this project in a local environment, please adhere to the following procedure:

1.  **Acquire the Source Code:**

    ```bash
    git clone [https://github.com/2300031005/kleats_admin.git](https://github.com/2300031005/kleats_admin.git)
    cd kleats_admin/frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Initiate the Development Server:**
    ```bash
    npm run dev
    ```
    The application will then be accessible at the local address: `http://localhost:5173`.

## Available Scripts

- `npm run dev`: Initiates the Vite development server with Hot Module Replacement.
- `npm run build`: Compiles and bundles the application for production deployment.
- `npm run preview`: Serves the production build locally for final review.

## Backend Integration Blueprint

This project is designed for straightforward integration with a backend service. The codebase is annotated with commented-out `async` functions and `fetch` calls. These annotations serve as a clear blueprint for a backend developer to connect the necessary API endpoints for:

- User Authentication & Authorization
- Real-time Dashboard Data Feeds
- Full CRUD Operations for Menu Items & Categories
- Historical Order Data Retrieval & Filtering
- Data Aggregation for Reports
- Global Settings Management
