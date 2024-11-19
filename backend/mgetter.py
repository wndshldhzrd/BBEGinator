import json
import requests

def get_data(url, payload):
    response = requests.get(url, payload)
    return response.json()

def write_to_json(data, filename="output.json"):
    with open(filename, 'w') as f:
        json.dump(data['results'], f)
        f.write('\n')
        f.close()


def getMonsters(order="no", params = {
    
    #slug also contains where the creature is from(document) so it isn't exactly the name btw sometimes(its complicated)

    'slug__in': '', #allows you to search for specific slugs, can do multiple at a time but formatting awkward
    'slug__iexact': '', #allows you to search for 1 slug specifically
    'slug': '', #tbh idk dfference between this and prev
    'name__iexact': '', #specific name
    'name': '', #SPECIFIC NAME
    'name__icontains': '', #allows you to search for creatures w names that contain this string. example is dragon will return al dragons
    'desc__iexact': '', #exact description
    'desc': '', #idk difference between this and prev
    'desc__in': '', #unsure rn
    'desc__icontains': '', #unsure
    'cr': '', #exact cr
    'cr__range': '', #range for cr but annoying to do so i implement later
    'cr__gt': '', #number you want cr to be greater than
    'cr__gte': '', #number u want cr to be greater than or equal to
    'cr__lt': '', #number u want cr to be less than
    'cr__lte': '', #number u want cr to be less than or equal to
    'hit_points': '', #hit points of creature
    'hit_points__range': '', #range for hp but annoying to do so i implement later
    'hit_points__gt': '', #number u want hp to be greater than
    'hit_points__gte': '', #number u want hp to be greater than or equal to
    'hit_points__lt': '', #number u want hp to be less than
    'hit_points__lte': '', #number u want hp to be less than or equal to
    'armor_class': '', #exact ac
    'armor_class__range': '', #range for ac but annoying to do so i implement later
    'armor_class__gt': '', #number u want ac to be greater than
    'armor_class__gte': '', #number u want ac to be greater than or equal to
    'armor_class__lt': '', #number u want ac to be less than
    'armor_class__lte': '', #number u want ac to be less than or equal to
    'type__iexact': '', #creature type
    'type': '', #unsure of difference between ^
    'type__in': '', #disregard
    'type__icontains': '', #allows you to search w a term and have results be types that contain that term
    'size__iexact': '', #exact size
    'size': '', #unsure of difference between^
    'size__in': '', #unsure
    'size__icontains': '', #allows you to search w a term and have results be sizes that contain that term, not sure why ud want this
    'page_no': '', #specific page #
    'page_no__range': '', #annoying, alr explained this 100x
    'page_no__gt': '', #page number greater than
    'page_no__gte': '', #page number greater than or equal to
    'page_no__lt': '', #page number less than
    'page_no__lte': '', #page number less than or equal to
    #all this document slug stuff is for what compendium the content is from, not sure if we will ever really be using
    'document__slug__iexact': '', 
    'document__slug': '',
    'document__slug__in': '',
    'document__slug__not_in': ''
}):
    temp = order
    payload = params
    url = 'https://api.open5e.com/v1/monsters/'
    filename = "output.json"

    dataString = ""
    while True:
        try:
            data = get_data(url, payload)
            if data['next']:
                dataString += json.dumps(data['results'])
                #write_to_json(data, filename)
                url = data['next']
                
            else:
                dataString += json.dumps(data['results'])
                #write_to_json(data, filename)
                break
        except Exception as e:
            print(f"An error occurred: {e}")
            break

    outputFile = open(filename, 'w')
    dataString = dataString.replace("][", ",")
    outputFile.write(dataString)
    print("mgetter--finished running getMonsters")
    return