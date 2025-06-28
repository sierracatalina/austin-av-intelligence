#!/usr/bin/env node

/**
 * Notion Sync Script
 * Syncs configuration and project data between Notion and the application
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function syncNotionData() {
  console.log('🔄 Starting Notion sync...');

  try {
    // Sync source files metadata
    const sourceFiles = await notion.databases.query({
      database_id: process.env.NOTION_SOURCE_DB,
    });

    // Sync automation scripts
    const scripts = await notion.databases.query({
      database_id: process.env.NOTION_SCRIPTS_DB,
    });

    // Sync assets
    const assets = await notion.databases.query({
      database_id: process.env.NOTION_ASSETS_DB,
    });

    // Create configuration file
    const syncedConfig = {
      lastSync: new Date().toISOString(),
      sourceFiles: sourceFiles.results.length,
      activeScripts: scripts.results.filter(s => 
        s.properties.Status?.select?.name === 'Active'
      ).length,
      totalAssets: assets.results.length,
      databases: {
        source: process.env.NOTION_SOURCE_DB,
        scripts: process.env.NOTION_SCRIPTS_DB,
        assets: process.env.NOTION_ASSETS_DB,
        data: process.env.NOTION_DATA_DB
      }
    };

    // Write to config file
    fs.writeFileSync(
      path.join(__dirname, '../data/notion-sync.json'),
      JSON.stringify(syncedConfig, null, 2)
    );

    console.log('✅ Notion sync completed successfully');
    console.log(`📊 Synced: ${sourceFiles.results.length} files, ${scripts.results.length} scripts, ${assets.results.length} assets`);

  } catch (error) {
    console.error('❌ Notion sync failed:', error.message);
    process.exit(1);
  }
}

// Run sync if called directly
if (require.main === module) {
  syncNotionData();
}

module.exports = { syncNotionData };
