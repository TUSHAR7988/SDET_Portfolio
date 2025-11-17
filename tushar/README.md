# SDET Portfolio - Tushar Sharma

Professional portfolio website showcasing QA Engineering and Test Automation expertise.

## 🚀 Quick Start

### ⚡ One-Click Start (Easiest)

**Option 1: Standard Server**
- Double-click `START-HERE.bat`
- Server starts and browser opens automatically
- Basic server without auto-reload

**Option 2: With Auto-Reload (Recommended for Development)**
- Double-click `START-HERE-WITH-RELOAD.bat`
- Server starts with file watching
- Browser opens automatically
- Changes auto-reload without manual refresh

**Option 3: Stop Server**
- Double-click `stop-server.bat`
- Closes all server processes

---

## 📦 Installation

### First Time Setup (for Auto-Reload)

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
   This installs `http-server` for auto-reload functionality.

2. **OR Install Python dependencies (Alternative):**
   ```bash
   pip install -r requirements.txt
   ```

---

## 🛠️ Usage Methods

### Method 1: Batch Files (Windows - Easiest)

#### Standard Server
```bash
# Double-click or run:
START-HERE.bat
# or
start-server.bat
```

#### Server with Auto-Reload
```bash
# Double-click or run:
START-HERE-WITH-RELOAD.bat
```

#### Stop Server
```bash
stop-server.bat
```

### Method 2: npm Scripts (Cross-Platform)

**Standard Server:**
```bash
npm start          # Start server and open browser
npm run serve      # Start server only
npm run dev        # Start server with auto-reload (no cache)
npm run watch      # Start server with file watching (auto-reload)
```

**Python Server:**
```bash
npm run start:python    # Use Python HTTP server
```

**Stop Server:**
```bash
# Press Ctrl+C in the terminal
# or run stop-server.bat (Windows only)
```

### Method 3: Python Script with Auto-Reload

```bash
# Install dependencies first
pip install watchdog

# Run the server
python server-with-reload.py
```

### Method 4: Manual Commands

**Node.js (with auto-reload):**
```bash
npx http-server . -p 5500 -o -c-1
```

**Python (standard):**
```bash
python -m http.server 5500
```

---

## 📁 Project Structure

```
tushar/
├── index.html                      # Main HTML file
├── mypage.css                      # Stylesheet
├── script.js                       # JavaScript functionality
├── tushar.jpg                      # Profile image
│
├── START-HERE.bat                  # One-click standard server
├── START-HERE-WITH-RELOAD.bat      # One-click server with auto-reload
├── start-server.bat                # Standard batch file
├── stop-server.bat                 # Stop server script
│
├── server-with-reload.py           # Python server with auto-reload
├── requirements.txt                # Python dependencies
│
├── package.json                    # npm configuration
├── .gitignore                      # Git ignore file
└── README.md                       # This file
```

---

## ✨ Features

### Server Features
- ✅ **Auto-Reload**: Changes reflect instantly without manual refresh
- ✅ **One-Click Start**: Double-click to start server
- ✅ **Browser Auto-Open**: Browser opens automatically
- ✅ **Stop Script**: Easy server shutdown
- ✅ **Multiple Methods**: Choose what works best for you

### Portfolio Features
- ✅ **Responsive Design**: Works on all devices
- ✅ **Modern Animations**: Smooth transitions and effects
- ✅ **Interactive JavaScript**: Engaging user experience
- ✅ **Professional UI/UX**: Clean and modern design
- ✅ **Mobile Friendly**: Optimized for mobile viewing

---

## 🎯 Development Workflow

1. **Start Development Server:**
   ```bash
   # Option A: Double-click
   START-HERE-WITH-RELOAD.bat
   
   # Option B: npm
   npm run watch
   
   # Option C: Python
   python server-with-reload.py
   ```

2. **Make Changes:**
   - Edit HTML, CSS, or JS files
   - Save your changes
   - Browser auto-reloads (if using auto-reload mode)

3. **Stop Server:**
   ```bash
   # Option A: Double-click
   stop-server.bat
   
   # Option B: Press Ctrl+C in terminal
   ```

---

## 🔧 Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start server and open browser |
| `npm run serve` | Start server only |
| `npm run dev` | Start with auto-reload (no cache) |
| `npm run watch` | Start with file watching |
| `npm run server` | Same as dev (auto-reload) |
| `npm run start:python` | Use Python HTTP server |
| `npm run stop` | Instructions to stop server |

---

## 📝 Configuration

### Change Port Number

If port 5500 is busy, change it in:

1. **Batch files**: Edit the port number (5500) in `.bat` files
2. **package.json**: Update port in scripts (5500)
3. **Python script**: Change `PORT = 5500` in `server-with-reload.py`

### Default Settings

- **Port**: 5500
- **URL**: http://localhost:5500/index.html
- **Cache**: Disabled for development (auto-reload mode)

---

## 🔍 Troubleshooting

### Port Already in Use?

**Option 1: Use different port**
```bash
# Change 5500 to 8080 in batch files or:
npx http-server . -p 8080 -o
```

**Option 2: Stop existing server**
```bash
stop-server.bat
```

### Node.js Not Found?

1. Install Node.js from: https://nodejs.org/
2. Restart your terminal/PowerShell
3. Run `npm install` to install dependencies

### Python Not Found?

1. Install Python from: https://www.python.org/downloads/
2. Check "Add Python to PATH" during installation
3. For auto-reload, install watchdog: `pip install watchdog`

### Browser Doesn't Open?

Manually navigate to: `http://localhost:5500/index.html`

### Auto-Reload Not Working?

1. Make sure you're using `START-HERE-WITH-RELOAD.bat` or `npm run watch`
2. Check that files are saved properly
3. Try refreshing browser manually (F5)
4. Check browser console for errors

---

## 💡 Tips

1. **For Development**: Use auto-reload mode (`START-HERE-WITH-RELOAD.bat`)
2. **For Testing**: Use standard server (`START-HERE.bat`)
3. **Multiple Servers**: Run different ports for multiple projects
4. **Browser DevTools**: Press F12 to open developer tools

---

## 📧 Contact

- **Email**: tushar07988@gmail.com
- **LinkedIn**: linkedin.com/in/tushar-sharma-b31959225
- **GitHub**: github.com/TUSHAR7988

---

## 📄 License

MIT License - Feel free to use and modify for your own portfolio!

---

© 2024 Tushar Sharma. All rights reserved.
