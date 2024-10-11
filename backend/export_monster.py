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
		print(category + ":")
		if (isinstance(j2m[category], list)):
			jsonData[category] = ""
			for c in j2m[category]:
				print(c)
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
	for i in range(0, len(speeds)): #dear vicky: climb does not work please help :(
		s = speeds[i]
		s_actual = speedsActual[i]

		if(s_actual in jsonData[s]):
			jsonData[s] = jsonData[s][s_actual]
		else:
			jsonData[s] = 0

	#hover boolean
	jsonData["hover"] = "hover" in jsonData["hover"]

	#convert cr from double to string of an int
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

	#actions
	search_terms = ["Melee Weapon Attack:", "Hit:", "Ranged Weapon Attack:"]
	new_actions = []
	for i in range(len(jsonData["actions"])):
		action = dict()
		action["name"] = jsonData["actions"][i]["name"]

		desc = jsonData["actions"][i]["desc"]
		#add underscores
		for s in search_terms:
			s_index = desc.find(s)
			if s_index != -1:
				new_desc = desc[0:s_index] + "_" + desc[s_index:s_index + len(s)] + "_" + desc[s_index + len(s):]
				desc = new_desc

		action["desc"] = desc
		new_actions.append(action)
	jsonData["actions"] = new_actions

	print(jsonData["actions"])

	print("\nTHE PARTIALLY EDITED CONVERSION OF DATA FROM JSON LOOKS LIKE THIS:")
	print(jsonData)
	print()

	#.monster file template to be personalized
	#output = open('sample_monster.monster').read()



	#fill in template
	i = 0
	#THIS WHOLE SECTION IS CURRENTLY CAUSING AN ERROR [can only contacenate str (not "dict" to str)]
	"""while (i < len(output) and i != -1): 
		#get the start and end quote positions for the category
		i = output.find('"', i)
		end = output.find('"', i+1)

		#these are the positions in the sample template where we'll be adding in the new data
		start_data = output.find(":", end)
		start_data = start_data+2 if output[start_data + 1] == '"' else start_data+1
		end_data = output.find(",", start_data+1)
		end_data = end_data - 1 if end_data > -1 and output[end_data - 1] == '"' else end_data

		category = output[i+1:end] 
		print("CATEGORY:", category)
		if (category in jsonData):
			print("\trewriting output here for category", category)
			output = output[0:start_data] + jsonData[category] + output[end_data:-1]

		i = output.find(",", end_data)
		print("current output:", output[0:i])"""

	#.monster file, for now named test.monster
	outfile = open('test.monster', 'w')
	json.dump(jsonData, outfile)
	outfile.close()

	#print("\nTEST PRINT STATEMENT: test.monster contains...")
	#print(output)
	return


#for testing purposes
if __name__ == "__main__":
	monSlug = "aboleth-nihilith"
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
