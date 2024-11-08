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
    const sizeType = createEleWithText("h2", `${monster.size} ${monster.type}, ${monster.alignment}`);
    creatureHeading.appendChild(name);
    creatureHeading.appendChild(sizeType);

    return creatureHeading
}

//creates a PropLine used for saving throws & skills
function throwsJSONPropLine(monster, name, keys, printKeys) {
    let throws = "";
    let throwsPropLine = null;
    for (key in keys) {
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
        throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;
}

//Used for implementing property blocks w/ the input of a monster category (ex: monster.actions)
//and statBlock (for appendChild)
function makePropBlock(category, statBlock){
    //names are based off monster.actions (hence "actions"), works w/ other categories.
    let actions = [];
    for(i in category){
            const actionProp = document.createElement("property-block");
            const prop = category[i];
            const name = createEleWithText("h4", `${prop.name}. `);
            actionProp.appendChild(name);

            const desc = createEleWithText("p", `${prop.desc} `);
            actionProp.appendChild(desc);

            actions.push(actionProp);
        }
        for(i in actions){
            statBlock.appendChild(actions[i]);
        }
    return;
}

// Creates a div containing moster information and adds it to the monster display div
//USING A .JSON FILE
function loadJSONMonster (monster) {
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
    if (monster.armor_desc != null) {
        acDesc += ` (${monster.armor_desc})`;
    }
    const ac = createEleWithText("p", acDesc);
    propLine.appendChild(acHeader);
    propLine.appendChild(ac);
    topStats.appendChild(propLine);

    //hp
    const propLine2 = document.createElement("property-line");
    const hpHeader = createEleWithText("h4", "Hit Points");
    const hp = createEleWithText("p", ` ${monster.hit_points} (${monster.hit_dice})`);
    propLine2.appendChild(hpHeader);
    propLine2.appendChild(hp);
    topStats.appendChild(propLine2);

    //speed
    const propLine3 = document.createElement("property-line");
    const speedHeader = createEleWithText("h4", "Speed");
    const speedDesc = ` ${monster.speed["walk"]} ft.`;
    for (const s in monster.speed) {
        if (s != "walk") {
            speedDesc += `, ${s} ${monster.speed[s]} ft.`
        }
    }
    const speed = createEleWithText("p", speedDesc);
    propLine3.appendChild(speedHeader);
    propLine3.appendChild(speed);
    topStats.appendChild(propLine3);

    //abilities-block
    const abilitiesBlock = document.createElement("abilities-block");
    abilitiesBlock.setAttribute("data-cha", `${monster.charisma}`);
    abilitiesBlock.setAttribute("data-con", `${monster.constitution}`);
    abilitiesBlock.setAttribute("data-dex", `${monster.dexterity}`);
    abilitiesBlock.setAttribute("data-int", `${monster.intelligence}`);
    abilitiesBlock.setAttribute("data-str", `${monster.strength}`);
    abilitiesBlock.setAttribute("data-wis", `${monster.wisdom}`);
    topStats.appendChild(abilitiesBlock);

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
    for (type in damageTypes) {
        let d = damageTypes[type];

        let damageNameArr = d.split("_");
        let damageName = "";
        for (i in damageNameArr) {
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

    const monsterDisplay = document.querySelector(".monster-display");
    monsterDisplay.innerHTML = "";
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
        throws += sThrow.name + " ";
        throws += `${sThrow.order}`;
    
    }
    if (throwsPropLine != null) {
        throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;
}

function skillsPropLine() {
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
        throws += sThrow.name + " ";
        throws += `${sThrow.order}`;
    
    }
    if (throwsPropLine != null) {
        throwsText = createEleWithText("p", throws);
        throwsPropLine.appendChild(throwsText);
    }

    return throwsPropLine;    
}


// Creates a div containing moster information and adds it to the monster display div
//USING A .MONSTER FILE
function loadMonsterMonster (monster) {
    //create statblock variable
    const statBlock = document.createElement("stat-block");

    //creature-heading
    const creatureHeading = createCreatureHeading(monster);

    //top-stats
    const topStats = document.createElement("top-stats");

    //ac
    const propLine = document.createElement("property-line");
    const acHeader = createEleWithText("h4", "Armor Class");
    const ac = createEleWithText("p", ` ${monster.otherArmorDesc}`);
    propLine.appendChild(acHeader);
    propLine.appendChild(ac);
    topStats.appendChild(propLine);

    //hp
    const propLine2 = document.createElement("property-line");
    const hpHeader = createEleWithText("h4", "Hit Points");
    const hp = createEleWithText("p", getHP(monster.size, monster.hitDice, getModifier(monster.conPoints)) + ` (${monster.hitDice})`);
    propLine2.appendChild(hpHeader);
    propLine2.appendChild(hp);
    topStats.appendChild(propLine2);

    //speed
    const propLine3 = document.createElement("property-line");
    const speedHeader = createEleWithText("h4", "Speed");
    const speed = createEleWithText("p", ` ${monster.speed} ft.`);
    propLine3.appendChild(speedHeader);
    propLine3.appendChild(speed);
    topStats.appendChild(propLine3);

    //abilities-block
    const abilitiesBlock = document.createElement("abilities-block");
    abilitiesBlock.setAttribute("data-cha", `${monster.chaPoints}`);
    abilitiesBlock.setAttribute("data-con", `${monster.conPoints}`);
    abilitiesBlock.setAttribute("data-dex", `${monster.dexPoints}`);
    abilitiesBlock.setAttribute("data-int", `${monster.intPoints}`);
    abilitiesBlock.setAttribute("data-str", `${monster.strPoints}`);
    abilitiesBlock.setAttribute("data-wis", `${monster.wisPoints}`);
    topStats.appendChild(abilitiesBlock);

    //saving throws
    const propLine4 = sThrowsMonsterPropLine(monster.sthrows);
    if (propLine4 != null) {
        topStats.appendChild(propLine4);
    }

    //skills
    const propLine5 = skillsPropLine(skillDict, "Skills", skillNames, skillNames);
    if (propLine5 != null) {
        topStats.appendChild(propLine5);
    }

    //damage types, condition immunities, senses
    const damageTypes = ["damage_vulnerabilities", "damage_resistances", "damage_immunities", "condition_immunities", "senses"];
    for (type in damageTypes) {
        let d = damageTypes[type];

        let damageNameArr = d.split("_");
        let damageName = "";
        for (i in damageNameArr) {
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

    const monsterDisplay = document.querySelector(".monster-display");
    monsterDisplay.innerHTML = "";
    monsterDisplay.appendChild(statBlock);
}