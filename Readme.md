# Norebase Server

## Overview
This is a simple Express-based API for managing "like" counts on articles. It allows users to fetch the current like count of an article and increment the like count. The application uses MongoDB to store the article data and supports rate-limiting to prevent abuse.

## Features
- **Get Like Count**: Retrieve the current like count for a specific article.
- **Increment Like Count**: Increment the like count for a given article.
- **Rate Limiting**: Prevent abuse by limiting the number of requests from the same client.
- **MongoDB**: Store article data including like counts.

## Technologies Used
- **Express**: Web framework for Node.js to create the API.
- **MongoDB (Mongoose)**: NoSQL database to store article data and like counts.
- **dotenv**: To manage environment variables securely.
- **CORS**: Allow cross-origin requests.
- **express-rate-limit**: Prevents abuse by limiting the number of requests.
  
Setup Instructions

1. Clone the repository:
   git clone <repository-url>
  
2. Install dependencies:
npm install

3. Create a .env file in the root directory with the following content (ensure you have MongoDB credentials):

MONGO_URI=<your-mongo-uri>
PORT=2002

4. Start the application:
npm run server
