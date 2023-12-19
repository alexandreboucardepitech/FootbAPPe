from pymongo import MongoClient

uri = "mongodb+srv://FootbAPPe:FootbAPPé@footbappe.vnhro4y.mongodb.net/FootbAPPe"

def database_teams(query):
    client = MongoClient(uri)
    db = client.FootbAPPe
    teams = db.teams

    cursor = list(teams.find(query))

    client.close()
    return cursor


def database_players(query):
    client = MongoClient(uri)
    db = client.FootbAPPe
    players = db.male_players

    cursor = list(players.find(query))

    client.close()
    return cursor