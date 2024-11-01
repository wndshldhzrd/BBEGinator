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

        points = 0

        points += hp
        if (ac >= 10):points = int( float(points) * (1 + (ac-10)/10))
        #multiattack calculation
        attacks = []
        for x in abilities:
            if x.name == "multiattack":
                x.description.split()
                for position in range(len(x.description)):
                    if x.description(position) == "one" or x.description(position) == "two" or x.description(position) == "three" or x.description(position) == "four" or x.description(position) == "five":
                        if x.description(position+1) == "with":
                            attacks.append(x.description(position), x.description(position+3))

        for a in actions :
            #if the action name == an attack name we have parsed already, send it
            for A in attacks:
               if a["name"].lower() == A[1]:
                   #do the math and shit



        #add speeds in later