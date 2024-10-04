from enum import Enum
from classes import Monster
from classes import PartyMember

# DATA
party = []
mgetter

# ENCOUNTER THINGS
class EncounterType(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    UNFAIR = 4
    #BULLSHIT

    #parses each monster from the mgetter and calulates its dmg/health ranges
def Algorithm(Party, encounter, Mgetter, lair):
    print("meanie")
    
    totalHealth = 0 #finds max health of the party
    for x in Party:
        totalHealth += Party.health
    avgPartyMemberHealth = totalHealth//len(party)
    
    MonsterDmgAvg # = all the attacks used in the monsters multiattack in averaged amounts
    MonsterDmgMax # = all the attacks used in the monsters multiattack in the maximum amount
    MonsterCritMax # = all the attacks used in the monsters multiattack in the maximum, critical amount

    if (avgPartyMemberHealth >= (3*MonsterDmgAvg * (encounter/5)) :
    #add as a boss monster
    elif  (avgPartyMemberHealth > 3*MonsterDmgMax * (encounter/5)):
    #add as a acolyte Monster
    else (avgPartyMemberHealth > 3*MonsterCritMax * (encounter/5)):
    #add as a minion Monster

