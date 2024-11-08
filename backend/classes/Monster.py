class Monster():
    

    def __init__(self, slug, name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, abilities, cr):
        self.slug = slug
        self.name = name
        self.ac = ac
        self.hp = hp
        self.speeds = speeds
        self.stats = stats
        self.saves = saves
        self.vulnerabilities = vulnerabilities
        self.resistances = resistances
        self.immunities = immunities
        self.actions = actions
        self.abilities = abilities
        self.cr = cr
        self.points = 0

        points += hp

        #proficiency calc
        if (self.cr >=29):prof = 9
        elif (self.cr >= 25): prof = 8
        elif (self.cr >= 21): prof = 7
        elif (self.cr >= 17): prof = 6
        elif (self.cr >= 13): prof = 5
        elif (self.cr >= 9): prof = 4
        elif (self.cr >= 5): prof = 3
        else: prof = 2

        #stat & save point calculation
        Saves = {}
        statCalc = stats.keys
        for stat in statCalc:   #for each stat
            if(stats[stat]) > 10:
                points += (stats[stat]//2 * 5)  #if the stat is greater than 10, then add to points
            for SaveProficiency in saves:
                if (stats[stat] == SaveProficiency):Saves[stat] = stats[stat]//2 + prof # for each stat, find if its proficient in that save and then add respectively
                else:Saves[stat] = stats[stat]//2


        if (ac >= 10):points = int( float(points) * (1 + (ac-10)/10))
        #multiattack calculation
        attacks = []
        for x in actions:
            if x.name == "multiattack":
                x.description.split()
                for position in range(len(x.description)):
                    if x.description(position) == "one" or x.description(position) == "two" or x.description(position) == "three" or x.description(position) == "four" or x.description(position) == "five":
                        if x.description(position+1) == "with":
                            attacks.append(x.description(position), x.description(position+3))
            break

        dmgAvg = 0
        dmgMax = 0
        for action in actions:
            #if saving throw then pase as is
            #else do this
            for attack in attacks:
               if action["name"].lower() == attack[1]:
                   dice = action["damage_dice"].split('d')
                   bonus = action["damage_bonus"]
                   dmgMax = dice[0] * dice[1] + bonus
                   avgRoll = (dice[1] - 1) / 2
                   dmgAvg = dice[0] * avgRoll + bonus


        #vulnerailities
            #alex side
            #same as others

        #resistancesr
            #alex side

        #invulnerabilities
            #alex side
        

                   
        resistances.split(';')
        if len(resistances) > 1:
            for res in resistances:
                res.split(',')
                for r in res:
                    points += 10
        
        immunities.split(';')
        if len(immunities) > 1:
            for imm in immunities:
                imm.split(',')
                for i in imm:
                    points += 10
                   
        points += dmgAvg + dmgMax