"""
compare.py

Compares each value in our test.monster to the actual .monster file
Ideally this will help us pinpoint what we missed in export_monster
"""

import json

#export a monster's data to a .monster style format
def compare(expected, actual):
	correct_categories = {"name", "size", "type", "tag", "alignment", "hitDice", "armorName", "shieldBonus",
	"otherArmorDesc", "speed", "burrowSpeed", "climbSpeed", "flySpeed", "hover", "swimSpeed", "customHP", 
	"customSpeed", "strPoints", "conPoints", "dexPoints", "intPoints", "wisPoints", "chaPoints", "blindsight",
	"blind", "darkvision", "tremorsense", "truesight", "telepathy", "cr", "isLegendary", "legendariesDescription",
	"isLair", "isMythic", "isRegional", "abilities", "actions", "bonusActions", "reactions", "legendaries",
	"mythics", "lairs", "regionals", "sthrows", "skills", "damagetypes", "specialdamage", "languages", "understandsBut", 
	"shortName", "pluralName", "doubleColumns", "damage", "conditions", "regionalDescription", "regionalDescriptionEnd",
	"mythicDescription", "lairDescription", "lairDescriptionEnd"}
	for category in expected:
		if category not in correct_categories or actual[category] == None:
			print(category + ":")
			print("expected:")
			print(expected[category])
			print("actual:")
			print(actual[category])
			print()


#for testing purposes
if __name__ == "__main__":
	expected = json.loads(open("red_dragon_expected.monster").read())
	actual = json.loads(open("test2.monster").read())

	print("\nCOMPARE.PY: COMPARING EXPECTED TO ACTUAL\n")
	compare(expected, actual)
