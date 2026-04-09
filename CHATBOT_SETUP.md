# Chatbot Popup Integration Guide

## Overview
A customizable chatbot popup component is now integrated into your website. It appears as a floating button at the bottom-right corner and opens to display a chat interface.

## Component Location
- **File**: `src/components/ChatbotPopup.tsx`
- **Usage**: Added to `src/App.tsx` - appears on all public pages

## Current Status
✅ Component ready for integration  
⏳ Waiting for chatbot service provider details

## Features

### UI Features
- 💬 Floating chat bubble (bottom-right by default)
- 🎨 Customizable colors (matches your primary color theme)
- 📱 Responsive design (works on mobile/tablet/desktop)
- ⌨️ Send message with Enter key
- 🔄 Auto-scroll to latest messages
- ⏱️ Timestamps on each message
- ⌛ Loading indicator while bot is responding

### Functional Features
- Open/close toggle
- Welcome message on first open
- Message history during session
- Error handling
- Disabled state while loading

## Customization Options

### Basic Configuration
```jsx
<ChatbotPopup
  title="Chat with us"                 // Header title
  botName="IIRA Assistant"             // Bot's display name
  placeholder="Type here..."           // Input placeholder
  color="#E8651A"                      // Primary color
  position="bottom-right"              // or "bottom-left"
  isOpen={false}                       // Control popup state
  onToggle={(open) => {}}             // Handle open/close
  onSendMessage={async (msg) => {}}   // Custom message handler
/>
```

### Color Customization
Currently set to match your theme color (`#E8651A` - orange). To change:

Edit `src/App.tsx`:
```jsx
<ChatbotPopup color="#FF5733" /> // Your custom color
```

### Position
- `"bottom-right"` (default) - Right side of screen
- `"bottom-left"` - Left side of screen

## Integration Methods

### Option 1: Basic Integration (Recommended for Starting)
Just provide a message handler function:

```jsx
const handleChatMessage = async (userMessage: string) => {
  // Send to your API
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage }),
  });
  const data = await response.json();
  return data.reply; // Return bot's response
};

<ChatbotPopup onSendMessage={handleChatMessage} />
```

### Option 2: Third-Party Chatbot Services
Popular options:

#### A. Rasa AI
```jsx
const handleRasaMessage = async (userMessage: string) => {
  const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });
  const data = await response.json();
  return data[0]?.text || 'Unable to respond';
};
```

#### B. OpenAI ChatGPT
```jsx
const handleOpenAIMessage = async (userMessage: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 150,
    }),
  });
  const data = await response.json();
  return data.choices[0]?.message?.content || 'Unable to respond';
};
```

#### C. Dialogflow (Google)
```jsx
const handleDialogflowMessage = async (userMessage: string) => {
  const response = await fetch('https://dialogflow.googleapis.com/v2/projects/.../agent/sessions/.../detectIntent', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      queryInput: {
        text: { text: userMessage, languageCode: 'en-US' },
      },
    }),
  });
  const data = await response.json();
  return data.queryResult?.fulfillmentText || 'No response';
};
```

#### D. Botpress
```jsx
const handleBotpressMessage = async (userMessage: string) => {
  const response = await fetch(`https://api.botpress.cloud/v1/chat`, {
    method: 'POST',
    headers: {
      'x-bot-id': process.env.REACT_APP_BOTPRESS_BOT_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payload: { text: userMessage } }),
  });
  const data = await response.json();
  return data.response?.suggestions?.[0]?.text || 'Unable to respond';
};
```

## Setup Steps

1. **Choose your chatbot provider** and share details:
   - Which service (Rasa, OpenAI, Dialogflow, etc.)?
   - API endpoint
   - Authentication method (API key, token, etc.)
   - Expected request/response format

2. **Add environment variables** to `.env.local`:
   ```env
   REACT_APP_CHATBOT_API_URL=https://your-api-endpoint
   REACT_APP_CHATBOT_API_KEY=your-api-key
   ```

3. **Create chat handler function** in a new file `src/lib/chatService.ts`:
   ```typescript
   export async function sendChatMessage(message: string): Promise<string> {
     // Implementation based on your provider
   }
   ```

4. **Update ChatbotPopup in App.tsx**:
   ```jsx
   import { sendChatMessage } from "@/lib/chatService";
   
   <ChatbotPopup onSendMessage={sendChatMessage} />
   ```

5. **Test locally**:
   ```bash
   npm run dev
   # Visit http://localhost:8080
   # Click the chat bubble and send a message
   ```

## Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Control if popup is open |
| `onToggle` | `(open: boolean) => void` | - | Callback when toggled |
| `onSendMessage` | `(msg: string) => Promise<string>` | - | Custom message handler |
| `title` | `string` | `"Chat with us"` | Header title |
| `botName` | `string` | `"IIRA Assistant"` | Bot's name |
| `placeholder` | `string` | `"Type your message..."` | Input placeholder |
| `color` | `string` | `"#E8651A"` | Primary button/header color |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Popup position |

## Admin Panel Integration

To manage chatbot settings from the admin panel, you can add a new accordion section in `src/pages/Admin.tsx`:

```jsx
{/* CHATBOT SETTINGS */}
<AccordionItem value="chatbot" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
  <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">
    Chatbot Settings
  </AccordionTrigger>
  <AccordionContent className="px-4 pb-4">
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="API URL" 
        defaultValue={data.chatbot?.apiUrl}
        onChange={(e) => save({ chatbot: { apiUrl: e.target.value } })}
      />
      <input 
        type="text" 
        placeholder="Bot Name" 
        defaultValue={data.chatbot?.botName}
        onChange={(e) => save({ chatbot: { botName: e.target.value } })}
      />
      {/* More settings */}
    </div>
  </AccordionContent>
</AccordionItem>
```

## Testing Locally

```bash
# Start dev server
npm run dev

# Visit http://localhost:8080
# Click the orange chat bubble at bottom-right
# Try sending a message (currently returns a default response)
```

## Deployment

Once configured, the chatbot will deploy with your website:
1. Add environment variables to Netlify/Vercel settings
2. Commit your `chatService.ts` handler
3. Redeploy

## Next Steps

1. **Tell me your chatbot provider** (Rasa, OpenAI, Dialogflow, Botpress, custom API, etc.)
2. **Share the details**:
   - API endpoint
   - Authentication method
   - Example request/response format
3. **I'll create the integration**

The chatbot popup is ready and visible on your site—just needs the backend connection!
