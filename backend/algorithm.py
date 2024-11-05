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
        saves = {"str": monster["sthrows"].get("str"),
                 "dex": monster["sthrows"].get("dex"),
                 "con": monster["sthrows"].get("con"),
                 "int": monster["sthrows"].get("int"),
                 "wis": monster["sthrows"].get("wis"),
                 "cha": monster["sthrows"].get("cha")}
        vulnerabilities = monster["damage_vulnerabilities"]
        resistances = monster["damage_resistances"]
        immunities = monster["damage_immunities"]
        abilities = monster["abilities"]
        actions = monster["actions"]
        
        monsterDatabase.append(Monster(slug,name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, abilities))

        return monsterDatabase


# ENCOUNTER DIFFICULTY
class EncounterType(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    UNFAIR = 4
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
    #random[listofSlugs]


    
    totalHealth = 0 # finds max health of the party
    totalDmg = 0
    partyHealthAvg = 0
    partyDmgAvg = 0
    partyDmgMax = 0
    partyTags = [] # important bits about party members which may be useful for calculation
    
    for p in party:             #parses the party for information and to generate a points pool for the monsters to be generated from
        totalHealth += p.health
        totalDmg += p.dmg
        partyDmgMax += p.dmgMax
    
    partyDmgMaxAvg = partyDmgMax // len(party)
    
    points = (totalDmg+totalHealth+ (partyDmgMaxAvg/4)) * (float(difficulty.value) * (3 / 2))      #calculation for the point pool
    print(points)
    print(f"I have {points} points to spend")
    tempList = []
    if(mode == "random"):
        for i in range(guys):
            print(f"Generating monster {i + 1} of {guys}")
            toSpend = 0
            if(i < guys - 1):
                toSpend = randint(int(points * 0.1), int(points * 0.67))
                print(f"I want to spend {toSpend} points")
                found = False
                for x, y in monsterList:
                    if y.points > toSpend - 5 and y.points < toSpend + 5:
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
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            myGuy = choice(tempList)
        for i in range(guys - 1): monsters.append(myGuy)
    elif(mode == "balanced"):
        toSpend = points / guys
        print(f"I want to buy {guys} monsters with point values around {toSpend}")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
                tempList.append(x)
        if not found:
            print("I couldn't find a monster. In the actual thing that would be a problem but this is just testing")
        else:
            for i in range(guys - 1): monsters.append(choice(tempList))
    elif(mode == "boss"):
        print(f"This is a boss encounter, I will spend most of my points on a boss")
        toSpend = points if guys == 1 else randint(int(points * 0.67), int(points * 0.8))
        print(f"Generating monster 1 of {guys}")
        print(f"I want to spend {toSpend} points on the boss")
        found = False
        for x, y in monsterList:
            if y.points > toSpend - 5 and y.points < toSpend + 5:
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
                    tempList.append(x)
            if not found:
                print("I couldn't find any monsters. In the actual thing that would be a problem but this is just testing")
            else:
                for i in range(guys - 1): monsters.append(choice(tempList))
    
    print(f"Returning monster list: {monsters}")
    return monsters

#self, slug, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, cr
georgeBush = Monster("georgie", "George W. Bush", 5, 45, [0,5,30,2,5,6], [None,None,None,None,None,None],[],[],[],[],[],[],4)
jackson = Monster("jackie", "Michael Jackson", 5, 45, [0,5,30,2,5,6], [None,None,None,None,None,None],[],[],[],[],[],[],4)
barry = Monster("bartholomew", "Bartholemew", 5, 45, [0,5,30,2,5,6], [None,None,None,None,None,None],[],[],[],[],[],[],4)

print(georgeBush.points, jackson.points, barry.points)

database = {georgeBush.slug:georgeBush, jackson.slug : jackson, barry.slug:barry}
#party = partyReader('''party.json''')
party = {PartyMember(17, "fighter", 2), PartyMember(12, "cleric", 2), PartyMember(12, "rogue", 2)}

print(database)
for x, y in database.items():
    monsterList.append((y.points, x))


monsterList = Algorithm(party, EncounterType.MEDIUM, database.items(), None, 4, "boss")
