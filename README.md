# Plant Sage - Plant Care & Management Website

**Live URL:** https://plant-sage-59c7f.web.app

## Introduction

Plant Sage is a modern web application for plant lovers to manage, track, and care for their houseplants. The platform provides a seamless experience for users to add, update, and monitor their plants, access care tips, and maintain a healthy indoor garden. Built with React, Firebase, and Tailwind CSS, Plant Sage offers a responsive and intuitive interface for all users.

## Description

Plant Sage is designed to help users keep their indoor plants healthy and organized. After registering, users can log in to their dashboard, add new plants with images and care details, and update or remove them as needed. The "All Plants" page allows users to browse the entire collection, while the "My Plants" dashboard focuses on their personal collection. Each plant has a dedicated details page with care instructions and history. The app leverages Firebase for authentication and data storage, ensuring a secure and real-time experience. The interface is built with React and styled using Tailwind CSS for a clean, modern look. Additional features like toast notifications, modals, and animated banners enhance usability and engagement.

## Features

-   User authentication and secure account management
-   Add, update, and delete your own plants with images and details
-   Browse all plants and view detailed information for each
-   Personalized dashboard to track your plants and care schedules
-   Access to curated plant care tips and guides
-   Responsive design for mobile and desktop
-   Real-time notifications and feedback

## Main Pages

-   Home
-   Login
-   Registration
-   All Plants
-   My Plants (user dashboard)
-   Add Plant
-   Update Plant
-   Single Plant Details
-   Error/404

## Packages Used

| Package Name      | Purpose/Description               |
| ----------------- | --------------------------------- |
| react             | UI library                        |
| react-dom         | DOM bindings for React            |
| react-router      | Routing and navigation            |
| firebase          | Backend, authentication, database |
| tailwindcss       | Utility-first CSS framework       |
| @tailwindcss/vite | Tailwind integration for Vite     |
| vite              | Frontend build tool               |
| lottie-react      | Lottie animations                 |
| lucide-react      | Icon library                      |
| react-hot-toast   | Toast notifications               |
| react-icons       | Icon library                      |
| react-spinners    | Loading spinners                  |
| sweetalert2       | Alert dialogs                     |
| swiper            | Carousel/slider                   |
| date-fns          | Date utilities                    |
| ShadCn UI         | Accessible UI primitives          |

## Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b11a10-client-side-yhsunny176.git
   cd b11a10-client-side-yhsunny176
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory if required (for Firebase or other API keys).
   - Example:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   - Visit `http://localhost:5173` in your browser.
