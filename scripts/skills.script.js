// Import the required 'fs' module
const fs = require('fs');

const PLAYER_LEVELS_FILE_PATH = './src/configurations/player/level.experience.config.json';
const SKILLS_LEVEL_FILE_PATH = './src/configurations/skills/skill.levels.json';

// Data to write to the JSON file
const SKILLS = ['arrow', 'fireBolt', 'iceBolt']
const skillLevels = {
    metadata: {
        arrow: {
            "icon": "ARROW"
        },
        fireBolt:{
            "icon": "FIRE"
        },
        iceBolt:{
            "icon": "ICE"
        }
    },
    levels: {}
};

SKILLS.forEach(skillName => {
    skillLevels.levels[skillName] = {}

    for (let i = 0; i < 10; i++) {
        skillLevels.levels[skillName][i+1] = {
            tickInterval: Math.max(1700 - 100* (i + 1), 400),
            level: i+1,
            range: 1000
        }
    }
})
// ====================================================================================================


// File path for the JSON file
const playerLevels = new Array(100).fill(0).map((_, i) => {return i +1})

const levelExperienceConfig = {}

playerLevels.forEach((item, levelIndex) => {
    levelExperienceConfig[`${item}`] = 40 + item * 10;
})

const playerLevelsJSONData = JSON.stringify(levelExperienceConfig, null, 4);
const skillsLevelData = JSON.stringify(skillLevels, null, 4);
// ====================================================================================================

//========================================== write files ======================================
[
    {path: PLAYER_LEVELS_FILE_PATH, data: playerLevelsJSONData},
    {path: SKILLS_LEVEL_FILE_PATH, data: skillsLevelData}
].forEach((config) => {
    const {path, data} = config;
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log(`JSON data has been written to ${path}`);
        }
    });
})
