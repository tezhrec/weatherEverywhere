# Weather Everywhere!

Weather Everywhere! is a responsive web application that provides real-time and forecasted weather information for any location.  
The app displays current conditions, UV index, sunrise/sunset and moon times, and visual charts for temperature trends and air quality — all in an intuitive, modern interface.

---

## 🌟 Features

- **Search by Location:** Get weather data anywhere on the globe.
- **Current Weather Overview:** Temperature, humidity, wind, and condition icons.
- **5-Day Forecast Cards:** Quickly scan future weather trends.
- **UV Index Gauge:** Visual UV levels with risk categories.
- **Sunrise / Sunset & Moonrise / Moonset:** Daily celestial events for the selected location.
- **Temperature Trend Chart:** View temperature fluctuations over time.
- **Air Quality Chart:** Visualize air quality index data.
- **Responsive Design:** Works seamlessly on desktop and mobile.
- **Powered by APIs:** Fetches data from Open-Meteo and other external services.
- **Dark Mode-Friendly UI:** TailwindCSS-styled modern theme.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/)  
- **Styling:** [TailwindCSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)  
- **Data & API Integration:** [@supabase/supabase-js](https://supabase.com/), Open-Meteo API (weather, UV, air quality)  
- **Charts & Gauges:** [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)  
- **Icons:** [Lucide React](https://lucide.dev/)  
- **Tooling:** ESLint, TypeScript type checking, Vite build tools

---

## 📂 Project Structure

```
weatherEverywhere-main/
├── index.html                  # App entry point
├── src/
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # React root render
│   ├── index.css               # Global styles
│   ├── components/             # UI Components
│   │   ├── WeatherCard.tsx         # Displays current weather
│   │   ├── ForecastCard.tsx        # 5-day forecast
│   │   ├── UVGauge.tsx             # UV index gauge
│   │   ├── SunSkySection.tsx       # Sunrise, sunset, moon data
│   │   ├── TemperatureChart.tsx    # Temperature trends
│   │   └── AirQualityChart.tsx     # Air quality visualization
│   ├── services/weatherService.ts  # Handles API requests
│   ├── utils/weatherIcons.ts       # Weather icon mapping
│   └── types/weather.ts            # TypeScript interfaces
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) **v18+** (LTS recommended)
- [npm](https://www.npmjs.com/) **v9+**

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/weather-everywhere.git
cd weather-everywhere
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
Create a `.env` file in the project root if needed for API keys (e.g., Supabase credentials, weather API).  
Example:
```
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_KEY=<your_supabase_key>
```

*(The app uses free Open-Meteo data for most weather/UV info, so you may not need API keys for basic functionality.)*

### 5. Run Development Server
```bash
npm run dev
```
Visit **http://localhost:5173** in your browser.

### 6. Build for Production
```bash
npm run build
```

### 7. Preview Production Build Locally
```bash
npm run preview
```

---

## 📦 Deployment / Self-Hosting

You can self-host the built files on any static web server:

1. Run:
   ```bash
   npm run build
   ```
2. The production files will be in the `dist/` directory.
3. Upload the contents of `dist/` to your hosting service:
   - **Static Hosts:** Netlify, Vercel, GitHub Pages, Cloudflare Pages
   - **Custom Server:** Copy to `/var/www/html` (for Nginx/Apache)
   - **Docker Container:** Serve `dist/` via Nginx or Caddy

---

## 🔧 Available Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `npm run dev`      | Start local dev server                   |
| `npm run build`    | Build production bundle                  |
| `npm run preview`  | Preview production build locally         |
| `npm run lint`     | Lint project with ESLint                  |
| `npm run typecheck`| Run TypeScript type checking              |

---

## 📜 License
MIT License © 2025 — Weather Everywhere! Contributors
