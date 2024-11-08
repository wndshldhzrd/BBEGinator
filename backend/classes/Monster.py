def WordToNum(word):
    if word == "one": return 1
    elif word == "two": return 2
    elif word == "three": return 3
    elif word == "four": return 4
    elif word == "five": return 5
    else: return -69420

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
        
        self.points += hp
        if (ac >= 10):self.points = int( float(self.points) * (1 + (ac-10)/10))

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
        statCalc = stats.keys()
        for stat in statCalc:   #for each stat
            if(stats[stat]) > 10:
                self.points += ((stats[stat] - 10)//2 * 5)  #if the stat is greater than 10, then add to points
            for SaveProficiency in saves:
                if (stats[stat] == SaveProficiency):Saves[stat] = stats[stat]//2 + prof # for each stat, find if its proficient in that save and then add respectively
                else:Saves[stat] = stats[stat]//2

        dmgAvg = 0
        dmgMax = 0

        #multiattack calculation
        attacks = []
        for x in actions:
            if x["name"] == "multiattack":
                desc = x["description"].split()
                for position in range(len(desc)):
                    if desc[position] == "one" or desc[position] == "two" or desc[position] == "three" or desc[position] == "four" or desc[position] == "five":
                        if desc[position + 1] == "with":
                            for i in range(WordToNum(desc[position])): attacks.append(desc[position], desc[position + 3])
        if(len(attacks) > 0): # multiattack
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

        self.points += dmgAvg + dmgMax
        
        joe = vulnerabilities.split(';')
        if len(joe) >= 1:
            for vul in joe:
                joe2 = vul.split(',')
                for v in joe2:
                    self.points *= 0.9
     
        jimmy = resistances.split(';')
        print(jimmy)
        if len(jimmy) >= 1:
            for res in jimmy:
                jimmy2 = res.split(',')
                for r in jimmy2:
                    self.points *= 1.1
                    
        
        john = immunities.split(';')
        if len(john) >= 1:
            for imm in john:
                john2 = imm.split(',')
                for i in john2:
                    self.points *= 1.1
                    
        if(self.points < 1): self.points = 1
        self.points = int(self.points)