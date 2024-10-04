"""
export_monster.py

The parser function will call on mgetter.py to get monster 
data in a json file, and export a monster to a .monster file
"""

import json
#from mgetter import mgetter #retrieves desired json data
import mgetter #above statement was causing an error, commented out for now

#export a monster's data to a .monster style format
def export(monster):
	#monster is a dictionary containing input data from json file
	jsonData = dict()

	j2m = json.loads(open("j2m_keys.json").read())

	#to do: edit monster json into jsonData
	for category in j2m:
		print(category + ":")
		if (isinstance(j2m[category], list)):
			jsonData[category] = ""
			for c in j2m[category]:
				print(c)
				jsonData[category] = jsonData[category] + str(monster[c])

		else:
			jsonData[category] = monster[j2m[category]]

	print("\nTHE UNEDITED CONVERSION OF DATA FROM JSON LOOKS LIKE THIS:")
	print(jsonData)
	print()

	#.monster file template to be personalized
	output = open('sample_monster.monster').read()

	#fill in template
	i = 0
	while (i < len(output) and i != -1):
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
		print("current output:", output[0:i])

	#.monster file, for now named test.monster
	#outfile = open('test.monster', 'w')
	#outfile.write(output)
	#outfile.close()

	print("\nTEST PRINT STATEMENT: test.monster contains...")
	print(output)
	return


#for testing purposes
if __name__ == "__main__":
	monSlug = "adult-black-dragon"
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
		mon = ""

	#print(mon)
	export(json.loads(mon))
