import math

def WordToNum(word):
    if word == "one": return 1
    elif word == "two": return 2
    elif word == "three": return 3
    elif word == "four": return 4
    elif word == "five": return 5
    else: return -69420

class Monster():
    def __init__(self, slug, name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, abilities, cr, spells):
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
        self.spells = spells
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
                self.points += ((stats[stat] - 10)//2 * 2)  #if the stat is greater than 10, then add to points
            for SaveProficiency in saves:
                if (stats[stat] == SaveProficiency):Saves[stat] = stats[stat]//2 + prof # for each stat, find if its proficient in that save and then add respectively
                else:Saves[stat] = stats[stat]//2

        dmgAvg = 0
        dmgMax = 0
        coolActions = []
        for x in actions:
            if x["desc"].find("(") > -1 and x["desc"].find(")") > -1:
                y = x["desc"].find("(")
                z = x["desc"].find(")")
                relevant = x["desc"][y + 1:z]
                diceAndBonus = relevant.split(" + ")

                #some damaging moves are saves and don't have a bonus to damage, account for this
                #with these if statements
                if len(diceAndBonus) < 2:
                    diceAndBonus.append('0')
                if diceAndBonus[0].find('+') != -1:
                    split = diceAndBonus[0].split('+')
                    diceAndBonus[0] = split[0]
                    diceAndBonus[1] = split[1]
                elif diceAndBonus[0].find('-') != -1:
                    split = diceAndBonus[0].split('-')
                    diceAndBonus[0] = split[0]
                    diceAndBonus[1] = '-' + split[1]
                
                if not diceAndBonus[1].isnumeric() and diceAndBonus[1][0] != '-':
                    diceAndBonus[1] = 0
                
                coolActions.append({"name": x["name"], "desc": x["desc"], "damage_dice": diceAndBonus[0], "damage_bonus": diceAndBonus[1]})

        #multiattack calculation
        #Current temporary fix--append x amount of the first non-multiattack action we have
        #to attacks. There is literally no good way to parse it otherwise, see proof below

        #Here are a few examples of the inconsistent multiattack formatting:
        #abaasy multiattack: "Three melee attacks only one of which can be a Shield Shove. If it uses two hands to make a Spear attack it can't make an Iron Axe attack that turn."
        #vs a-mi-kuk: "The a-mi-kuk makes two attacks: one with its bite and one with its grasping claw."
        #vs abbanith giant: "The abbanith giant makes two thumb claw attacks."
        #vs aboleth-a5e: "The aboleth attacks three times with its tentacle."
        attacks = []
        for x in coolActions:
            if x["name"].lower() == "multiattack":
                print("MULTIATTACK")
                desc = x["desc"].split()
                print(desc)
                for position in range(len(desc)):
                    if desc[position] == "one" or desc[position] == "two" or desc[position] == "three" or desc[position] == "four" or desc[position] == "five":
                        non_multi = [a["name"] for a in coolActions if a["name"].lower() != "multiattack"][0]
                        for i in range(WordToNum(desc[position])): 
                            attacks.append(non_multi)
                        break

                        #if desc[position + 1] == "with":
                            #for i in range(WordToNum(desc[position])): attacks.append(desc[position], desc[position + 3])

        if(len(attacks) > 0): # multiattack
            for action in coolActions:
                #if saving throw then pase as is
                #else do this
                for attack in attacks:
                    if action["name"].lower() == attack[1].lower():
                        dice = action["damage_dice"].split('d')
                        bonus = action["damage_bonus"]

                        if len(dice) < 2:
                            dice.append(0)
                        if not dice[0].isnumeric():
                            continue

                        dice[0] = int(dice[0])
                        dice[1] = int(dice[1])
                        bonus = int(bonus)

                        dmgMax = dice[0] * dice[1] + bonus
                        avgRoll = (dice[1] - 1) / 2
                        dmgAvg = dice[0] * avgRoll + bonus
        else: # no multiattack, we calculate in another way
            dmgAvgTotal = 0
            dmgMaxTotal = 0
            for action in coolActions:
                dice = action["damage_dice"].split('d')
                bonus = action["damage_bonus"]
                
                if len(dice) < 2:
                    dice.append(0)
                if not dice[0].isnumeric():
                    continue

                dice[0] = int(dice[0])
                dice[1] = int(dice[1])
                bonus = int(bonus)

                dmgMaxTotal += dice[0] * dice[1] + bonus
                avgRoll = (dice[1] - 1) / 2
                dmgAvgTotal += dice[0] * avgRoll + bonus
            if (len(coolActions) > 0): dmgAvg = dmgAvgTotal // len(coolActions)
            else: dmgAvg = dmgAvgTotal
            if (len(coolActions) > 0): dmgMax = dmgMaxTotal // len(coolActions)
            else: dmgMax = dmgMaxTotal

        if(len(self.spells) > 0):
            theSpells = self.spells[0]
            i = 0
            #spell calculation, how tf we do this?
            cursor = theSpells.find("Cantrips (at will): ") + 20
            cantrips = theSpells[cursor:theSpells.find("\n* ", cursor)].split(', ')
            cursor = theSpells.find("\n* ", cursor) + 3
            self.points += 2 * len(cantrips)
            
            while(cursor > 3):
                nextSpells = theSpells[cursor:theSpells.find("\n* ", cursor)].split(', ')
                spellLevel = theSpells[cursor]
                cursor = theSpells.find("\n* ", cursor) + 3
                self.points += ((4.75 * 1.55**int(spellLevel)) - 2)

        self.points += dmgAvg + dmgMax
        
        joe = vulnerabilities.split(';')
        if len(joe) >= 1:
            for vul in joe:
                joe2 = vul.split(',')
                for v in joe2:
                    self.points *= 0.9
     
        jimmy = resistances.split(';')
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



        #abilities points
        multiplier = 1.0
        if len(self.abilities) > 0:
            self.points += 3
        for a in self.abilities:
            multiplier += .1

        self.points *= multiplier
        self.points = math.floor(self.points)