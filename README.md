# 🇮🇳 ONEO: One Nation, One Election Simulator

![Status](https://img.shields.io/badge/Status-Live_on_Vercel-success?style=for-the-badge&logo=vercel) ![Tech](https://img.shields.io/badge/Tech-React_|_Vite_|_Gemini_AI-blue?style=for-the-badge) ![Domain](https://img.shields.io/badge/Domain-Policy_Tech-orange?style=for-the-badge)

**ONEO (Election Synchronization Feasibility & Impact Simulator)** is a powerful, data-driven decision support platform. It is designed to simulate, visualize, and quantify the constitutional, financial, and administrative impacts of implementing simultaneous elections in India.

---

## 🚀 Live Simulation
Explore the deployed platform here:
### 🔗 [https://oneo.vercel.app](https://oneo.vercel.app)

---

## 🚨 The Real-World Challenge
India operates on a **staggered election cycle**. At any given moment, a state is preparing for polls. This results in:
*   💸 **Fiscal Drain:** Estimated **₹60,000 Cr+** spent every 5-year cycle.
*   🛑 **Policy Paralysis:** Frequent imposition of the **Model Code of Conduct (MCC)** halts development work.
*   👮 **Administrative Fatigue:** Teachers and security forces are constantly diverted from their primary duties.

**ONEO** solves this by providing a digital sandbox to visualize the transition to a synchronized framework.

---

## 🌟 Key Simulation Features

### 1. 📊 Dashboard (Executive Overview)
The central command center providing a "Commander's View" of the nation.
*   **KPI Tracking:** Real-time metrics on Expenditure Savings, Man-Days Saved, and Disruption Index.
*   **State Alignment Grid:** Visual status of every Indian state (e.g., UP, Maharashtra), showing which are ready for synchronization and which require term curtailment.
*   **Readiness Gauge:** A visual meter showing the legislative and logistical readiness of the nation.

### 2. 🤖 Scenario Builder (AI-Powered)
The "Brain" of the platform, powered by **Google Gemini AI**.
*   **What-If Analysis:** Allows users to select different models (Full Sync vs. Partial Sync) and time horizons (5, 10, 15 years).
*   **AI Policy Insights:** Generates a **plain-language impact report**. It translates complex data into simple explanations (e.g., *"Why does this save money?"*) for non-technical government officials.
*   **Wizard Interface:** A step-by-step guide to building custom election scenarios.

### 3. ⏳ Timeline View
A dynamic Gantt-style visualization tool.
*   **Visual Comparison:** Directly compares the current **Fragmented Cycle** (staggered bars) against the proposed **Synchronized Framework** (aligned bars).
*   **State Drilling:** Users can filter by specific states to see how their individual election years shift under ONOE (target year 2029).

### 4. 💸 Financial Impact
A deep dive into the economics of democracy.
*   **CAPEX vs. OPEX:** Distinguishes between the one-time cost of buying new EVMs (CAPEX) versus the massive recurring savings in logistics and security (OPEX).
*   **Savings Projection:** Calculates net savings over a 15-year horizon using ECI expenditure benchmarks.

### 5. 🛡️ Administrative Impact
Focuses on the human resource strain on the government machinery.
*   **Man-Days Calculator:** Quantifies the reduction in deployment days for polling staff and teachers.
*   **Security Logistics:** Visualizes the reduction in the cross-country movement of Central Armed Police Forces (CAPF).
*   **School Closure Tracker:** Estimates the number of educational days reclaimed by reducing poll disruptions.

### 6. 🏛️ Governance Impact (MCC Analyzer)
Analyzes the impact on development and policy continuity.
*   **MCC Paralysis Meter:** Calculates the total number of days the Model Code of Conduct is in force under the current vs. ONOE systems.
*   **Stability Index:** Measures the increase in uninterrupted governance periods available for welfare scheme implementation.

### 7. ⚖️ Constitutional View
The legal backbone of the simulator.
*   **Amendment Roadmap:** An interactive guide to the specific Articles (83, 172, 356) that need amendment.
*   **Legal Feasibility:** Breakdowns of the specific legal challenges and proposed solutions by the Law Commission/Kovind Committee.

---

## 🛠️ Tech Stack & Architecture

*   ⚛️ **Frontend:** React 19 (Functional Components)
*   ⚡ **Build Tool:** Vite (High-performance tooling)
*   🎨 **Styling:** Tailwind CSS (Glassmorphism & Responsive Design)
*   📈 **Charts:** Recharts (Data visualization)
*   🧠 **AI Engine:** Google Gemini 1.5 Pro (via Google GenAI SDK)
*   ✨ **Icons:** Lucide React

---

## 📊 Data & Methodology
The simulator is not random; it relies on verified public benchmarks:
*   **Expenditure Data:** Election Commission of India (ECI) Reports (2019, 2024).
*   **Constitutional Framework:** High-Level Committee Report on ONOE (March 2024).
*   **Historical Cycles:** IndiaVotes database for state election timelines.

---

## 💻 Getting Started Locally

If you wish to run the simulator on your local machine:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Lakshaypal/ONEO.git
    cd ONEO
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory to enable the AI features:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

Made with ❤️ for the **One Nation One Election Hackathon**.