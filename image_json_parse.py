import json
import os
import math
import random

poles = {}
count = 0

def addIfNotPresent(obj, filename):
	exists = False

	for key in poles:
		if poles[key][0] == obj['pole']['coordinates'][0]:
			poles[key][2].append(filename[:-5])
			exists = True

	if not exists:

		newPoleData = [obj['pole']['coordinates'][0], obj['pole']['coordinates'][1], [], 0, 0]

		if 'crossarm' in obj['esri_data']['assets']:
			newPoleData[3] = obj['esri_data']['assets']['crossarm']
			newPoleData[4] = obj['esri_data']['assets']['insulator']

		poles[len(poles)] = newPoleData


# Loop through every file in directory
for filename in os.listdir("images_json"):
	# Open file
	with open(os.path.join("images_json", filename), 'r') as pfile:
		# Load data
		pjsondata = pfile.read()
		obj = json.loads(pjsondata)	
		addIfNotPresent(obj, str(filename))
		

# print(poles)

# print(poles)

# print(poles[0][2])

poles_json = []
i = 1
for key in poles:

	pole = {}
	#ID
	pole["id"] = i

	#Pole data
	pole_data = {}
	pole_data["coordinates"] = poles[key][:2]
	
	
	#Generate random date
	m = random.randint(1, 12)
	month = f"0{m}"

	if m > 9:
		month = m

	d = random.randint(1, 31)
	day = f"0{d}"

	if d > 9:
		day = d

	pole_data["last_maintenance_date"] = f"{month}/{day}/2019"
	pole_data["crossarm"] = poles[key][3]
	pole_data["insulator"] = poles[key][4]
	pole_data["voltage"] = "low"
	pole_data["pole_names"] = poles[key][2]
	pole["pole_data"] = pole_data

	poles_json.append(pole)
	i+=1


with open('poles_data.json', 'w') as outfile:
	json.dump(poles_json, outfile, indent=4)