import dotenv from 'dotenv';

dotenv.config();

export const config = {
  discord: {
    token: process.env.DISCORD_TOKEN,
  },
  hive: {
    userId: process.env.HIVE_USER_ID,
    workspaceId: process.env.HIVE_WORKSPACE_ID,
    apiKey: process.env.HIVE_API_KEY,
    baseUrl: "https://app.hive.com/api/v1/",
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
};
