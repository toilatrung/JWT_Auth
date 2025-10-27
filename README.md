## ✨ Key Features

  * **Full JWT Authentication Flow:** Implements secure Signup (`/signup`), Login (`/login`), and Logout (`/logout`) functionality.
  * **Protected Routes:** Uses a `ProtectedRoute` component from `react-router-dom` to ensure that only authenticated users can access internal application pages (e.g., the home route `/`).
  * **Global State Management:** Utilizes **Zustand** for global state management, specifically for tracking the authentication state, including the user object (`user`), `accessToken`, and loading state (`loading`).
  * **Robust Form Validation:** Implements strong client-side form validation using **React Hook Form** and **Zod** schema validation to ensure data integrity and a good user experience.
  * **Notifications:** Integrates **Sonner** for clean and aesthetically pleasing toast notifications.
  * **Modern UI:** Built with **Tailwind CSS** (customized with a modern purple/pink color palette) and **ShadCN UI** components (based on Radix-UI) for a responsive and modern look and feel.

-----

## 🛠️ Technology Stack

The Frontend project is built using the following core technologies:

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | `^19.1.1` | User interface library. |
| **Language** | TypeScript | `^5.9.3` | Primary language, providing type safety. |
| **Build Tool** | Vite | `^7.1.7` | Fast and lightweight bundler. |
| **State Mgt** | Zustand | `^5.0.8` | Authentication state management. |
| **Routing** | React Router DOM | `^7.9.4` | Application routing. |
| **Styling** | Tailwind CSS | `^4.1.16` | Utility-first CSS framework for rapid styling. |
| **Forms** | React Hook Form, Zod | `^7.65.0`, `^4.1.12` | Form handling and schema validation. |
| **HTTP Client** | Axios | `^1.12.2` | HTTP client for API calls. |

-----

## 🚀 Getting Started

Follow these steps to set up and run the frontend project locally.

### 1\. Clone the Repository

```bash
# Assuming you are in the root directory of the project
git clone <YOUR-REPOSITORY-URL>
cd <YOUR-PROJECT-DIR>/frontend
```

### 2\. Install Dependencies

Navigate into the `frontend` directory and install the required packages:

```bash
npm install
# or yarn install
# or pnpm install
```

### 3\. Configure the Backend Server

The Axios configuration file (`frontend/src/lib/axios.ts`) is currently pointing to the backend server running on the default port `5001` for development:

```typescript
// frontend/src/lib/axios.ts
const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials: true,
});
```

  * Please ensure your **Backend server is running** on `http://localhost:5001`.

### 4\. Start the Development Server

Use the following command to run the application in development mode:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

-----

### 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Fast Refresh. |
| `npm run build` | Builds the application for production (creates the `dist` directory). |
| `npm run lint` | Runs the linter (ESLint) to check for coding errors. |
| `npm run preview` | Serves the production build locally for checking. |
