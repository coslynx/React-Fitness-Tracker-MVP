<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
React-Fitness-Tracker-MVP
</h1>
<h4 align="center">A web application for setting fitness goals, tracking progress, and sharing achievements with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend: Javascript, Html, Css">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="LLMs: Custom, Gemini, OpenAI">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/React-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/React-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/React-Fitness-Tracker-MVP?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the Minimum Viable Product (MVP) for a fitness tracker web application built with Next.js, React, Node.js, and a custom LLM powered by Gemini and OpenAI. The MVP allows users to set fitness goals, track their progress, and share their achievements with friends. The application utilizes a robust backend built with Node.js and Express, a MongoDB database for storing user data, and a user-friendly frontend powered by React and Tailwind CSS. This MVP offers a streamlined solution for fitness enthusiasts to stay motivated and track their progress effectively.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the MVP, its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as React, Next.js, Tailwind CSS, Chart.js, Zustand, MongoDB, and NextAuth.js, which are essential for building and styling the UI components, handling external services, and managing user authentication. |
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as components, pages, and API routes.|
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Interacts with browser APIs, external services through HTTP requests, and includes integrations with Google Sign-In API, MongoDB Atlas, and Chart.js for data visualization.|
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
fitness-tracker-mvp/
├── package.json
├── next.config.js
├── .env.local
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api
│   │   ├── goals
│   │   │   └── route.ts
│   │   └── auth
│   │       └── [...nextauth].ts
│   └── globals.css
├── pages
│   ├── index.tsx
│   ├── goals
│   │   └── page.tsx
│   ├── progress
│   │   └── page.tsx
│   └── social
│       └── page.tsx
├── lib
│   ├── api
│   │   └── client.ts
│   └── utils
│       └── formatters.ts
└── styles
    └── globals.css

```

## 💻 Installation
### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- MongoDB Atlas Account (for database)
- Google Cloud Platform Account (for Google Sign-In)

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/React-Fitness-Tracker-MVP.git
   cd React-Fitness-Tracker-MVP
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and fill in the following environment variables:
   - `NEXTAUTH_URL`: Your application URL (e.g., http://localhost:3000)
   - `NEXTAUTH_SECRET`: A secret key for NextAuth.js (generate a random string)
   - `GOOGLE_CLIENT_ID`: Your Google Client ID (from Google Cloud Platform)
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret (from Google Cloud Platform)
   - `MONGODB_URI`: Your MongoDB Atlas connection string (from your MongoDB Atlas cluster)

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application in your web browser at `http://localhost:3000`. 

## 🏗️ Usage
Once the application is running, you can explore the following key features:
- **User Authentication:** Sign up or log in using Google Sign-In.
- **Goal Setting:** Create new fitness goals with a specific type (weight loss, muscle gain, etc.), target value, and deadline.
- **Progress Tracking:** Manually log your activities and view a visual representation of your progress towards your goals using the interactive charts. 
- **Social Feed:** Share your fitness journey with friends by creating posts and interacting with other users' posts.

## 🌐 Hosting
### 🚀 Deployment Instructions
To deploy the React-Fitness-Tracker-MVP to a production environment, we will use Vercel as our hosting platform. Vercel provides a seamless integration with Next.js and offers a straightforward deployment process. 

**1. Set Up Vercel:**
- Create a free Vercel account (if you don't have one already). 
- Install the Vercel CLI: `npm install -g vercel` 
- Login to Vercel: `vercel login` 

**2. Initialize Vercel Project:**
- Navigate to the root directory of your React-Fitness-Tracker-MVP project.
- Run the following command to initialize the Vercel project: `vercel init`
- Choose a project name and the appropriate settings (you might have to use a `vercel.json` configuration file as well).

**3. Set Environment Variables:**
- Login to your Vercel dashboard.
- Go to your project's settings.
- Add the following environment variables (replacing placeholders with your actual values):
  - `NEXTAUTH_URL`: Your application's production URL (e.g., https://your-fitness-tracker.vercel.app)
  - `NEXTAUTH_SECRET`: Your NextAuth.js secret key.
  - `GOOGLE_CLIENT_ID`: Your Google Client ID.
  - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
  - `MONGODB_URI`: Your MongoDB Atlas connection string.

**4. Deploy:**
- Run the following command from your project directory: `vercel deploy` 

**5. Access the App:**
- Vercel will automatically deploy your application. The deployment URL will be provided in your Vercel dashboard. Open the URL in your browser to access your hosted fitness tracker application.

### 🔑 Environment Variables
- `NEXTAUTH_URL`: The production URL of your application (e.g., `https://your-fitness-tracker.vercel.app`).
- `NEXTAUTH_SECRET`: A secret key used for authentication in NextAuth.js (generate a random string).
- `GOOGLE_CLIENT_ID`: Your Google Client ID obtained from Google Cloud Platform.
- `GOOGLE_CLIENT_SECRET`: Your Google Client Secret obtained from Google Cloud Platform.
- `MONGODB_URI`: Your MongoDB Atlas connection string obtained from your cluster settings.

## 📜 API Documentation
### 🔍 Endpoints
Here are the API endpoints used by the React-Fitness-Tracker-MVP application:

- **POST `/api/auth/register`**
  - Description: Register a new user.
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST `/api/auth/login`**
  - Description: Login a registered user.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **GET `/api/goals`**
  - Description: Get the user's fitness goals.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "type": string, "target": number, "deadline": date, "progress": number }, ...]`

- **POST `/api/goals`**
  - Description: Create a new fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **PUT `/api/goals/:goalId`**
  - Description: Update an existing fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "message": "Goal updated successfully" }`

- **DELETE `/api/goals/:goalId`**
  - Description: Delete a fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `{ "message": "Goal deleted successfully" }`

- **POST `/api/goals/activities`**
  - Description: Log a new activity.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "date": date, "duration": number, "calories": number }`
  - Response: `{ "message": "Activity logged successfully" }`

- **GET `/api/goals/activities`**
  - Description: Retrieve activity data for the user.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "type": string, "date": date, "duration": number, "calories": number }, ...]`

### 🔒 Authentication
The application uses NextAuth.js for user authentication. Users can register or log in using Google Sign-In. Upon successful authentication, a JSON Web Token (JWT) is issued and stored in a cookie in the user's browser. All subsequent API requests must include this JWT in the Authorization header using the `Bearer` scheme.

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2023-12-31",
  "progress": 0
}

```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: React-Fitness-Tracker-MVP

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>