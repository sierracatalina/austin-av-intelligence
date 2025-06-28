import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Fetch configuration from Notion
export async function getNotionConfig() {
  try {
    const response = await notion.pages.retrieve({
      page_id: process.env.NOTION_CONFIG_PAGE_ID,
    });
    return response;
  } catch (error) {
    console.error('Error fetching Notion config:', error);
    return null;
  }
}

// Get project files from Notion database
export async function getSourceFiles() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SOURCE_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Complete'
        }
      }
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching source files:', error);
    return [];
  }
}

// Get automation scripts configuration
export async function getAutomationScripts() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_SCRIPTS_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Active'
        }
      }
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return [];
  }
}

// Update build status in Notion
export async function updateBuildStatus(status, deploymentUrl = null) {
  try {
    await notion.pages.update({
      page_id: process.env.NOTION_CONFIG_PAGE_ID,
      properties: {
        'Build Status': {
          select: {
            name: status // 'Building', 'Success', 'Failed'
          }
        },
        'Last Deployment': {
          url: deploymentUrl
        }
      }
    });
  } catch (error) {
    console.error('Error updating build status:', error);
  }
}

export default notion;
