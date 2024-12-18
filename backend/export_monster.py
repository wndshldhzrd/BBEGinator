"""
export_monster.py

The parser function will call take in monster data from a json file 
and export a monster to a .monster file
"""

import json

#grabs the integer values from a string for each sense in .json to .monster conversion
def get_sense(sense, description):
	index = description.find(sense)
	if (index == -1):
		return 0

	else:
		index = index + len(sense) + 1

		#numerical value following the sense to avoid any api data typos
		#after encountering one in crab-razorback
		#sorry for the awful code it was the only way
		end = index 
		numbers = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}
		while end < len(description) and description[end] in numbers:
			end = end+1

		val = int(description[index : end])
		return val

#export a monster's data to a .monster style format
def export(monster):
	#jsonData starts as a .monster-style template to fill in
	jsonData = json.loads(open('sample_monster.monster').read())

	#keys in monster file and corresponding keys in json as values
	j2m = json.loads(open("j2m_keys.json").read())

	#insert data into our template
	for category in j2m:
		if (isinstance(j2m[category], list)):
			jsonData[category] = ""
			for c in j2m[category]:
				if monster[c] != None:
					jsonData[category] = jsonData[category] + " " + str(monster[c])

		else:
			if monster[j2m[category]] != None:
				jsonData[category] = monster[j2m[category]]

	#.JSON TO .MONSTER CONVERSIONS BELOW:
	#senses
	senses = ["darkvision", "tremorsense", "blindsight", "telepathy", "truesight"]
	for s in senses:
		jsonData[s] = get_sense(s, jsonData[s])

	#blind
	jsonData["blind"] = (jsonData["blind"].find("blind ") != -1)

	#hitdice
	jsonData["hitDice"] = (jsonData["hitDice"][:jsonData["hitDice"].find("d")])

	#walk speed
	jsonData["speed"] = jsonData["speed"]["walk"]

	#other speeds
	speeds = ["flySpeed", "swimSpeed", "climbSpeed", "burrowSpeed"] #note: speed = walk
	speedsActual = ["fly", "swim", "climb", "burrow"]
	for i in range(0, len(speeds)):
		s = speeds[i]
		s_actual = speedsActual[i]

		if(s_actual in jsonData[s]):
			jsonData[s] = jsonData[s][s_actual]
		else:
			jsonData[s] = 0

	#hover
	jsonData["hover"] = "hover" in jsonData["hover"]

	#skills
	cr = jsonData["cr"]
	skills_dict = { "athletics": "str", "acrobatics": "dex", "sleight of hand": "dex", "stealth": "dex",
	"arcana": "int", "history": "int", "investigation": "int", "nature": "int", "religion": "int", 
	"animal handling": "wis", "insight": "wis", "medicine": "wis", "perception": "wis", "survival": "wis",
	"deception": "cha", "intimidation": "cha", "performance": "cha", "persuasion": "cha"}
	prof_caps = [(0, 2), (5, 3), (9, 4), (13, 5), (17, 6), (21, 7), (25, 8), (29, 9)]
	new_skills = []
	for skill in jsonData["skills"]:
		stat = skills_dict[skill]
		new_s = {"name": skill, "stat": stat}

		#calculate expected bonus (proficiency + modifier) to check for expertise
		bonus = jsonData["skills"][skill]
		expected_bonus = 0
		for prof in prof_caps:
			if cr >= prof[0]:
				expected_bonus = prof[1]
			else:
				break
		expected_bonus = expected_bonus + ((jsonData[stat + "Points"] - 10) / 2)

		#check for expertise
		if bonus > expected_bonus:
			new_s["note"] = " (ex)"
		new_skills.append(new_s)
		
	jsonData["skills"] = new_skills

	#cr double to string conversion
	double_to_frac = {0: "0", 0.125: "1/8", 0.25: "1/4", 0.5: "1/2"}
	if jsonData["cr"] < 1:
		jsonData["cr"] = double_to_frac[jsonData["cr"]]
	else:
		jsonData["cr"] = str(int(jsonData["cr"]))

	#sthrows
	jsonData["sthrows"] = []
	throws = ["str", "dex", "con", "int", "wis", "cha"]
	throws_actual = j2m["sthrows"]
	for i in range(0, len(throws)):
		t = throws[i]
		t_actual = throws_actual[i]
		if monster[t_actual] != None:
			jsonData["sthrows"].append({"name":t, "order":i})

	#isLegendary
	jsonData["isLegendary"] = jsonData["isLegendary"] != "" and jsonData["isLegendary"] != None

	#armor
	armor_str = jsonData["otherArmorDesc"].strip()
	a_index = armor_str.find(" ")
	if (a_index != -1):
		jsonData["otherArmorDesc"] = armor_str[0:a_index] + " (" + armor_str[a_index+1:] + ")"
	else:
		jsonData["otherArmorDesc"] = armor_str

	#hptext
	jsonData["hpText"] = str(jsonData["hitDice"])
	
	#damagetypes and specialdamage
	vulnerable = monster["damage_vulnerabilities"].split("; ")
	d_vulnerable = vulnerable[0].split(", ")
	s_vulnerable = ""
	if (len(vulnerable) > 1):
		s_vulnerable = vulnerable[1]

	resists = monster["damage_resistances"].split("; ")
	d_resists = resists[0].split(", ")
	s_resists = ""
	if (len(resists) > 1):
		s_resists = resists[1]

	immune = monster["damage_immunities"].split("; ")
	d_immune = immune[0].split(", ")
	s_immune = ""
	if (len(immune) > 1):
		s_immune = immune[1]

	#damagetypes
	jsonData["damagetypes"] = []
	for v in d_vulnerable:
		if v == "":
			break
		vul = {"name": v, "note": " (Vulnerable)", "type": "v"}
		jsonData["damagetypes"].append(vul)

	for r in d_resists:
		if r == "":
			break
		res = {"name": r, "note": " (Resistant)", "type": "r"}
		jsonData["damagetypes"].append(res)

	for i in d_immune:
		if i == "":
			break
		im = {"name": i, "note": " (Immune)", "type": "i"}
		jsonData["damagetypes"].append(im)

	#specialdamage
	jsonData["specialdamage"] = []
	if s_vulnerable != "":
		vul = {"name": s_vulnerable, "note": " (Vulnerable)", "type": "v"}
		jsonData["specialdamage"].append(vul)

	if s_resists != "":
		res = {"name": s_resists, "note": " (Resistant)", "type": "r"}
		jsonData["specialdamage"].append(res)

	if s_immune != "":
		im = {"name": s_immune, "note": " (Immune)", "type": "i"}
		jsonData["specialdamage"].append(im)

	#actions, bonus actions, legendary actions
	action_types = ["actions", "bonusActions", "legendaries", "reactions"]
	for a in action_types:
		search_terms = ["Melee Weapon Attack:", "Hit:", "Ranged Weapon Attack:"]
		new_actions = []
		for i in range(len(jsonData[a])):
			action = dict()
			action["name"] = jsonData[a][i]["name"]

			desc = jsonData[a][i]["desc"]
			#add underscores
			for s in search_terms:
				s_index = desc.find(s)
				if s_index != -1:
					new_desc = desc[0:s_index] + "_" + desc[s_index:s_index + len(s)] + "_" + desc[s_index + len(s):]
					desc = new_desc

			action["desc"] = desc
			new_actions.append(action)
		jsonData[a] = new_actions

	#remove telepathy from languages
	t_index = jsonData["languages"].find("telepathy")
	if t_index != -1:
		#account for comma after
		post_t = jsonData["languages"].find(",", t_index)

		#account for space and comma before
		if t_index != 0:
			t_index = t_index - 2

		if post_t != -1:
			jsonData["languages"] = jsonData["languages"][0:t_index] + jsonData["languages"][post_t+2:]
		else:
			jsonData["languages"] = jsonData["languages"][0:t_index]

	#create list of languages as dictionaries
	jsonData["languages"] = jsonData["languages"].split(", ")
	for i in range(len(jsonData["languages"])):
		jsonData["languages"][i] = {"name": jsonData["languages"][i], "speaks": True}
	
	#shieldbonus
	#null values leave shieldBonus as its default--0
	if jsonData["shieldBonus"] != 0:
		if jsonData["shieldBonus"].find("shield") != -1:
			jsonData["shieldBonus"] = 2
		else:
			jsonData["shieldBonus"] = 0

	#check for null conditions
	if jsonData["conditions"] == None:
		jsonData["conditions"] = ""

	#conditions
	if jsonData["conditions"] == "":
		jsonData["conditions"] = []
	else:
		jsonData["conditions"] = jsonData["conditions"].split(", ")
		for i in range(len(jsonData["conditions"])):
			jsonData["conditions"][i] = {"name": jsonData["conditions"][i]}

	#lowercase size
	jsonData["size"] = jsonData["size"].lower()

	#hitdice int conversion (must stay at bottom)
	jsonData["hitDice"] = int(jsonData["hitDice"])

	#update lair and mythic descriptions to contain monster name
	name = jsonData["name"].lower()
	replacement = ["lairDescription", "lairDescriptionEnd", "mythicDescription", "regionalDescription", "regionalDescriptionEnd"]
	for r in replacement:
		jsonData[r] = jsonData[r].replace("monster", name)

	#natArmorBonus
	jsonData["natArmorBonus"] = 0

	#if statement for rounding (didn't want to import math for only one use case)
	dexBonus = jsonData["dexPoints"] - 10
	if dexBonus % 2 == 1:
		dexBonus = dexBonus - 1
	dexBonus = dexBonus / 2

	ac = monster["armor_class"]
	natArmorBonusCheck = ac - (10 + dexBonus + jsonData["shieldBonus"])
	if natArmorBonusCheck > 0:
		jsonData["natArmorBonus"] = natArmorBonusCheck
		if (jsonData['armorName'] != "natural armor"):
			jsonData['armorName'] = "other"
	jsonData["natArmorBonus"] = int(jsonData["natArmorBonus"])

	#armorName fix--remove mention of shield
	#also check for empty string
	jsonData["armorName"] = jsonData["armorName"].replace(", shield", "")
	if jsonData["armorName"] == "":
		jsonData["armorName"] = "none"

	#returns the data for use in the front-end
	print()
	print("exportmonster finished")
	print()
	return jsonData


#for testing purposes (note: not really needed anymore so commented out)
# if __name__ == "__main__":
# 	monSlug = "angel-psychopomp"
# 	print("This is a test to convert a monster from the JSON file " +
# 	 "format we get from mgetter.py to a .monster file")
# 	print("This test depends on the monster data being stored in output.json, as we search " +
# 		"for a specific slug. The actual function export_monster, however, simply requires " +
# 		"a dictionary containing the json data for the desired monster")
# 	print("\nCurrent monster slug: " + monSlug)

# 	#for testing purposes, we used the current mgetter to find a specific test monster,
# 	#with the goal of converting that data to .monster format in our code
# 	monsters = open("output.json").read()
# 	mon = ""
# 	start = monsters.find('{"slug": "' + monSlug + '"')
# 	end = monsters.find('}, {"slug"', start)

# 	if (end != -1):
# 		end = end + 1	#include "}" for the sake of json.loads
# 	else:
# 		if monsters[-1] == "]":
# 			end = monsters.rfind('}') + 1
	
# 	mon = monsters[start:end]