class Monster():
    
    flavor = ""
    def __init__(self, name, desc, points, health, dmg, dmgMax):
        self.name = name
        self.desc = desc
        self.health = health
        self.dmg = dmg
        self.dmgMax = dmgMax
        self.dmgCritMax = dmgMax * 2
        self.points = self.health + self.dmgCritMax         #mjaybe 100*cr rating times the health to dmg ratio between monster and players?


        #self.cr????????