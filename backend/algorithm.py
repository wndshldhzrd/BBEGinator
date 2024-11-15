from enum import Enum
from classes.Monster import Monster
from classes.PartyMember import PartyMember
from random import *

# DATA
party = []
monsterList = []
mgetter = "?"

def partyReader(JSON):
    partyMembers = []
    #read jsonfile
    #create induvidual party member
    #append to partyList
    #gg


    x = True
    while x:
        #parseJson nonsense
        player = JSON(x)
        if('''   player == 0    '''):
            break
        health = int(player["health"])
        theClass = player["class"]
        level = int(player["level"])
        #stats = player["stats"]

        partyMembers.append(PartyMember(health, theClass, level))
    
    return partyMembers


def monsterReader(JSON):
    monsterDatabase = []
    #read json
    #create induvidual monster
    #append monster
    #gg

    x = True
    while x:
        #jsonParsing
        monster = JSON(x)
        slug = monster["slug"]
        name = monster["name"]
        ac = monster["otherArmorDesc"]
        hp = monster["hpText"]
        speeds = {"ground": monster["speedDesc"],
                  "flying": monster["flySpeed"],
                  "swim": monster["swimSpeed"]}
        stats = {"str": monster["strpoints"],
                 "dex": monster["dexpoints"],
                 "con": monster["conpoints"],
                 "int": monster["intpoints"],
                 "wis": monster["wispoints"],
                 "cha": monster["chapoints"]}
        saves = []#list of saves, actual points calculated inside monster class
        for statSave in monster["sthrows"]:
            saves.append(statSave["name"])
        vulnerabilities = monster["damage_vulnerabilities"]
        resistances = monster["damage_resistances"]
        immunities = monster["damage_immunities"]
        abilities = monster["abilities"]
        actions = monster["actions"]
        
        monsterDatabase.append(Monster(slug,name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, abilities))

        return monsterDatabase


# ENCOUNTER DIFFICULTY
class EncounterType(Enum):
    EASY = 0.75
    MEDIUM = 1
    HARD = 1.25
    UNFAIR = 1.5
    # BULLSHIT

def WordToNum(word):
    if word == "one": return 1
    elif word == "two": return 2
    elif word == "three": return 3
    elif word == "four": return 4
    elif word == "five": return 5
    else: return -69420

    #parses each monster from the mgetter and calulates its dmg/health ranges
def Algorithm(party, difficulty, monsterList, lair, guys, mode):
    
    points = 0

        #search monster database to create list of tuples
    monsters = []
    #when buying a monster, create a range of +- 5 of our point, and find all slugs within that range, pick one of those randomly
    #randomPoint -> parses monster list for a temp list of slugs
    
    for p in party: points += p.points
    points *= difficulty.value    #calculation for the point pool
    
    print(points)
    print(f"I have {points} points to spend")
    
    
    tempList = []
    if(mode == "random"):
        for i in range(guys):
            print(f"Generating monster {i + 1} of {guys}")
            toSpend = 0
            if(i < guys):
                toSpend = randint(int(points * 0.1), int(points * 0.67))
                print(f"I want to spend {toSpend} points")
                found = False
                for x, y in monsterList:
                    if y.points > toSpend - 5 and y.points < toSpend + 5:
                        found = True
                        tempList.append(x)
                if not found:
                    print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
                else:
                    monsters.append(choice(tempList))
                points -= toSpend
            else:
                print(f"This is the last monster, using my last {points} points")
    elif(mode == "sameMonster"):
        toSpend = points / guys
        print(f"I want to buy {guys} of the same monster with a point value around {toSpend}")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
                found = True
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            myGuy = choice(tempList)
        for i in range(guys): monsters.append(myGuy)
    elif(mode == "balanced"):
        toSpend = points / guys
        print(f"I want to buy {guys} monsters with point values around {toSpend}")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
                found = True
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            for i in range(guys): monsters.append(choice(tempList))
    elif(mode == "boss"):
        print(f"This is a boss encounter, I will spend most of my points on a boss")
        toSpend = points if guys == 1 else randint(int(points * 0.67), int(points * 0.8))
        print(f"Generating monster 1 of {guys}")
        print(f"I want to spend {toSpend} points on the boss")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
                found = True
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            monsters.append(choice(tempList))
        points -= toSpend
        for i in range(guys - 1):
            print(f"Generating monster {i + 2} of {guys}")
            toSpend = 0
            if(i < guys - 2):
                toSpend = randint(int(points * 0.1), int(points * 0.67))
                print(f"I want to spend {toSpend} points")
                tempList = []
                found = False
                for x, y in monsterList:
                    if y.points > toSpend - 5 and y.points < toSpend + 5:
                        found = True
                        tempList.append(x)
                if not found:
                    print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
                else:
                    monsters.append(choice(tempList))
                points -= toSpend
            else: print(f"This is the last monster, using my last {points} points")
    elif(mode == "bossBalanced"):
        print(f"This is a boss encounter, I will spend most of my points on a boss")
        toSpend = points if guys == 1 else randint(int(points * 0.67), int(points * 0.8))
        print(f"I want to spend {toSpend} points on the boss")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
                found = True
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            monsters.append(choice(tempList))
        points -= toSpend
        if(guys > 1):
            toSpend = points / (guys - 1)
            print(f"As for minions, I want to buy {guys - 1} monsters with a point value around {toSpend}")
            for x, y in monsterList:
                found = False
                if y.points > toSpend - 5 and y.points < toSpend + 5:
                    found = True
                    tempList.append(x)
            if not found:
                print("I couldn't find any monsters. In the actual thing that would be a problem but this is just testing")
            else:
                for i in range(guys - 1): monsters.append(choice(tempList))
    
    print(f"Returning monster list: {monsters}")
    return monsters

goat = Monster("goat", "Goat", 10, 4, {"walk": 40}, 
    {"strPoints": 12,
    "dexPoints": 10,
    "conPoints": 11,
    "intPoints": 2,
    "wisPoints": 10,
    "chaPoints": 5},
    [],
    "",
    "",
    "",
    [
        {
            "name": "Ram",
            "desc": "_Melee Weapon Attack:_ +3 to hit, reach 5 ft., one target. _Hit:_ 3 (1d4 + 1) bludgeoning damage."
        },
    ],
    [
        {
            "name": "Charge",
            "desc": "If the goat moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 2 (1d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone."
        },
        {
            "name": "Sure-Footed",
            "desc": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
        }
    ],
    0
    )

database = {goat.slug:goat}
rick = PartyMember(12, "fighter", 1, [17, 14, 14, 8, 10, 12])
party.append(rick)

print(database)
for x, y in database.items():
    monsterList.append((y.points, x))

monsterList = Algorithm(party, EncounterType.MEDIUM, database.items(), None, 4, "balanced")