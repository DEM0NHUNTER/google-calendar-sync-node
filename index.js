require('dotenv').config();
const { google } = require('googleapis');

// In production, this would use the user's tokens from Supabase
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function syncEvents() {
  console.log("🔄 Starting Sync Job...");
  
  // 1. Set Credentials (simulated)
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // 2. Fetch Events from last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));

  try {
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: sevenDaysAgo.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }

    console.log(`✅ Found ${events.length} events. syncing to DB...`);
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`- [${start}] ${event.summary} (Duration: Calculated)`);
      // Push to Supabase Here
    });
    
  } catch (error) {
    console.error('❌ Google API Error:', error.message);
  }
}

syncEvents();