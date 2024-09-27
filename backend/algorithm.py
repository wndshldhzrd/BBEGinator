from enum import Enum
from classes import Monster
from classes import PartyMember

# DATA
party = []

# ENCOUNTER THINGS
class EncounterType(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3
    UNFAIR = 4
    #BULLSHIT


def Algorithm(Party, encounter, lair):
    print("meanie")
    calcBoss()
    calcAcolyte()
    clacMinions()

