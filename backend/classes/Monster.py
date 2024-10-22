class Monster():
    

    def __init__(self, name, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, cr):
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
        self.cr = cr
        self.points = 0

        points = 0

        points += hp
        if (ac >= 10):points = int( float(points) * (1 + (ac-10)/10))
        #add speeds in later
        stats





