import * as http from "http";
import fs, { promises as fsPromises } from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const productsPath = path.join(__dirname, "data", "products.json");

  if (req.url === "/products" && req.method === "GET") {
    fs.access(productsPath, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "File not found" }));
        return;
      }
      fs.readFile(productsPath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      });
    });
  } else if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1 style='text-align: center'>Welcome to the server</h1>");
    res.end();
  } else if (req.url === "/products/new" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f2f5;">
        <form action="/products/new" method="POST"
          style="width: 90%; max-width: 400px; padding: 25px; background: white; border-radius: 10px; 
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    
          <h2 style="text-align: center; color: #007BFF; margin-bottom: 20px;">Add a New Product</h2>
    
          <label style="font-weight: bold; display: block; margin-bottom: 5px; color: #333;">Product Name:</label>
          <input type="text" name="name" required 
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; 
            font-size: 16px; margin-bottom: 15px; outline: none; transition: border 0.3s;">
          
          <label style="font-weight: bold; display: block; margin-bottom: 5px; color: #333;">Description:</label>
          <textarea name="description" required 
            style="width: 100%; height: 100px; padding: 12px; border: 1px solid #ccc; border-radius: 5px; 
            font-size: 16px; margin-bottom: 15px; outline: none; transition: border 0.3s;"></textarea>
    
          <label style="font-weight: bold; display: block; margin-bottom: 5px; color: #333;">Price:</label>
          <input type="number" name="price" required 
            style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 5px; 
            font-size: 16px; margin-bottom: 15px; outline: none; transition: border 0.3s;">
          
          <button type="submit" 
            style="width: 100%; background-color: #007BFF; color: white; padding: 12px; border: none; 
            border-radius: 5px; font-size: 18px; cursor: pointer; transition: 0.3s;">
            Submit
          </button>
        </form>
      </div>
    `);
    res.end();
  } else if (req.url === "/products/new" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const data = new URLSearchParams(body);
      const title = data.get("name");
      const description = data.get("description");
      const price = data.get("price");

      try {
        const data = await fsPromises.readFile(productsPath, "utf8");

        const jsonProduct = JSON.parse(data);
        jsonProduct.products.push({
          id: jsonProduct.products.length + 1,
          title: title,
          description: description,
          price: price,
        });
        const updatedProduct = JSON.stringify(jsonProduct, null, 2);

        await fsPromises.writeFile(productsPath, updatedProduct);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          "<h1 style='text-align: center'>Product Added successfully</h1>"
        );
        res.end();
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1 style='text-align: center'>404 Not Found</h1>");
    res.end();
  }
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
