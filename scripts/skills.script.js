// Import the required 'fs' module
const fs = require('fs');
const skillConfig = require('../src/configurations/skills.config.json')

// Data to write to the JSON file
const data = ['arrow', 'fireBolt', 'iceBolt']
const levels = new Array(10).fill(0).map((_, i) => {return i +1})

const output = {};

data.forEach(skill => {
    const skillLevels = {};
    const {tickInterval, damage} = skillConfig[skill]

    levels.forEach((item, levelIndex) => {
        skillLevels[item] = {
            tickInterval: Math.max(tickInterval - 100* (levelIndex + 1), 400),
            damage: Math.min(damage * (levelIndex + 1), 60)
        }
    })
    output[skill] = skillLevels
})

// Convert the data to a JSON string
const jsonData = JSON.stringify(output, null, 4);

// File path for the JSON file
const filePath = './src/configurations/skill.levels.json';


const playerLevels = new Array(100).fill(0).map((_, i) => {return i +1})

const levelExperienceConfig = {}

playerLevels.forEach((item, levelIndex) => {
    levelExperienceConfig[`${item}`] = 40 + item * 10;
})

const playerLevelsJSONData = JSON.stringify(levelExperienceConfig, null, 4);

// File path for the JSON file
const playerLevelsFilePath = './src/configurations/level.experience.config.json';

// Write the JSON string to the file
fs.writeFile(playerLevelsFilePath, playerLevelsJSONData, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log(`JSON data has been written to ${filePath}`);
    }
});


// Write the JSON string to the file
fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log(`JSON data has been written to ${filePath}`);
    }
});
