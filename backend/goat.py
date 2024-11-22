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
    0,
    ["The goat is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 20, +12 to hit with spell attacks). The lich has the following wizard spells prepared:\n\n* Cantrips (at will): mage hand, prestidigitation, ray of frost\n* 1st level (4 slots): detect magic, magic missile, shield, thunderwave\n* 2nd level (3 slots): detect thoughts, invisibility, acid arrow, mirror image\n* 3rd level (3 slots): animate dead, counterspell, dispel magic, fireball\n* 4th level (3 slots): blight, dimension door\n* 5th level (3 slots): cloudkill, scrying\n* 6th level (1 slot): disintegrate, globe of invulnerability\n* 7th level (1 slot): finger of death, plane shift\n* 8th level (1 slot): dominate monster, power word stun\n* 9th level (1 slot): power word kill"]
    )

rick = PartyMember(12, "fighter", 1, [20, 16, 18, 8, 10, 12])

print(goat.points)
print(rick.points)