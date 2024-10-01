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
	#dictionary to contain input data from json file
	jsonData = {}


	#to do: fill this dictionary with json data, ideally we can get json.loads
	#to work and edit from there
	#Owen was working on noting similarities in the json to .monster template


	#note: we spent the rest of RCOS looking at the .monster format and creating
	#a template for sample_monster.monster, so not much code got written

	#.monster file has something known as "separationPoint", and that's the 
	#one thing we're not sure what it's referring to, but we found the
	#code to calculate it in their GitHub, so ideally we can figure that out
	#on Friday


	#.monster file template to be personalized
	output = open('sample_monster.monster').read()

	#fill in template
	i = 0
	while (i < len(output) and i != -1):
		#note 2 vicky: had it as find(bleh, bleh) instead of string.find(bleh, bleh)
		i = output.find('"', i)
		end = output.find('"', i)

		#this is the position in the template where we'll be adding in the new data
		start = output.find(":", end)
		if output[start+1] == '"':
			start = start+1

		category = output[i+1:end]
		if (category in jsonData):
			output = output[0:start] + jsonData[category] + output[start:-1]

		i = output.find(",", i)

	#.monster file, for now named test.monster
	outfile = open('test.monster', 'w')
	outfile.write(output)
	outfile.close()

	print("TEST PRINT STATEMENT: test.monster contains...")
	print(output)
	return


#for testing purposes
if __name__ == "__main__":
	monSlug = "adult-black-dragon"
	print("This is a test to convert a monster from the JSON file " +
	 "format we get from mgetter.py to a .monster file")
	print("Current monster slug: " + monSlug)

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

	export(json.loads(mon))
