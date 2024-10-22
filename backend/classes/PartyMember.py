from ast import Mult
from audioop import mul


class PartyMember():
    health = 0
    theClass = 0
    def __init__(self, health, theClass, level):
        self.health = health
        self.theClass = theClass
        self.healer = false
        self.spellcaster = False
        self.dmg = 0
        self.dmgMax =0
        if (self.theClass == "wizard" or self.theClass == "sorcerer" or self.theClass == "bard" or self.theClass == "cleric" or self.theClass == "druid"):
            self.spellcaster = True
            self.dmg = (level//2)*10 + 5  #spell levels 
            self.dmgMax = self.dmg * 2 #double dmg
        else:
            if (theClass == "fighter"):     #im making so many if statements im so sorry
                if (level > 20):
                    self.dmg = 4*11
                elif(level > 11):           #number of attacks based on level * average dmg per attack
                    self.dmg = 3*11
                elif ( level > 5):
                    self.dmg = 2*11
                else:
                    self.dmg = 7

            elif(theClass == "monk"):
                multiattack = 2
                unarmedAverage = 3
                if(level > 17):
                    multiattack = 3
                    unarmedAverage = 7
                elif(level > 11):
                    multiattack = 3
                    unarmedAverage = 6
                elif (level > 5):
                    multiattack = 3
                    unarmedAverage = 4
                self.dmg = multiattack * (4 + unarmedAverage)       #unarmed multiattacks 

            elif(theClass == "paladin"):
                multiattack = 1
                if (level > 5):
                    multiattack = 2
                self.dmg = multiattack * (4 + (((level+1)//3)*5))           #divine smite dmg calculations(number of attacks *(attack modifier + highest spell level * dmg dice averages))

            elif(theClass == "Ranger"):
                multiattack = 1
                hunterMark = 3
                statAdd = 4 #stand in for dex to add to attack rolls + dmg
                if (level > 20):
                    statAdd += 3 # adds wisom to attack rolls at level 20
                if (level > 14):
                    hunterMark += 1
                if (level > 5):
                    multiattack = 2
                    hunterMark += 1
                self.dmg = multiattack * (4 + (((level+1)//3)*2)+hunterMark)    #dont know how to account for induvidual subclasses as the ranger is very heavily reliant on those

            elif(theClass == "rogue"):
                sneakAttack = level//2
                self.dmg = (sneakAttack*5) + 4 #also very heavily reliant on subclasses to determine max dmg output

            elif(theClass == "barbarian"):
                rageDmg = 2
                multiattack = 1
                if(level > 16):
                    rageDmg += 1
                if(level > 9):
                    rageDmg += 1
                if(level > 5):
                    multiattack+= 1
                self.dmg = multiattack * (rageDmg + 11)
            elif(theClass == "warlock"):            #how the hell? use base spell slots and then add after level 11, additionally, need to keep eldritch blast updated

                eldtritchBeams = 1
                spells = 1
                if(level > 18) :
                    spells+= 2
                if(level > 10):
                    eldtritchBeams += 1
                    spells += 1
                if(level > 4):
                    eldtritchBeams+=1
                if(level > 1):
                    spells+= 1
                self.dmg = (((level)//2)*spells)*10 + 7

        self.dmgMax = self.dmg * 2    
        
        if (theClass == "cleric" or theClass == "druid" or theClass == "paladin"):    #designated healer point calculations
            self.health += (self.health//2)