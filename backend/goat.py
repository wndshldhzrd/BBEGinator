from classes.Monster import Monster
from classes.PartyMember import PartyMember

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

print(goat.points)