from enum import Enum
from classes.Monster import Monster
from classes.PartyMember import PartyMember
from random import *

# DATA
party = []
monsterList = []
mgetter = "?"

# ENCOUNTER DIFFICULTY
class EncounterType(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    UNFAIR = 4
    # BULLSHIT

    #parses each monster from the mgetter and calulates its dmg/health ranges
def Algorithm(party, difficulty, lair, guys, mode):
    
    points = 0
    monsters = []
    
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
    
    partyHealthAvg = totalHealth // len(party)
    partyDmgAvg = totalDmg // len(party)
    partyDmgMaxAvg = partyDmgMax // len(party)
    
    points = (totalDmg+totalHealth+ (partyDmgMaxAvg/4)) * (float(difficulty.value) * (3 / 2))      #calculation for the point pool
    print(points)
    print(f"I have {points} points to spend")
    if(mode == "random"):
        for i in range(guys):
            print(f"Generating monster {i + 1} of {guys}")
            toSpend = 0
            if(i < guys - 1):
                toSpend = randint(int(points * 0.1), int(points * 0.67))
                print(f"I want to spend {toSpend} points")
                tempList = []
                for x in monsterList:
                    if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                        tempList.append(x[1])
                monsters.append(choice(tempList))
                points -= toSpend
            else:
                print(f"This is the last monster, using my last {points} points")
    elif(mode == "sameMonster"):
        toSpend = points / guys
        print(f"I want to buy {guys} of the same monster with a point value around {toSpend}")
        for x in monsterList:
            if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                tempList.append(x[1])
        myGuy = choice(tempList)
        for i in range(guys - 1): monsters.append(myGuy)
    elif(mode == "balanced"):
        toSpend = points / guys
        print(f"I want to buy {guys} monsters with point values around {toSpend}")
        for x in monsterList:
                if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                    tempList.append(x[1])
        for i in range(guys - 1): monsters.append(choice(tempList))
    elif(mode == "boss"):
        print(f"This is a boss encounter, I will spend most of my points on a boss")
        toSpend = points if guys == 1 else randint(int(points * 0.67), int(points * 0.8))
        print(f"Generating monster 1 of {guys}")
        print(f"I want to spend {toSpend} points on the boss")
        for x in monsterList:
            if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                tempList.append(x[1])
        monsters.append(choice(tempList))
        points -= toSpend
        for i in range(guys - 1):
            print(f"Generating monster {i + 2} of {guys}")
            toSpend = 0
            if(i < guys - 2):
                toSpend = randint(int(points * 0.1), int(points * 0.67))
                print(f"I want to spend {toSpend} points")
                tempList = []
                for x in monsterList:
                    if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                        tempList.append(x[1])
                monsters.append(choice(tempList))
                points -= toSpend
            else:
                print(f"This is the last monster, using my last {points} points")
    elif(mode == "bossBalanced"):
        print(f"This is a boss encounter, I will spend most of my points on a boss")
        toSpend = points if guys == 1 else randint(int(points * 0.67), int(points * 0.8))
        print(f"I want to spend {toSpend} points on the boss")
        for x in monsterList:
            if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                tempList.append(x[1])
        monsters.append(choice(tempList))
        points -= toSpend
        if(guys > 1):
            toSpend = points / (guys - 1)
            print(f"As for minions, I want to buy {guys - 1} monsters with a point value around {toSpend}")
            for x in monsterList:
                if x[0] > toSpend - 5 and x[0] < toSpend + 5:
                    tempList.append(x[1])
            for i in range(guys - 1): monsters.append(choice(tempList))
    
    print(f"Returning monster list: {monsters}")
    return monsters


jimmy = PartyMember(65, "shmorbler", 7)            #testing values
glorth = PartyMember(50, "glunkman", 13)
party = [jimmy, glorth]

Algorithm(party, EncounterType.MEDIUM, None, 5, "boss")