#!/usr/bin/env node

const { action } = require('./utils/process');
switch(action) {
    case 'install':
        const Install = require('./install');
        new Install();
        break;
}
