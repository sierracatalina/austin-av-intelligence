import { getNotionConfig, getAutomationScripts } from '../../lib/notion';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get configuration from Notion
    const config = await getNotionConfig();
    const scripts = await getAutomationScripts();

    // Transform Notion data into app configuration
    const appConfig = {
      platform: {
        version: process.env.AV_MODEL_VERSION || 'v1.0.0',
        mode: process.env.AV_PROCESSING_MODE || 'production',
        sensorEndpoint: process.env.AV_SENSOR_ENDPOINT
      },
      activeScripts: scripts.map(script => ({
        name: script.properties['Script Name']?.title[0]?.text?.content,
        type: script.properties['Script Type']?.select?.name,
        frequency: script.properties['Frequency']?.select?.name,
        language: script.properties['Language']?.select?.name
      })),
      lastUpdated: new Date().toISOString(),
      notionSync: config ? 'connected' : 'disconnected'
    };

    res.status(200).json(appConfig);
  } catch (error) {
    console.error('Config API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch configuration',
      notionSync: 'error'
    });
  }
}
