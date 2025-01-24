import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/config.js';
import { getProjects, createTask } from './services/hiveService.js';
import { identifyTaskDetails } from './services/geminiService.js';

const initializeDiscordClient = () => {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });
};

const handleTaskCreation = async (message) => {
  try {
    // Fetch available projects
    const projects = await getProjects();
    
    // Remove command prefix
    const taskText = message.content.replace('!task', '').trim();
    
    // Use Gemini to parse task details
    const taskDetails = await identifyTaskDetails(taskText);
    
    if (!taskDetails) {
      return message.reply('❌ Could not parse task details.');
    }

    // Match project or use default
    const matchedProject = projects.find(p => 
      p.name.toLowerCase().includes(taskDetails.project?.toLowerCase())
    );
    
    const projectId = matchedProject !== undefined 
      ? matchedProject.id 
      : projects[0].id;

    // Create task in Hive
    const createdTask = await createTask(taskDetails, projectId);
    const projectName = matchedProject !== undefined 
    ? matchedProject.name 
    : projects[0].name;
    
    if (createdTask) {
      message.reply(`✅ Task created: **${createdTask.title}** (Project: ${projectName})`);
    } else {
      message.reply('❌ Failed to create task.');
    }
  } catch (error) {
    console.error('Task creation workflow error:', error);
    message.reply('❌ An error occurred during task creation.');
  }
};

const startBot = () => {
  const client = initializeDiscordClient();

  client.on('ready', () => {
    console.log(`Bot connected as ${client.user.tag}!`);
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('!task')) {
      await handleTaskCreation(message);
    }
  });

  client.login(config.discord.token);
};

startBot();
