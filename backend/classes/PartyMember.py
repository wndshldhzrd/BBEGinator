class PartyMember():
    health = 0
    theClass = 0
    def __init__(self, health, theClass):
        self.health = health
        self.theClass = theClass
        if (self.theclass == "wizard" or self.theclass == "sorcerer" or self.theclass == "warlock" or self.theclass == "cleric" or self.theclass == "druid"):
            self.spellcaster = True
            self.dmg = 24  #spell levels 
            self.dmgMax = 48 #double dmg
        else:
            self.dmg = 13   #number of attacks times d10
            self.dmgMax = 26    #double dmg