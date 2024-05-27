
# Real-Time Bidding Platform

## Setup

1. Clone the repository:

    ```sh
    git clone <https://github.com/Shailendra1311/bidding_platform>
    cd bidding-platform
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file and add the following:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=bidding_platform
    JWT_SECRET=your_jwt_secret
    ```

4. Set up the database:

    ```sh
    node src/sync.js
    ```

5. Run the server:

    ```sh
    npm start
    ```

## API Endpoints

- **User Endpoints**
    - `POST /users/register` - Register a new user.
    - `POST /users/login` - Authenticate a user and return a token.
    - `GET /users/profile` - Get the profile of the logged-in user.

- **Item Endpoints**
    - `GET /items` - Retrieve all auction items.
    - `GET /items/:id` - Retrieve a single auction item by ID.
    - `POST /items` - Create a new auction item.
    - `PUT /items/:id` - Update an auction item by ID.
    - `DELETE /items/:id` - Delete an auction item by ID.

- **Bid Endpoints**
    - `GET /items/:itemId/bids` - Retrieve all bids for a specific item.
    - `POST /items/:itemId/bids` - Place a new bid on a specific item.

- **Notification Endpoints**
    - `GET /notifications` - Retrieve notifications for the logged-in user.
    - `POST /notifications/mark-read` - Mark notifications as read.

## WebSocket Events

- **Bidding**
    - `connection` - Establish a new WebSocket connection.
    - `bid` - Place a new bid on an item.
    - `update` - Notify all connected clients about a new bid on an item.

- **Notifications**
    - `notify` - Send notifications to users in real-time.
