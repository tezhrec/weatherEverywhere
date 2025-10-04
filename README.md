# Weather Everywhere!

Weather Everywhere! is a responsive web application that provides real-time and forecasted weather information for any location worldwide. The app displays current conditions, UV index, sunrise/sunset times with calculated moonrise/moonset data, and interactive charts for temperature trends and air quality — all in an intuitive, modern interface with dark mode support.

---

## 🌟 Features

- **Global Location Search:** Get weather data for any location worldwide using city name search
- **Geolocation Support:** Use your current location to get instant weather information
- **Current Weather Overview:** Real-time temperature, humidity, wind speed, and dynamic weather condition icons
- **5-Day Forecast:** Visual forecast cards showing high/low temperatures and weather conditions
- **UV Index Gauge:** Interactive semi-circular gauge displaying current UV levels with color-coded risk categories
- **5-Day UV Forecast:** Daily UV index predictions with visual bar charts and risk categories
- **Sunrise / Sunset Times:** Accurate sun timing data from Open-Meteo API
- **Moonrise / Moonset Calculations:** Astronomical calculations using SunCalc library for precise moon timing
- **Temperature Trend Chart:** Interactive Chart.js visualization showing 6-day temperature trends
- **Air Quality Monitoring:** US AQI visualization with daily averages and color-coded risk levels
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Support:** Seamless light/dark theme with automatic icon and color adjustments
- **Location Persistence:** Automatically saves and loads your last searched location

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) for responsive design & [PostCSS](https://postcss.org/)
- **APIs:**
  - [Open-Meteo Weather API](https://open-meteo.com/) - Weather data, UV index, sunrise/sunset
  - [Open-Meteo Air Quality API](https://open-meteo.com/) - US AQI data
  - [Open-Meteo Geocoding API](https://open-meteo.com/) - Location search
- **Astronomical Calculations:** [SunCalc](https://github.com/mourner/suncalc) - Moonrise/moonset calculations
- **Charts & Visualizations:** [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database (Optional):** [@supabase/supabase-js](https://supabase.com/) - Available for data persistence
- **Tooling:** ESLint, TypeScript compiler, Vite hot module replacement

---

## 📂 Project Structure

```
project/
├── index.html                  # HTML entry point
├── src/
│   ├── App.tsx                 # Main application component with search and layout
│   ├── main.tsx                # React root initialization
│   ├── index.css               # Global styles and Tailwind imports
│   ├── components/             # Reusable UI Components
│   │   ├── WeatherCard.tsx         # Current weather display with dynamic icons
│   │   ├── ForecastCard.tsx        # Individual forecast day card
│   │   ├── UVGauge.tsx             # Semi-circular UV index gauge with SVG
│   │   ├── SunSkySection.tsx       # Sun/moon times and UV forecast section
│   │   ├── TemperatureChart.tsx    # 6-day temperature line chart
│   │   └── AirQualityChart.tsx     # Air quality bar chart with AQI categories
│   ├── services/
│   │   └── weatherService.ts       # API integration and data processing
│   ├── utils/
│   │   └── weatherIcons.ts         # Weather code to Lucide icon mapping
│   └── types/
│       └── weather.ts              # TypeScript interfaces and types
├── dist/                       # Production build output (generated)
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # TailwindCSS configuration
├── vite.config.ts              # Vite bundler configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
└── README.md                   # Project documentation
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

### 4. Set Up Environment Variables (Optional)
The app uses **free, open-source APIs** that require **no API keys** for basic functionality:
- Open-Meteo Weather API (no authentication required)
- Open-Meteo Air Quality API (no authentication required)
- Open-Meteo Geocoding API (no authentication required)
- SunCalc library (client-side calculations)

**Optional:** If you want to integrate Supabase for data persistence, create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app works fully without environment variables and uses localStorage for saving user preferences.

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

### Option 1: Static Hosting Platforms
1. Build the project:
   ```bash
   npm run build
   ```
2. The production files will be in the `dist/` directory.
3. Upload the contents of `dist/` to your hosting service:
   - **Netlify, Vercel, GitHub Pages, Cloudflare Pages:** Connect your repository or upload `dist/`
   - **Custom Server (Nginx/Apache):** Copy `dist/` contents to `/var/www/html` or your web root

### Option 2: Docker

#### Using Nginx
Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t weather-everywhere .
docker run -d -p 8080:80 weather-everywhere
```

Visit **http://localhost:8080**

#### Using Docker Compose
Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  weather-app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

#### Custom Nginx Configuration (Optional)
Create `nginx.conf` for SPA routing:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

Update Dockerfile to use custom config:
```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

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

## 🌐 API Information

### Open-Meteo APIs (Free, No Authentication Required)
- **Weather Forecast API:** Current conditions, temperature, humidity, wind, weather codes
- **Air Quality API:** US AQI hourly data for air quality monitoring
- **Geocoding API:** Location search and coordinate lookup

### SunCalc Library
- **Client-side calculations** for moonrise and moonset times
- Accurate astronomical algorithms based on latitude, longitude, and date
- No external API calls required

---

## 🔄 Data Flow

1. User searches for a location by city name or uses geolocation to get current coordinates
2. Geocoding API returns coordinates and location details (or reverse geocoding for geolocation)
3. Weather, UV, and air quality data fetched in parallel from Open-Meteo
4. SunCalc calculates moonrise/moonset times based on coordinates
5. Data processed and displayed in organized, visual components
6. Last searched location saved to localStorage for persistence

---

## 📜 License

MIT License © 2025 — Weather Everywhere! Contributors
