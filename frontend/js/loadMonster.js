// Easier way to create an element when loading a monster
function createEleWithText (type, text) {
    const newEle = document.createElement(type);
    newEle.textContent = text;
    return newEle;
}

//creates the creature heading
function createCreatureHeading(monster) {
    const creatureHeading = document.createElement("creature-heading");
    const name = createEleWithText("h1", monster.name);
    if (monster.alignment == null || monster.alignment == "") {
        monster.alignment = "unaligned";
    }
    const sizeType = createEleWithText("h2", `${monster.size} ${monster.type}, ${monster.alignment}`);
    creatureHeading.appendChild(name);
    creatureHeading.appendChild(sizeType);

    return creatureHeading
}

//creates a PropLine used for saving throws & skills
function throwsJSONPropLine(monster, name, keys, printKeys) {
    let throws = "";
    let throwsPropLine = null;
    for (let key = 0; key < keys.length; key++) {
        let k = keys[key];

        //create the property line if it hasn't been initialized
        if (monster[k] != null) {
            if (!throwsPropLine) {
                throwsPropLine = document.createElement("property-line");
                const header = createEleWithText("h4", name);
                throwsPropLine.appendChild(header);
                throws += " ";
            }
            else {
                throws += ", ";
            }

            //add this new skill/save/etc to the throws text
            throws += printKeys[key][0].toUpperCase() + printKeys[key].slice(1) + " ";
            if (monster[k] >= 0) {
                throws += "+";
            }
            throws += `${monster[k]}`;
        }
    }
    if (throwsPropLine != null) {
        const throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;
}

//Used for implementing property blocks w/ the input of a monster category (ex: monster.actions)
//and statBlock (for appendChild), is the same function for both .monster and .json files
function makePropBlock(category, statBlock){
    //names are based off monster.actions (hence "actions"), works w/ other categories.
    let actions = [];
    for (let i in category){
            const actionProp = document.createElement("property-block");
            const prop = category[i];
            const name = createEleWithText("h4", `${prop.name}. `);
            actionProp.appendChild(name);

            const descText = prop.desc.replace(/_/g, "");
            const desc = createEleWithText("p", `${descText} `);
            actionProp.appendChild(desc);

            actions.push(actionProp);
        }
        for (let i in actions){
            statBlock.appendChild(actions[i]);
        }
    return;
}

// Creates a div containing moster information and adds it to the monster display div
//USING A .JSON FILE
//Hey, Vicky here
//Why are there two loadJSONMonster functions?
//I have commented this one out
/*
export function loadJSONMonster(monster) {
    //create statblock variable
    const statBlock = document.createElement("stat-block");

    //creature-heading
    const creatureHeading = createCreatureHeading(monster);

    //top-stats
    const topStats = document.createElement("top-stats");

    //ac
    const propLine = document.createElement("property-line");
    const acHeader = createEleWithText("h4", "Armor Class");
    let acDesc = ` ${monster.armor_class}`;
}
    */

function j_createAC(appendTo, monster) {
    let acDesc = ` ${monster.armor_class}`;
    if (monster.armor_desc != null && monster.armor_desc != "") {
        acDesc += ` (${monster.armor_desc})`;
    }
    const ac = createEleWithText("p", acDesc);
    appendTo.appendChild(ac);
}

function j_createHP(appendTo, monster) {
    const hp = createEleWithText("p", ` ${monster.hit_points} (${monster.hit_dice})`);
    appendTo.appendChild(hp);
}

function j_createSpeed(appendTo, monster) {
    let speedDesc = ` ${monster.speed["walk"]} ft.`;
    for (const s in monster.speed) {
        if (s != "walk") {
            speedDesc += `, ${s} ${monster.speed[s]} ft.`
        }
    }
    const speed = createEleWithText("p", speedDesc);
    appendTo.appendChild(speed);
}

function j_createBasicPropLine(headerText, appendTo, monster) {
    const propLine = document.createElement("property-line");
    const header = createEleWithText("h4", headerText);
    propLine.appendChild(header);

    if (headerText == "Armor Class") {
        j_createAC(propLine, monster);
    }

    if (headerText == "Hit Points") {
        j_createHP(propLine, monster);
    }

    if (headerText == "Speed") {
        j_createSpeed(propLine, monster);
    }

    appendTo.appendChild(propLine);
}

function j_createAbilitiesBlock(appendTo, monster) {
    const abilitiesBlock = document.createElement("abilities-block");
    abilitiesBlock.setAttribute("data-cha", `${monster.charisma}`);
    abilitiesBlock.setAttribute("data-con", `${monster.constitution}`);
    abilitiesBlock.setAttribute("data-dex", `${monster.dexterity}`);
    abilitiesBlock.setAttribute("data-int", `${monster.intelligence}`);
    abilitiesBlock.setAttribute("data-str", `${monster.strength}`);
    abilitiesBlock.setAttribute("data-wis", `${monster.wisdom}`);
    appendTo.appendChild(abilitiesBlock);
}

// Creates a div containing moster information and adds it to the monster display div
//USING A .JSON FILE
//currently leaving this version of loadJSONMonster as the one uncommented
//may the web dev gods have mercy
function loadJSONMonster(monster, elementName="") {
    const statBlock = document.createElement("stat-block"); //create statblock variable
    const creatureHeading = createCreatureHeading(monster); //creature-heading
    const topStats = document.createElement("top-stats"); //top-stats

    //ac
    j_createBasicPropLine("Armor Class", topStats, monster);

    //hp
    j_createBasicPropLine("Hit Points", topStats, monster);

    //speed
    j_createBasicPropLine("Speed", topStats, monster);

    //abilities-block
    j_createAbilitiesBlock(topStats, monster);

    //saving throws
    const saveVars = ["strength_save", "dexterity_save", "constitution_save", "intelligence_save", "wisdom_save", "charisma_save"];
    const saveKeys = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
    const propLine4 = throwsJSONPropLine(monster, "Saving Throws", saveVars, saveKeys);
    if (propLine4 != null) {
        topStats.appendChild(propLine4);
    }

    //skills
    const skillDict = monster.skills;
    const skillNames = Object.keys(skillDict);
    const propLine5 = throwsJSONPropLine(skillDict, "Skills", skillNames, skillNames);
    if (propLine5 != null) {
        topStats.appendChild(propLine5);
    }

    //damage types, condition immunities, senses
    const damageTypes = ["damage_vulnerabilities", "damage_resistances", "damage_immunities", "condition_immunities", "senses"];
    for (let type = 0; type < damageTypes.length; type++) {
        let d = damageTypes[type];

        let damageNameArr = d.split("_");
        let damageName = "";
        for (let i in damageNameArr) {
            let dName = damageNameArr[i];
            damageName += dName[0].toUpperCase() + dName.slice(1) + " ";
        }

        if (monster[d] != "") {
            let propLine6 = document.createElement("property-line");
            const header = createEleWithText("h4", damageName);
            const desc = createEleWithText("p", monster[d]);
            propLine6.appendChild(header);
            propLine6.appendChild(desc);
            topStats.appendChild(propLine6);
        }
    }

    //languages
    const propLine7 = document.createElement("property-line");
    const languageHeader = createEleWithText("h4", "Languages");
    let languageDesc = ` ${monster.languages}`;
    if (languageDesc == " ") {
        languageDesc = " —";
    }
    const languages = createEleWithText("p", languageDesc);
    propLine7.appendChild(languageHeader);
    propLine7.appendChild(languages);
    topStats.appendChild(propLine7);

    //cr
    const propLine8 = document.createElement("property-line");
    const challengeHeader = createEleWithText("h4", "Challenge");
    const xpDict = {"0": "10", "1/8": "25", "1/4": "50", "1/2": "100", "1": "200", "2": "450", "3": "700", "4": "1,100", "5": "1,800", 
        "6": "2,300", "7": "2,900", "8": "3,900", "9": "5,000", "10": "5,900", "11": "7,200", "12": "8,400", "13": "10,000", 
        "14": "11,500", "15": "13,000", "16": "15,000", "17": "18,000", "18": "20,000", "19": "22,000", "20": "25,000",
        "21": "33,000", "22": "41,000", "23": "50,000", "24": "62,000", "25": "75,000", "26": "90,000", "27": "105,000",
        "28": "120,000", "29": "135,000", "30": "155,000"
    };
    const challenge = ` ${monster.challenge_rating} (${xpDict[monster.challenge_rating]} XP)`;
    const challengeDesc = createEleWithText("p", challenge);
    propLine8.appendChild(challengeHeader);
    propLine8.appendChild(challengeDesc);
    topStats.appendChild(propLine8);

    statBlock.appendChild(creatureHeading);
    statBlock.appendChild(topStats);
    //End of topstats, below are all property-blocks
    
    //special abilities
    if (monster.special_abilities != null && monster.special_abilities != []) {
        makePropBlock(monster.special_abilities, statBlock)
    }

    //actions
    const actionHeader = createEleWithText("h3", "Actions");
    if(monster.actions != null && monster.actions != []){
        statBlock.appendChild(actionHeader);
        makePropBlock(monster.actions, statBlock)
    }
    

    //bonus actions 
    const bonusactionHeader = createEleWithText("h3", "Bonus Actions")
    if(monster.bonus_actions != null && monster.bonus_actions != []){
        statBlock.appendChild(bonusactionHeader);
        makePropBlock(monster.bonus_actions, statBlock)
    }

    //reactions
    const reactionHeader = createEleWithText("h3", "Reactions");
    if(monster.reactions != null && monster.reactions != []){
        statBlock.appendChild(reactionHeader);
        makePropBlock(monster.reactions, statBlock)
    }

    //legendary actions
    const legactionHeader = createEleWithText("h3", "Legendary Actions");
    if(monster.legendary_actions != null && monster.legendary_actions != []){
        statBlock.appendChild(legactionHeader);
        makePropBlock(monster.legendary_actions, statBlock)
    }

    let monsterDisplay = null;
    if (elementName == "") {
        monsterDisplay = document.querySelector("#monster-display");
    } else {
        monsterDisplay = document.querySelector(`${elementName}`);
    }
    monsterDisplay.appendChild(statBlock);
}

// Calculates the modifier of a stat
function getModifier (score) {
    return Math.floor((score - 10) / 2);
}

// Returns the average HP of a monster using the formula
// HP = Floor(<Size Modifier> * <Number of dice>) + modifier
function getHP (monsterSize, numDice, constMod) {
    switch (monsterSize) {
        case "tiny":
            return `${Math.floor(2.5 * numDice) + constMod} (${numDice}d4)`;
        case "small":
            return `${Math.floor(3.5 * numDice) + constMod} (${numDice}d6)`;
        case "medium":
            return `${Math.floor(4.5 * numDice) + constMod} (${numDice}d8)`;
        case "large":
            return `${Math.floor(5.5 * numDice) + constMod} (${numDice}d10)`;
        case "huge":
            return `${Math.floor(6.5 * numDice) + constMod} (${numDice}d12)`;
        case "gargantuan":
            return `${Math.floor(10.5 * numDice) + constMod} (${numDice}d20)`;
        default:
            return `Error`;
    }
}

//for displaying: speep, hp, ac
function basicMonsterPropLine(stat, desc) {
    const propLine = document.createElement("property-line");
    const headerEle = createEleWithText("h4", stat);
    const statEle = createEleWithText("p", " " + desc);
    propLine.appendChild(headerEle);
    propLine.appendChild(statEle);
    return propLine;
}

//for displaying statblock
function monsterStatBlock(monster) {
    const abilitiesBlock = document.createElement("abilities-block");
    abilitiesBlock.setAttribute("data-cha", monster.chaPoints);
    abilitiesBlock.setAttribute("data-con", monster.conPoints);
    abilitiesBlock.setAttribute("data-dex", monster.dexPoints);
    abilitiesBlock.setAttribute("data-int", monster.intPoints);
    abilitiesBlock.setAttribute("data-str", monster.strPoints);
    abilitiesBlock.setAttribute("data-wis", monster.wisPoints);
    return abilitiesBlock;
}

//creates a PropLine used for saving throws
function sThrowsMonsterPropLine(sThrows) {
    let throws = "";
    let throwsPropLine = null;
    for (sThrow in sThrows) {
        //create the property line if it hasn't been initialized
        if (!throwsPropLine) {
            throwsPropLine = document.createElement("property-line");
            const header = createEleWithText("h4", "Saving Throws",);
            throwsPropLine.appendChild(header);
            throws += " ";
        }
        else {
            throws += ", ";
        }

        //add this new skill/save/etc to the throws text
        throws += sThrow.name + " +";
        //will have to do real proficiency bonus later, for now focusing on mvp
        //throws += `${getMod(skill.stat)}`;
    
    }
    if (throwsPropLine != null) {
        throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;
}

//creates a propline for skills
function skillsMonsterPropLine(skills) {
    let throws = "";
    let throwsPropLine = null;
    for (skill in skills) {
        //create the property line if it hasn't been initialized
        if (!throwsPropLine) {
            throwsPropLine = document.createElement("property-line");
            const header = createEleWithText("h4", "Skills",);
            throwsPropLine.appendChild(header);
            throws += " ";
        }
        else {
            throws += ", ";
        }

        //add this new skill/save/etc to the throws text
        throws += skill.name + " +";
        throws += `${sThrow.order}`;
    
    }
    if (throwsPropLine != null) {
        throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;    
}

function damageTypesMonsterPropLine(damageTypes) {
   
    let propLine = null; 
    for (type in damageTypes) {
        if (propLine == null) {
            propLine = document.createElement("property-line");
        }
        const header = createEleWithText("h4", type.name + " " + type.note);
        propLine.appendChild(header);
    }
    return propLine;
}

function languagesMonsterPropLine(languages) {
    let propLine = document.createElement("property-line");
    const languageHeader = createEleWithText("h4", "Languages");
    propLine.appendChild(languageHeader);

    let languageDesc = "";
    for (language in languages) {
        languageDesc += language.name;
        if (language.speaks) {
            languageDesc += "speaks"
        }
        else {
            languageDesc += "Understands";
        }
        languages += ", ";
    }
    if(languageDesc == "") {
        languageDesc = " None"
    }
    const languagesEle = createEleWithText("p", languageDesc);
    propLine.appendChild(languagesEle);

    return propLine;
}

function crMonsterPropLine(cr) {
    const propLine = document.createElement("property-line");
    const challengeHeader = createEleWithText("h4", "Challenge");
    const xpDict = {"0": "10", "1/8": "25", "1/4": "50", "1/2": "100", "1": "200", "2": "450", "3": "700", "4": "1,100", "5": "1,800", 
        "6": "2,300", "7": "2,900", "8": "3,900", "9": "5,000", "10": "5,900", "11": "7,200", "12": "8,400", "13": "10,000", 
        "14": "11,500", "15": "13,000", "16": "15,000", "17": "18,000", "18": "20,000", "19": "22,000", "20": "25,000",
        "21": "33,000", "22": "41,000", "23": "50,000", "24": "62,000", "25": "75,000", "26": "90,000", "27": "105,000",
        "28": "120,000", "29": "135,000", "30": "155,000"
    };
    const challenge = ` ${cr} (${xpDict[cr]} XP)`;
    const challengeDesc = createEleWithText("p", challenge);
    propLine.appendChild(challengeHeader);
    propLine.appendChild(challengeDesc);
    return propLine;
}

// Creates a div containing moster information and adds it to the monster display div
//USING A .MONSTER FILE
function loadMonsterMonster (monster, elementName="") {
    //create statblock variable
    const statBlock = document.createElement("stat-block");

    //creature-heading
    const creatureHeading = createCreatureHeading(monster);

    //top-stats
    const topStats = document.createElement("top-stats");

    //ac
    topStats.appendChild(basicMonsterPropLine("Armor Class", monster.otherArmorDesc));

    //hp
    topStats.appendChild(basicMonsterPropLine("Hit Points", getHP(monster.size, monster.hitDice, getModifier(monster.conPoints)) + ` (${monster.hitDice})`));

    //speed
    topStats.appendChild(basicMonsterPropLine("Speed", `${monster.speed} ft.`))

    //stat block
    topStats.appendChild(monsterStatBlock(monster));

    //saving throws
    const sThrowsPropLine = sThrowsMonsterPropLine(monster.sthrows);
    if (sThrowsPropLine != null) {
        topStats.appendChild(sThrowsPropLine);
    }

    //skills
    const skillsPropLine = skillsMonsterPropLine(monster.skills);
    if (skillsPropLine != null) {
        topStats.appendChild(skillsPropLine);
    }

    //damage types, condition immunities, senses
    //will need to test further later, for now focusing on MVP
    const damageTypePropLine = damageTypesMonsterPropLine(monster.damagetypes);
    if(damageTypePropLine != null) {
        topStats.appendChild(damageTypePropLine);
    }

    //languages
    const languagePropLine = languagesMonsterPropLine(monster.languages);
    topStats.appendChild(languagePropLine);

    //cr
    topStats.appendChild(crMonsterPropLine(monster.cr));

    statBlock.appendChild(creatureHeading);
    statBlock.appendChild(topStats);
    //End of topstats, below are all property-blocks
    
    //special abilities
    if (monster.abilities != null && monster.abilities.length > 0) {
        makePropBlock(monster.abilities, statBlock)
    }

    //actions
    const actionHeader = createEleWithText("h3", "Actions");
    if(monster.actions != null && monster.actions.length > 0){
        statBlock.appendChild(actionHeader);
        makePropBlock(monster.actions, statBlock)
    }

    //bonus actions 
    const bonusactionHeader = createEleWithText("h3", "Bonus Actions")
    if(monster.bonusActions != null && monster.bonusActions.length > 0){
        statBlock.appendChild(bonusactionHeader);
        makePropBlock(monster.bonusActions, statBlock)
    }

    //reactions
    const reactionHeader = createEleWithText("h3", "Reactions");
    if(monster.reactions != null && monster.reactions.length > 0){
        statBlock.appendChild(reactionHeader);
        makePropBlock(monster.reactions, statBlock)
    }

    //legendary actions
    const legactionHeader = createEleWithText("h3", "Legendary Actions");
    if(monster.legendaries != null && monster.legendaries.length > 0){
        statBlock.appendChild(legactionHeader);
        makePropBlock(monster.legendaries, statBlock)
    }

    //mythic actions
    const mythActHeader = createEleWithText("h3", "Mythic Actions");
    if(monster.mythics != null && monster.mythics.length > 0){
        statBlock.appendChild(mythActHeader);
        makePropBlock(monster.mythics, statBlock)
    }

    //lair actions
    const lairActHeader = createEleWithText("h3", "Lair Actions");
    if(monster.lairs != null && monster.lairs.length > 0){
        statBlock.appendChild(lairActHeader);
        makePropBlock(monster.lairs, statBlock)
    }

    //regional actions
    const rgnActHeader = createEleWithText("h3", "Regional Actions");
    if(monster.regionals != null && monster.regionals.length > 0) {
        statBlock.appendChild(rgnActHeader);
        makePropBlock(monster.regionals, statBlock)
    }   

    const monsterDisplay = document.querySelector("#monster-display");
    monsterDisplay.appendChild(statBlock);
}


/*******************
*    TESTING AREA  *
********************/

export async function fetchJSONMonster(monsterName, elementName="") {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.json`)
    .then (response => response.json())
    .then (monster => loadJSONMonster(monster, elementName));
}

export async function fetchMonsterMonster(monsterName, elementName="") {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.monster`)
    .then (response => response.json())
    .then (monster => loadMonsterMonster(monster, elementName));
}

//commenting this out because it was causing issues when I was trying to
//export loadJSONMonster into search.js

// const createMonsterButton = document.querySelector("#create");
// createMonsterButton.addEventListener("click", () => {
//     const monsterDisplay = document.querySelector('#monster-display');
//     monsterDisplay.innerHTML = "";
//     fetchJSONMonster("goat");
//     fetchMonsterMonster("goat");
//     // fetchMonster("goat");
//     // fetchMonster("goat");
//     // fetchMonster("goat");
//     // fetchMonster("goat");
//     // fetchMonster("goat");
// });