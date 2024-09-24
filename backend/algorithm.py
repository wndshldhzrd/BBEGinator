from enum import Enum

# DATA
party = []

# ENCOUNTER THINGS
class EncounterType(Enum):
    BOSS = 1
    ACOLYTE = len(party) / 2
    MINION = len(party) * 2