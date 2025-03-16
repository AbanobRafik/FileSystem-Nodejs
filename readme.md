# Node.js File System Server

This is a simple Node.js server that handles HTTP requests to manage a list of products stored in a JSON file.

## Features

- Serve a list of products in JSON format.
- Display a welcome message on the home page.
- Provide a form to add new products.
- Handle form submissions to add new products to the JSON file.

## Endpoints

- `GET /products`: Returns the list of products in JSON format.
- `GET /`: Displays a welcome message.
- `GET /products/new`: Displays a form to add a new product.
- `POST /products/new`: Handles form submissions to add a new product.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-repo-name
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Server

1. Start the server:
    ```sh
    node src/index.js
    ```
2. Open your browser and navigate to `http://localhost:5000`.

### Project Structure

- `src/index.js`: The main server file.
- `data/products.json`: The JSON file that stores the list of products.

## Usage

- To view the list of products, navigate to `http://localhost:5000/products`.
- To add a new product, navigate to `http://localhost:5000/products/new`, fill out the form, and submit it.

## License

This project is licensed under the MIT License.