import json


def parse_monster_class(input_file):
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    monsterInfo = []
    
    if isinstance(data, list):
        data = data[0]
        for i in range(0, len(data)):
            slug = data[i]['slug']
            name = data[i]['name']
            ac = data[i]['armor_class']
            hp = data[i]['hit_points']
            speeds = data[i]['speed']
            stats = [data[i]['strength'], data[i]['dexterity'], data[i]['constitution'], data[i]['intelligence'], data[i]['wisdom'], data[i]['charisma']]
            saves = [data[i]['strength_save'], data[i]['dexterity_save'], data[i]['constitution_save'], data[i]['intelligence_save'], data[i]['wisdom_save'], data[i]['charisma_save']]
            vulnerabilities = data[i]['damage_vulnerabilities']
            resistances = data[i]['damage_resistances']
            immunities = data[i]['damage_immunities']
            actions = data[i]['actions']
            cr = data[i]['cr']
            
            monsterInfo.append([slug, name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, cr])
    return monsterInfo

input_file = 'output.json'
parsed_data = parse_monster_class(input_file)
for val in parsed_data:
    print(val)
    print("-----------------------")


