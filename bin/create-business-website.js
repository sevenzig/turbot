#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Parse command line arguments to detect template type
const args = process.argv.slice(2);
const templateType = process.env.npm_config_template || args[0];

// Template mapping
const templateConfigs = {
  'basic': 'presets/basic.config.json',
  'healthcare': 'presets/healthcare.config.json',
  'retail': 'presets/retail.config.json',
  'realestate': 'presets/realestate.config.json',
  'fitness': 'presets/fitness.config.json',
  'law': 'presets/law.config.json',
  'beauty': 'presets/beauty.config.json',
  'autorepair': 'presets/autorepair.config.json',
  'creative': 'presets/creative.config.json',
  'homeservices': 'presets/homeservices.config.json',
  'brewery': 'presets/brewery.config.json', 
  'restaurant': 'presets/restaurant.config.json',
  'consulting': 'presets/consulting.config.json'
};

// Build the command
let initCommand = 'npx';
let initArgs = ['tsx', 'init-template.ts'];

if (templateType && templateConfigs[templateType]) {
  initArgs.push('--config', templateConfigs[templateType]);
  console.log(`🎯 Initializing ${templateType} business website template...`);
} else {
  console.log('🚀 Starting business website template initializer...');
}

// Execute the init script
const child = spawn(initCommand, initArgs, {
  stdio: 'inherit',
  cwd: process.cwd()
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (error) => {
  console.error('Failed to start template initializer:', error);
  process.exit(1);
}); 