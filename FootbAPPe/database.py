from pymongo import MongoClient

uri = "mongodb+srv://FootbAPPe:FootbAPPé@footbappe.vnhro4y.mongodb.net/FootbAPPe"

def database():
    client = MongoClient(uri)
    db = client.FootbAPPe
    coll = db.male_players2

    query = {
        "club_name:string": "Manchester City",
    }
    cursor = coll.find(query)

    for doc in cursor:
        print(doc)

    client.close()

database()