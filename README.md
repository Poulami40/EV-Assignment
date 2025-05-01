# ⚡ EV Insights Dashboard

A dynamic, responsive dashboard built with **React** and **Recharts** to explore and analyze electric vehicle (EV) trends, including adoption, range, cost, and Clean Alternative Fuel Vehicle (CAFV) eligibility across various makes and regions.

---

## 📦 Features

- 📈 **EV Range vs Cost** — Visual comparison of MSRP and electric range, with bubble sizes indicating popularity.
- 📊 **CAFV Eligibility** — Stacked bar chart showing eligible vs. non-eligible vehicles by manufacturer.
- 🗺️ **County-Level Adoption** — Interactive trends across all 39 Washington state counties.
- 📅 **Range Over Time** — Track the evolution of average EV range by year.
- 🧠 **Auto-generated Insights** — Clear, concise insights and summaries under each chart.
- 📱 **Fully Responsive Design** — Works seamlessly on desktop, tablet, and mobile.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm or yarn package manager

### Installation


git clone https://github.com/your-username/EV-Assignment.git
cd EV-Assignment
npm install
npm start

The app will run locally at: http://localhost:3000

### 📁 Project Structure

my-ev-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CAFVBarByMake.jsx
│   │   ├── CAFVPieChart.jsx
│   │   ├── CountyAdoptionChart.jsx
│   │   ├── EVCostVsRange.jsx
│   │   ├── EVRangeOverTime.jsx
│   │   ├── EVSummary.jsx
│   │   └── Insights.jsx
│   ├── data/
│   │   └── ev_data.json
│   ├── App.jsx
│   ├── index.js
│   └── styles.js (optional - if using styled components or shared styles)
├── .gitignore
├── package.json
├── README.md
└── vite.config.js / webpack.config.js (depending on build tool)

---

## 🛠️ Built With

- **React** — Frontend framework
- **Recharts** — Charting library for intuitive data visualization
- **JavaScript (ES6+)**
- **CSS-in-JS / Inline Styling** — Responsive and maintainable UI styling

---

## 📈 Future Improvements

- 📅 Add year-based filters and interactive controls
- 🌐 Integrate live data APIs for real-time trends
- 📤 Export chart views as PNG/PDF
- 📱 Improve accessibility and mobile responsiveness further

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Washington State Department of Licensing — For open EV registration data
- Inspiration drawn from efforts toward sustainable transportation and public data accessibility


Working website URL - https://ev-assignment-rouge.vercel.app/
