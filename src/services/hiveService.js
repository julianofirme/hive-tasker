import axios from 'axios';
import { config } from '../config/config.js';

const { hive } = config;

export const getProjects = async () => {
  const endpoint = `workspaces/${hive.workspaceId}/projects`;
  const qs = `?user_id=${hive.userId}&api_key=${hive.apiKey}`;
  const url = hive.baseUrl + endpoint + qs;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Hive projects:', error);
    return [];
  }
};

export const createTask = async (taskDetails, projectId) => {
  const endpoint = "actions/create";
  const qs = `?user_id=${hive.userId}&api_key=${hive.apiKey}`;
  const url = hive.baseUrl + endpoint + qs;

  const data = {
    workspace: hive.workspaceId,
    title: taskDetails.title,
    description: taskDetails.description,
    projectId: projectId,
    assigned_to: hive.userId,
    when: "today"
  };

  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Hive task creation error:', error);
    return null;
  }
};
