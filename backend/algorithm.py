from enum import Enum
from classes import Monster
from classes import PartyMember
from random import randint

# DATA
party = []
mgetter = "?"

# ENCOUNTER DIFFICULTY
class EncounterType(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    UNFAIR = 4
    # BULLSHIT

    #parses each monster from the mgetter and calulates its dmg/health ranges
def Algorithm(party, difficulty, monsterList, lair, guys):
    
    points = 0
    monsters = []
    
    totalHealth = 0 # finds max health of the party
    totalDmg = 0
    partyHealthAvg = 0
    partyDmgAvg = 0
    partyDmgMax = 0
    partyTags = [] # important bits about party members which may be useful for calculation
    
    for p in party:
        totalHealth += p.health
        totalDmg += p.dmg
        partyDmgMax += p.dmgMax
    
    partyHealthAvg = totalHealth // len(party)
    partyDmgAvg = totalDmg // len(party)
    
    points = 100
    
    print(f"I have {points} points to spend")
    for i in range(guys):
        print(f"Generating monster {i + 1} of {guys}")
        toSpend = 0
        if(i < guys - 1):
            toSpend = randint(int(points * 0.1), int(points * 0.67))
            print(f"I want to spend {toSpend} points")
            points -= toSpend
        else:
            print(f"This is the last monster, using my last {points} points")
    

jimmy = PartyMember.PartyMember(65, "shmorbler", 30, 50)
glorth = PartyMember.PartyMember(50, "glunkman", 40, 69)
party = [jimmy, glorth]

georgeBush = Monster.Monster("George W. Bush", "george", 45, 300, 5, 7)
Algorithm(party, EncounterType.MEDIUM, [georgeBush], None, 6)