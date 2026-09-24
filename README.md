# Ridge — Lead Follow-up & Booking System

Ridge is a lead follow-up and appointment booking system built for local service businesses—starting with roofing, with templates ready for plumbing, HVAC, landscaping, and dental services.

Instead of letting leads go cold, Ridge automatically responds immediately, offers concrete appointment times, and follows up if there is no reply within 24 hours.

---

## 🚀 Key Features

* **Instant Text Follow-up:** Reaches out immediately after a homeowner submits an estimate request form.
* **Two Choices, One Question:** Asks simple scheduling questions (*"Thursday at 10 AM or Friday at 2 PM?"*) to get fast replies.
* **24-Hour Check-in:** Automatically checks in once if a lead goes quiet overnight.
* **4-Stage Lead Desk:** A simple, direct board (`New` → `Contacted` → `Waiting` → `Booked`) built for mobile and desktop viewports.
* **Plain English Setup:** Contractor-friendly language across customer funnels and dashboard interfaces.

---

## 🛠️ Tech Stack

* **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing:** [TanStack Router](https://tanstack.com/router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management:** Zustand (Client-side lead store & session simulation)
* **Mobile Runtime:** Optimized for Android local development via Termux

---

## 📂 Project Structure

```text
Ridge/
├── src/
│   ├── components/       # Nav, Footer, Message preview, UI components
│   ├── lib/              # Leads store, helpers, constants
│   ├── routes/
│   │   ├── index.tsx     # Main landing page & pricing
│   │   ├── dashboard.tsx # Contractor lead desk board
│   │   └── demo/         # Interactive demo funnel
│   │       ├── index.tsx # Demo splash
│   │       ├── request.tsx # Homeowner estimate form
│   │       └── thanks.tsx  # Live messaging simulation
│   └── main.tsx
├── public/               # Images and static assets
└── package.json


🚦 Getting Started (Local Development)
​Prerequisites
​Node.js (v18+)
​npm / pnpm / yarn
​Installation & Run

1. Clone the repository:

bash

git clone [https://github.com/bigjaypablo/Ridge-.git](https://github.com/bigjaypablo/Ridge-.git)
cd Ridge-


2. Install dependencies:

bash

npm install


3. Start the local server:

bash

npm run dev


4. Open your browser and navigate to

http://localhost:8080

📜 Credits & License
​Designed and developed by Big Jay. Built as an independent product for local business lead generation and automated client acquisition.
