// ai-assistant.js

const { Configuration, OpenAIApi } = require('openai');
const twilio = require('twilio');

// OpenAI integration setup
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to handle FAQs
async function handleFAQ(question) {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
    });
    return response.data.choices[0].message.content;
}

// Function to handle student inquiries
async function handleStudentInquiry(inquiry) {
    // Process the inquiry and return a response from OpenAI
    return await handleFAQ(inquiry);
}

// Twilio integration for WhatsApp
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send WhatsApp messages
async function sendWhatsAppMessage(to, message) {
    await twilioClient.messages.create({
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        to: `whatsapp:${to}`,
        body: message,
    });
}

module.exports = { handleFAQ, handleStudentInquiry, sendWhatsAppMessage };