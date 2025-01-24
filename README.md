# Hive Tasker Discord Bot

A Discord bot that creates tasks in Hive directly from Discord messages using AI to interpret and structure the task details.

## Features

- Create Hive tasks directly from Discord messages
- Uses Gemini AI to intelligently parse task details from natural language
- Automatically matches tasks to projects in your Hive workspace
- Simple command interface with `!hive-task` prefix

## Prerequisites

- Node.js (v18 or higher)
- Discord Bot Token
- Hive Account with API access
- Google Gemini API Key

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd tasker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DISCORD_TOKEN=your_discord_bot_token
HIVE_USER_ID=your_hive_user_id
HIVE_WORKSPACE_ID=your_hive_workspace_id
HIVE_API_KEY=your_hive_api_key
GEMINI_API_KEY=your_gemini_api_key
```

## Configuration Details

### Discord Bot Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the Bot section and create a bot
4. Copy the bot token to your `.env` file
5. Enable the Message Content Intent in the Bot section

### Hive Setup
1. Log into your Hive account
2. Get your User ID and Workspace ID from your Hive URL or settings
3. Generate an API key from your Hive settings
4. Add these values to your `.env` file

### Gemini AI Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to your `.env` file as GEMINI_API_KEY

## Running the Bot

Start the bot with:
```bash
node src/index.js
```

## Usage

In any Discord channel where the bot is present, use the command:
```
!hive-task [your task description]
```

Example:
```
!hive-task Create a new landing page with modern design and responsive layout
```

The bot will:
1. Parse your message using AI
2. Extract relevant task details
3. Create a task in your Hive workspace
4. Confirm the task creation with a message

## Project Structure

```
tasker/
├── src/
│   ├── config/
│   │   └── config.js         # Configuration and environment variables
│   ├── services/
│   │   ├── hiveService.js    # Hive API integration
│   │   └── geminiService.js  # Gemini AI integration
│   └── index.js              # Main bot application
├── .env                      # Environment variables
└── package.json             # Project dependencies and scripts
```

## Contributing

Feel free to submit issues and enhancement requests!