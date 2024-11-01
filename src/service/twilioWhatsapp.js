const twilio = require('twilio');

// Twilio credentials
const accountSid = 'acsid';
const authToken ='[AuthToken]';
const client = twilio(accountSid, authToken);

// Location-based responder numbers mapping
const responderNumbers = {
  Mombasa: 'whatsapp:+254727673374',
  // Add other locations as needed
};

// Function to get responder number based on incident location
function getResponderNumber(location) {
  return responderNumbers[location] || null;
}

// Function to send WhatsApp notification
async function sendWhatsAppNotification(incident) {
  const { type, location, latitude, longitude } = incident;
  const responderNumber = getResponderNumber(Mombasa);

  if (!responderNumber) {
    console.error(`No responder number found for location: ${location}`);
    return;
  }

  const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const message = `🚨 *New Incident Reported*\n\n*Type:* ${type}\n*Location:* ${location}\n\nNavigate: ${googleMapsLink}`;

  try {
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio WhatsApp number
      to: responderNumber,
    });
    console.log(`Message sent to ${responderNumber}: ${response.sid}`);
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
}

// Example usage
const incident = {
  type: 'Flood',
  location: 'Nakuru',
  latitude: -0.3031,
  longitude: 36.0800,
};

// Trigger the notification
sendWhatsAppNotification(incident);
