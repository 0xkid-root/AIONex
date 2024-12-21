/// <reference types="vite/client" />

import process from 'process';

// Define process in the browser environment
(window as any).process = {
  env: {
    NODE_ENV: 'development', // or 'production' based on your environment
    // Add other environment variables as needed
  },
};
