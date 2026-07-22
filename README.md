# 🩸 GlycaCare AI

> **Precision Metabolic Health & Early Glycemic Risk Intervention Platform**

GlycaCare AI is an intelligent healthcare platform engineered to detect subclinical insulin resistance, evaluate Non-Alcoholic Fatty Liver Disease (NAFLD) risk markers, and generate personalized nutrition and yoga protocols before overt Type 2 Diabetes onset.

---

## 🌟 Key Features

* **📋 Multi-Step Metabolic Diagnostic Wizard:** 4-step biometric and laboratory assessment evaluating Fasting Glucose, Fasting Insulin, ALT, AST, Triglycerides, and HDL.
* **🔬 Advanced Algorithmic Biomarkers:** Real-time computation of **HOMA-IR** (Homeostatic Model Assessment of Insulin Resistance) and **TyG Index** (Triglyceride-Glucose Index).
* **📊 Interactive Health Dashboard:** Built with Recharts for dynamic visual tracking of glycemic trends, liver transaminase ratios, and macronutrient distributions.
* **🥗 Personalized 7-Day Precision Diet:** Low-glycemic load meal plans customized to user preferences and fasting windows to optimize insulin receptor sensitivity.
* **🧘 Targeted Yoga & Movement Regimens:** Specialized physical postures designed to increase peripheral tissue glucose disposal and assist in hepatic de-fatting.
* **📝 Fasting & Daily Glucose Logger:** Real-time log tracking with automatic health status classification (`Normal`, `Warning`, `High`).
* **🔐 Secure Authentication & Data Sync:** User authentication powered by Firebase Auth with persistent local browser state fallback.

---

## 🔬 Clinical & Biomarker Formulas

GlycaCare AI embeds clinically validated algorithms to calculate early metabolic risk:

1. **HOMA-IR Score:**
   $$\text{HOMA-IR} = \frac{\text{Fasting Glucose (mg/dL)} \times \text{Fasting Insulin } (\mu\text{IU/mL})}{405}$$
   * **Interpretation:** Score $> 1.9$ indicates early insulin resistance; $> 2.9$ indicates significant risk.

2. **TyG Index:**
   $$\text{TyG Index} = \ln\left(\frac{\text{Fasting Triglycerides (mg/dL)} \times \text{Fasting Glucose (mg/dL)}}{2}\right)$$
   * **Interpretation:** Surrogate biomarker for fatty liver risk and peripheral metabolic resistance.

---

## 🛠️ Tech Stack

* **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [React Router v7](https://reactrouter.com/)
* **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
* **Data Visualization:** [Recharts](https://recharts.org/), [Three.js](https://threejs.org/)
* **Authentication & Backend:** [Firebase SDK v12](https://firebase.google.com/), LocalStorage API
* **Linter & Build System:** [Oxlint](https://oxc.rs/), PostCSS, Vercel Build Engine

---

## 📂 Project Structure

```
GlycaCareAi/
├── public/                # Static assets & icons
├── src/
│   ├── assets/            # Project images & graphics
│   ├── components/
│   │   ├── assessment/    # Step wizard components (Biometrics, Labs, Lifestyle)
│   │   ├── auth/          # Protected routes & login components
│   │   ├── dashboard/     # Recharts visual charts & logger widgets
│   │   ├── layout/        # Sidebar, Header, & Layout wrappers
│   │   └── recommendations/# Diet & Yoga regimen views
│   ├── context/
│   │   ├── AuthContext.jsx       # Firebase Auth state manager
│   │   └── HealthDataContext.jsx # Biomarker calculation & log engine
│   ├── data/              # Mock baseline health dataset
│   ├── firebase/          # Firebase initialize config
│   ├── pages/             # App views (Landing, Dashboard, Assessment, etc.)
│   ├── App.jsx            # App router definition
│   ├── index.css          # Glassmorphic Tailwind design system
│   └── main.jsx           # Entrypoint
├── .env                   # Environment variables
├── index.html             # HTML entrypoint
├── package.json           # Node dependencies & scripts
├── tailwind.config.js     # Custom color tokens & glass effects
├── vercel.json            # Vercel SPA routing rewrite config
└── vite.config.js         # Vite bundler config
```

---

## 🚀 Setup & Installation Instructions

Follow these step-by-step instructions to set up and run **GlycaCare AI** locally on your machine.

### 1. Prerequisites

Ensure you have the following installed on your machine:
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher (comes with Node.js)
* **Git**

Verify your installation:
```bash
node -v
npm -v
```

---

### 2. Clone & Navigate to Project Directory

```bash
git clone https://github.com/your-username/GlycaCareAi.git
cd GlycaCareAi
```

---

### 3. Install Dependencies

Install all required frontend dependencies:
```bash
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root directory (or use the pre-configured `.env` file):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### 5. Start Development Server

Run the Vite local development server:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:5173
```

---

### 6. Build for Production

To test or generate a production build:

```bash
npm run build
```

The optimized static production output will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

### 7. Linting & Code Quality

Run Oxlint to check for lint errors:
```bash
npm run lint
```

---

## 🌐 Deployment (Vercel)

GlycaCare AI is pre-configured for one-click deployment on **Vercel** with SPA route rewrites:

1. Push code to your GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Add the `VITE_FIREBASE_*` environment variables under Project Settings.
4. Deploy!

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

*Developed for Hackathon Submission — GlycaCare AI*
