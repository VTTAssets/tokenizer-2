/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 *                  you may want to put a (link to a) license or copyright
 *                  notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 *                  determines how others may use and modify your module
 */

// Import TypeScript modules
import { VALID_AVATAR_IMG_CSS_CLASSES } from './config.js';
import { registerSettings } from './module/settings.js';
import { preloadTemplates } from './module/preloadTemplates.js';

/* ------------------------------------ */
/* Initialize module                    */
/* ------------------------------------ */
Hooks.once('init', async () => {
  console.log('tokenizer-2 | Initializing tokenizer-2');

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

/* ------------------------------------ */
/* Setup module                            */
/* ------------------------------------ */
Hooks.once('setup', () => {
  // Do anything after initialization but before
  // ready
});

/* ------------------------------------ */
/* When ready                            */
/* ------------------------------------ */
Hooks.once('ready', () => {
  // Do anything once the module is ready
  const sheetNames = Object.keys(CONFIG.Actor.sheetClasses)
    .map((entity) =>
      Object.keys(CONFIG.Actor.sheetClasses[entity]).map((sheet) => CONFIG.Actor.sheetClasses[entity][sheet].cls.name)
    )
    .deepFlatten();

  sheetNames.forEach((sheetName) => {
    Hooks.on(`render${sheetName}`, (app, html, options) => {
      $(html)
        .find(VALID_AVATAR_IMG_CSS_CLASSES.map((cls) => `img.${cls}`).join(','))
        .on('click', (event) => {
          const img: HTMLImageElement = <HTMLImageElement>event.currentTarget;
          console.log('Clicked on image');
          console.log(`W/H: ${img.naturalWidth}/${img.naturalHeight}`);
          console.log(img);
        });
    });
  });
  console.log(sheetNames);
});

// Add any additional hooks if necessary
