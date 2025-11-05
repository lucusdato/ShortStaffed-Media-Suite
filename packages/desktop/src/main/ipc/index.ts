// Main IPC registration file
import './dialog';
import './config';
import './logger';
import './trafficSheet';
import './taxonomy';
import { setupUpdateHandlers } from './update';

// Setup update handlers
setupUpdateHandlers();

console.log('IPC handlers registered');
