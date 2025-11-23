JS Frameworks 2025 – Online Shop

This project is my submission for the JavaScript Frameworks 2025 course assignment.
It is a fully functional React + TypeScript online shop built using the Noroff Online Shop API.

Users can browse products, view details, search, filter, add items to their cart, checkout, and submit a contact form.

#Live Demo:
-Netlify Deployment: https://jsframeworksvictoria.netlify.app/

#Project Features
##Product List Page:

Fetches products from GET /online-shop

##Displays:

-Product image
-Title
-Price (with discount handling)
-Rating
-Discount percent badge (if discounted)
-Responsive product grid

##Individual Product Page
-Fetches one product using GET /online-shop/:id

Displays:
-Title
-Image
-Description
-Original + discounted price
-Rating
-Tags
-Reviews
-“Add to Cart” button with toast notification

##Search & Sorting
-Search
-Updates results dynamically while typing
-Clears results when the input is empty
-Sorting options
-Name (A–Z / Z–A)
-Price (Low → High / High → Low)
-Rating (High → Low)

##Shopping Cart
-Uses Zustand for global state
-Item count visible in header
-Slide-out cart menu

#Features:
-Increase/decrease quantity
-Remove items
-Total price calculation
-Toast notifications for interactions
-Fully responsive cart panel

##Checkout Page:
-Displays all items in the cart
-Quantity buttons (+ / –)
-Remove item button
-Shows total price

##“Checkout” button:
-Saves order item count
-Clears cart
-Redirects to success page

##Success Page
-Redirects away if accessed directly
-Shows success message
-Displays “Checkout successful!” toast one time only

##Contact Form
#Validates:

-Full name (min 3 characters)
-Subject (min 3 characters)
-Email format
-Message (min 10 characters)
-Shows toast notifications for:
-Errors
-Successful send
-Loading spinner during submission
-Resets the form after sending

##Toast Notifications
#Used for:
-Adding to cart
-Removing from cart
-Checkout success
-Contact form errors
-Contact form success

##Unit Tests

#Built with React Testing Library + Jest
Includes tests for key components such as:

-Header
-Products
-Filter
-Search
-Individual Product
-Contact
-Checkout
-Success

##Tech Stack

-React
-TypeScript
-React Router
-Zustand (state management)
-React Testing Library + Jest
-React Hot Toast
-CSS
-Netlify (deployment)

▶️ How to Run the Project Locally
1. Clone the repository
git clone https://github.com/NoroffFEU/jsfw-2025-v1-victoria-jsframeworks.git
cd jsfw-2025-v1-victoria-jsframeworks

2. Install dependencies
npm install

3. Start development server
npm start


Your app runs at:
http://localhost:3000

Running Tests:
npm test

Build for Production:
npm run build