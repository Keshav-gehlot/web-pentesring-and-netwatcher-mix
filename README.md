# PHANTOM v3.0 🕷️

PHANTOM v3.0 is a full-stack web application penetration-testing and monitoring framework. It provides automated security assessments, real-time network anomaly detection (Net-Watch), professional PDF reporting, scan history, authentication, and scheduling. It is built on a high-performance FastAPI backend and a sleek React/Vite frontend.

## 🌟 Key Features

- **Automated Security Testing**: 18+ focused modules covering Reconnaissance, Exploit & Vulnerability Detection, and Auditing.
- **Net-Watch Traffic Monitor**: Real-time packet capturing and anomaly detection (DDoS, port scans, traffic spikes) via WebSockets.
- **Professional Reporting**: Generate comprehensive, color-coded A4 PDF reports for penetration-test findings.
- **Scan Scheduling**: Automate scans with cron-style schedules or recurring intervals.
- **Scan History**: Review past scans, aggregate metrics, and manage historical data securely.
- **Cyberpunk Luxury UI**: A visually striking, operator-friendly React dashboard.

## 🛠️ Tech Stack

- **Backend**: Python 3.11+, FastAPI, Uvicorn, Celery, Redis, SQLAlchemy.
- **Frontend**: React 18, TypeScript/JavaScript, Vite, Tailwind CSS.
- **Security Tools**: Nmap, Scapy, aiohttp, dnspython.

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- Redis (Windows binary included in the backend)
- Nmap, libpcap / Npcap

### Installation & Execution

1. Clone the repository.
2. Run the provided startup script:
   ```powershell
   cd phantom
   .\start_phantom.ps1
   ```
   This will automatically install backend and frontend dependencies, start Redis, launch the FastAPI server, the traffic daemon, Celery workers, and the Vite frontend.
3. Access the PHANTOM dashboard at `http://localhost:5173`.
4. The backend API is available at `http://localhost:8000`.

### Stopping PHANTOM

To gracefully stop all services:
```powershell
cd phantom
.\stop_phantom.ps1
```

## ⚠️ Legal Disclaimer

**PHANTOM must only be used on systems, networks, and applications that you own or have explicit authorization to test.** Unauthorized scanning, attacking, or traffic monitoring is illegal and strictly prohibited.

The developers of PHANTOM assume no liability and are not responsible for any misuse or damage caused by this program.

Safe practice targets:
- DVWA (Damn Vulnerable Web App)
- WebGoat
- Hack The Box (HTB) / TryHackMe (THM) via VPN
