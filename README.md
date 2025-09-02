<div align="center">
  <h1>🍳 RasoiMate</h1>
  <p><strong>Your AI-powered personal chef for creating unique recipes from the ingredients you already have!</strong></p>
</div>

<!-- <p align="center">
  <img src="https://raw.githubusercontent.com/username/repo/main/public/demo.gif" alt="RasoiMate Showcase" width="800"/>
</p>
*(Replace the above with a GIF or screenshot of your application)* -->

---

### ✨ Key Features

| Feature                 | Description                                                                                             | Icon |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | :--: |
| **Dynamic Recipes** | Leverages LLMs (Llama 3, Gemma 2) via the Groq API to generate unique recipes in real-time.              |  🤖  |
| **Model Selection** | Allows users to choose their preferred AI model, offering a variety of culinary styles and creativity.  |  🎨  |
| **Responsive Design** | Built with React & Tailwind CSS for a seamless, intuitive experience on desktop, tablet, and mobile.    |  📱  |
| **Fast & Scalable** | Powered by an asynchronous FastAPI backend and a robust MongoDB database for high performance.            |  ⚡️  |

---

### 🛠️ Tech Stack

<table>
  <tr>
    <td align="center"><strong>Frontend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
      <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    </td>
  </tr>
  <tr>
    <td align="center"><strong>Backend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python">
      <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI">
    </td>
  </tr>
  <tr>
    <td align="center"><strong>Database</strong></td>
    <td>
      <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
    </td>
  </tr>
  <tr>
    <td align="center"><strong>AI & LLMs</strong></td>
    <td>
      <img src="https://img.shields.io/badge/LangChain-8A2BE2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMTAuNDMgMTUuNDNoMi4yMmwtLjg0IDQuMDRoLTIuMjNsLjg1LTQuMDRabS0xLjU4LTQuMDJsMS40MyAyLjY2bDEuNDItMi42NmgtMi44NVptNi4wMyA0LjAzbC44NS00LjA0aDIuMjNsLS44NSA0LjA0aC0yLjI4Wm0tNC40NS0uODFsMS4xMS01LjQzaC0xLjY3bC4zIDEuNDNoLTEuNjFsLS4yOS0xLjQzaC0xLjY4bDEuNDYgNy4xOWwxLjM4LTIuNzZabTYuNjUgMGwxLjM4IDIuNzZsMS40Ni03LjE5aC0xLjY4bC0uMyAxLjQzaC0xLjYybC4zLTEuNDNoLTEuNjhMMTYuMDggMTQuNjRabS0xMC41My0uNzVsLjg3IDQuMzRoLTIuMjNsLjg0LTQuMzRoLjUyWm0xMi42NyAwaC41MmwuODQtNC4zNGgtMi4yM2wuODcgNC4zNFoiLz48L3N2Zz4=" alt="LangChain">
      <img src="https://img.shields.io/badge/Groq-00B589?style=for-the-badge" alt="Groq">
    </td>
  </tr>
</table>

---

### 🚀 Getting Started

<details>
<summary>Click here for setup and installation instructions</summary>

#### Prerequisites
* Node.js & npm (or yarn)
* Python 3.8+ & pip
* MongoDB installed and running
* A Groq API Key

#### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/RasoiMate.git](https://github.com/your-username/RasoiMate.git)
    cd RasoiMate
    ```

2.  **Backend Setup:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`

    # Install dependencies
    pip install -r requirements.txt

    # Create a .env file and add your credentials
    # GROQ_API_KEY="your_groq_api_key"
    # MONGO_URI="your_mongodb_connection_string"

    # Start the backend server
    uvicorn main:app --reload
    ```
    The backend will be running on `http://localhost:8000`.

3.  **Frontend Setup:**
    ```bash
    # Navigate to the frontend directory
    cd ../frontend

    # Install dependencies
    npm install

    # Start the Vite development server
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or the next available port).

</details>

---

### 📄 License

This project is distributed under the **MIT License**. See `LICENSE` for more information.

<hr>