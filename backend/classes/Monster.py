class Monster():
    health = 0
    flavor = ""
    def __init__(self, name, desc, points, health, dmg, dmgMax):
        self.name = name
        self.desc = desc
        self.points = points
        self.health = health
        self.dmg = dmg
        self.dmgMax = dmgMax
        self.dmgCritMax = dmgMax * 2