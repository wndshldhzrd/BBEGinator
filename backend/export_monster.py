"""
export_monster.py

The parser function will call on mgetter.py to get monster 
data in a json file, and export a monster to a .monster file
"""

import json
#from mgetter import mgetter #retrieves desired json data
import mgetter #above statement was causing an error, commented out for now

def get_sense(sense, description):
	index = description.find(sense)
	if (index == -1):
		return 0

	else:
		index = index + len(sense) + 1

		#numerical value following the sense
		val = int(description[index : description.find(" ", index+1)])
		return val

#export a monster's data to a .monster style format
def export(monster):
	#monster is a dictionary containing input data from json file
	jsonData = json.loads(open('sample_monster.monster').read())

	j2m = json.loads(open("j2m_keys.json").read())

	#to do: edit monster json into jsonData
	for category in j2m:
		if (isinstance(j2m[category], list)):
			jsonData[category] = ""
			for c in j2m[category]:
				if monster[c] != None:
					jsonData[category] = jsonData[category] + " " + str(monster[c])

		else:
			if monster[j2m[category]] != None:
				jsonData[category] = monster[j2m[category]]


	#CONVERT jsonData to .monster format:
	senses = ["darkvision", "tremorsense", "blindsight", "telepathy", "truesight"]
	for s in senses:
		jsonData[s] = get_sense(s, jsonData[s])

	#blind boolean
	jsonData["blind"] = (jsonData["blind"].find("blind ") != -1)

	#hitdice fix
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

	#hover boolean
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

	#convert cr from double to string
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
	jsonData["isLegendary"] = jsonData["isLegendary"] == "" or jsonData["isLegendary"] == None

	#armor
	armor_str = jsonData["otherArmorDesc"].strip()
	a_index = armor_str.find(" ")
	if (a_index != -1):
		jsonData["otherArmorDesc"] = armor_str[0:a_index] + " (" + armor_str[a_index+1:] + ")"
	else:
		jsonData["otherArmorDesc"] = armor_str

	#hptext
	jsonData["hpText"] = jsonData["hpText"][1:jsonData["hpText"].find(jsonData["hitDice"]) - 1]
	
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

	print(jsonData["damagetypes"])

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


	print(jsonData["specialdamage"])

	#specialdamagetypes = ["damage from nonmagical, non-silvered weapons", "bludgeoning, piercing, and slashing from nonmagical attacks", ""]
	#bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons
	#damage from nonmagical, non-silvered weapons
	#must become "bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons"
	#just check for the word silvered?

	#bludgeoning, piercing, and slashing from nonmagical attacks

	#piercing and slashing damage from nonmagical, non-adamantine weapons
	#bludgeoning, piercing, and slashing from nonmagical attacks not made with adamantine weapons
	#just check for the word adamantine?
	#must become "bludgeoning, piercing, and slashing from nonmagical attacks not made with adamantine weapons

	#have the code parse it into lists/dicts: list of immune, list of vulnerable, list of resistant
	#after that we can just have it go through each of those and be like 'for x blehblehbleh'
	#do a quick check if the listed thing is one of the specialdamage ones [non-silver, nonmagical, non-adamantine, other]

	#TLDR: STILL NEED TO HANDLE SPECIALDAMAGE

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
	if jsonData["shieldBonus"].find("shield") != -1:
		jsonData["shieldBonus"] = 2
	else:
		jsonData["shieldBonus"] = 0

	print("\nTHE PARTIALLY EDITED CONVERSION OF DATA FROM JSON LOOKS LIKE THIS:")
	print(jsonData)
	print()

	#.monster file, for now named test.monster
	outfile = open('test.monster', 'w')
	json.dump(jsonData, outfile)
	outfile.close()

	return


#for testing purposes
if __name__ == "__main__":
	monSlug = "tarrasque"
	print("This is a test to convert a monster from the JSON file " +
	 "format we get from mgetter.py to a .monster file")
	print("Current monster slug: " + monSlug + "\n")

	#uses an api to get monster data and places it in a json file called data.json
	#mgetter() [currently calls an error?]


	#for testing purposes, we used the current mgetter to find a specific test monster,
	#with the goal of converting that data to .monster format in our code
	monsters = open("data.json").read()
	mon = ""
	start = monsters.find('{"slug": "' + monSlug + '"')
	end = monsters.find('}, {"slug"', start)

	if (end != -1):
		end = end + 1	#include "}" for the sake of json.loads
	
	mon = monsters[start:end]
	if (start == -1):
		print("Failed to find monster by that slug")
		print(mon)
		mon = ""

	#print(mon)
	export(json.loads(mon))
