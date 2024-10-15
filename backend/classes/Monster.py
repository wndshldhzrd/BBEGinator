class Monster():
    
    def __init__(self, slug, ac, hp, speeds, stats, saves, vulnerabilities, resistances, immunities, actions, cr):
        self.slug = slug
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
        self.points = 100