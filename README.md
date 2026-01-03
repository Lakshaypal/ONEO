# 🇮🇳 ONEO: One Nation, One Election Simulator

![Status](https://img.shields.io/badge/Status-Live_on_Vercel-success?style=for-the-badge&logo=vercel) ![Tech](https://img.shields.io/badge/Tech-React_|_Vite_|_Gemini_AI-blue?style=for-the-badge) ![Domain](https://img.shields.io/badge/Domain-Policy_Tech-orange?style=for-the-badge)

**ONEO (Election Synchronization Feasibility & Impact Simulator)** is a comprehensive decision-support platform designed to simulate, visualize, and quantify the constitutional, financial, and administrative impacts of implementing simultaneous elections in India.

---

## 🚀 Live Simulation
Explore the deployed platform here:
### 🔗 [https://oneo.vercel.app](https://oneo.vercel.app)

---

## 🌟 Key Simulation Modules

### 1. 📊 Overview Dashboard
A central command center providing a side-by-side view of key governance indicators under existing election cycles versus synchronized elections.
*   **Current vs ONOE Comparison:** Side-by-side view of key governance indicators.
*   **Election Expenditure:** Compares annual election-related spending with projected costs under ONOE.
*   **Administrative Man-Days:** Shows reduction in repeated deployment of officials and staff.
*   **MCC Paralysis Impact:** Quantifies days of Model Code of Conduct and associated policy standstill.
*   **Distribution Index:** Measures how evenly election-related burden is spread across years and regions.
*   **Comparison Matrix:** Displays differences in Annual Election Expenditure, Average MCC Days per Cycle, Security Personnel Mobilization, and EVM/VVPAT Requirements.
*   **Efficiency Gains:** Highlights savings and operational relief in personnel deployment and security mobilization.
*   **15-Year Fiscal Viability Graph:** Assesses whether ONOE is financially sustainable over time.
*   **Regional Synchronization Hub:** Visualizes state-wise readiness and alignment patterns.
*   **Legislative Feasibility:** Tracks Constitutional Amendment Score and Administrative Relief.

### 2. ⏳ Timeline Simulator
A dynamic visualizer allowing user selection of a State, base election year, and analysis period (5 / 10 / 15 years).
*   **Parallel Timelines:** Displays two clear timelines:
    *   **Current System:** Elections occurring at different points in time.
    *   **ONOE Scenario:** Elections aligned as per synchronization model.
*   **Total Voter Mobilizations:** Shows how often voters are required to participate across the selected period.
*   **Governance Pause Days:** Captures cumulative days affected by the Model Code of Conduct.
*   **Why It Matters:** Highlights election frequency vs. governance continuity and supports evidence-based decisions on administrative efficiency.

### 3. 💰 Financial Impact
A deep dive into the fiscal implications of democracy.
*   **User Controls:** Select analysis period and scope (specific State + Lok Sabha, or all including local bodies).
*   **Cost Comparison:**
    *   **Current Spending (Baseline):** Existing election expenditure.
    *   **New System Cost (ONOE):** Projected cost with synchronization.
    *   **Total Money Saved:** Estimated financial benefit from consolidation.
*   **Expenditure Benchmarking Graph:** Shows trends, peaks, and savings over time.
*   **Why It Matters:** Quantifies short-term transition costs vs. long-term savings to support budget planning.

### 4. 🛡️ Administrative Load
Focuses on the human resource strain on government machinery.
*   **Poll Events Conducted:** Number of elections held under current system vs ONOE.
*   **Cumulative MCC Days:** Total days impacted by the Model Code of Conduct.
*   **Administrative Man-Days:** Total staff deployment required for conducting elections.
*   **Educational Resilience:** Measures disruption to schools and educational institutions.
*   **Burden Distribution Graph:** Visualizes how election workload is spread across years.
*   **Why It Matters:** Demonstrates operational efficiency gains and visible impact on education continuity.

### 5. 🏛️ Governance & MCC Simulator
Analyzes the friction caused by frequent polls.
*   **Cumulative MCC Burden:** Total days under the Model Code of Conduct showing governance constraints.
*   **Total Poll Impositions:** Number of elections impacting normal administration.
*   **Average Annual Downtime:** Mean number of days per year when policy implementation is slowed.
*   **Stability Index:** Quantitative measure of administrative and policy continuity.
*   **Government Friction Audit Graph:** Visual representation of stress points and operational friction.
*   **Why It Matters:** Translates complex administrative disruption into clear, actionable metrics.

### 6. ⚖️ Legal & Constitutional
A roadmap for the necessary legal framework.
*   **Need for Amendments:** Highlights required changes to Articles 83, 85, 172, 174, 356.
*   **Primary Legal Blockers:** Addresses term mismatches, early dissolution scenarios, and governance conflicts.
*   **Proposed Solutions:** Visualizes Kovind Committee Recommendations (e.g., aligning terms, contingency provisions).
*   **Purpose:** Links policy design with operational feasibility.

### 7. 🤖 Scenario Builder (AI-Powered)
The "Brain" of the platform allowing "What-If" experimentation.
*   **Flexible Inputs:** Allows selection of Current System, Partial ONOE, or Full ONOE scenarios.
*   **Integrated Analysis:** Automatically generates **AI-driven policy briefs** using Google Gemini.
*   **Comparative Insights:** Provides instant analysis on Financial Impact, Administrative Load, Governance Indicators, and Legal Considerations.
*   **Output:** Decision-ready AI brief and visual dashboards.

---

## 🛠️ Tech Stack

*   **Frontend:** React 19 (Functional Components)
*   **Build Tool:** Vite (High-performance tooling)
*   **Styling:** Tailwind CSS (Glassmorphism & Responsive Design)
*   **Visualization:** Recharts (Data visualization)
*   **AI Engine:** Google Gemini 1.5 Pro (via Google GenAI SDK)
*   **Icons:** Lucide React

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