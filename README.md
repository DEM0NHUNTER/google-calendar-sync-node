\# Google Calendar Sync Service (Node.js)



!\[Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge\&logo=nodedotjs)

!\[Google Cloud](https://img.shields.io/badge/Google\_Cloud-API-blue?style=for-the-badge\&logo=googlecloud)

!\[OAuth 2.0](https://img.shields.io/badge/Auth-OAuth\_2.0-orange?style=for-the-badge)



A specialized backend service for authenticating with Google OAuth 2.0, managing refresh tokens, and incrementally syncing calendar events to a local database structure.



Designed as a microservice module for SaaS time-tracking applications.



---



\## ⚡ Core Features



\* \*\*OAuth 2.0 Authentication:\*\* Secure handshake using `googleapis` library.

\* \*\*Token Management:\*\* Logic to handle access token expiry and seamless rotation using `refresh\_token`.

\* \*\*Incremental Syncing:\*\* Fetches only changed/new events using `updatedMin` (or time windows) to respect API rate limits.

\* \*\*Data Extraction:\*\* Parses raw Google API responses into normalized JSON objects (Duration, Attendees, Summary).



---



\## 🛠️ Technical Implementation



\### Dependencies

\* `googleapis`: The official Node.js client for Google APIs.

\* `dotenv`: For secure environment variable management (Client Secrets).



\### The Logic Flow (`index.js`)

1\.  \*\*Initialize Client:\*\* Sets up `google.auth.OAuth2` with credentials.

2\.  \*\*Authenticate:\*\* Simulates a user session by injecting a stored `REFRESH\_TOKEN`.

3\.  \*\*Query API:\*\* Calls `calendar.events.list` with specific parameters:

&nbsp;   \* `singleEvents: true`: Expands recurring events into individual instances.

&nbsp;   \* `orderBy: 'startTime'`: Ensures chronological processing.

4\.  \*\*Parse \& Sync:\*\* Iterates through results and logs them (Mock DB write).



---



\## 🚀 Getting Started



\### 1. Prerequisites

\* Node.js v18+

\* A Google Cloud Project with the \*\*Google Calendar API\*\* enabled.

\* `credentials.json` (Client ID \& Secret) from Google Console.



\### 2. Installation

```bash

git clone \[https://github.com/DEM0NHUNTER/google-calendar-sync-node.git](https://github.com/DEM0NHUNTER/google-calendar-sync-node.git)

cd google-calendar-sync-node

npm install

