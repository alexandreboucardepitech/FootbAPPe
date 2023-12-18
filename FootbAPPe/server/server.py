from flask import Flask, request, jsonify
import re

from database import database_teams, database_players

app = Flask(__name__)

@app.route('/api/team/<string:team_name>/players', methods=['GET'])
def get_team_name_players(team_name):
    """
    Retrieve and return a list of the players of a specific team. (data is the same as in the 'get_player' route)
    """
    players = database_players({"club_name:string": team_name})
    players_list = []
    for player in players:
        data = {"short_name": player["short_name:string"], "player_id": player["player_id:int32"]}
        players_list.append(data)
    
    print(players_list)
    return jsonify(players_list)

@app.route('/api/team/<int:id>/players', methods=['GET'])
def get_team_players(id):
    """
    Retrieve and return a list of the players of a specific team. (data is the same as in the 'get_player' route)
    """
    players = database_players({"club_team_id:int32": id})
    players_list = []
    for player in players:
        data = {"short_name": player["short_name:string"]}
        players_list.append(data)
    
    print(players_list)
    return jsonify(players_list)

@app.route('/api/teams', methods=['GET'])
def get_teams():
    """
    Retrieve a list of data for all the teams. (data is the same as in the 'get_team' route)
    """
    teams = database_teams({})
    teams_list = []
    for team in teams:
        data = {"team_id": team["team_id:int32"], "team_url": team["team_url:string"], "team_name": team["team_name:string"], "league_id": team["league_id:int32"], "league_name": team["league_name:string"], "league_level": team["league_level:int32"], "nationality_id": team["nationality_id:int32"], "nationality_name": team["nationality_name:string"], "overall": team["overall:int32"], "starting_xi_average_age": team["starting_xi_average_age:int32"], "logo_url": team["logo_url:string"]}
        teams_list.append(data)
    
    print(teams_list)
    return jsonify(teams_list)

@app.route('/api/teams/<string:name>', methods=['GET'])
def get_teams_name(name):
    """
    Retrieve a list of data for all the teams. (data is the same as in the 'get_team' route)
    """
    regex_pattern = re.compile(name, re.IGNORECASE)
    query = {"team_name:string": {"$regex": regex_pattern}}
    teams = database_teams({query})
    teams_list = []
    for team in teams:
        data = {"team_id": team["team_id:int32"], "team_url": team["team_url:string"], "team_name": team["team_name:string"], "league_id": team["league_id:int32"], "league_name": team["league_name:string"], "league_level": team["league_level:int32"], "nationality_id": team["nationality_id:int32"], "nationality_name": team["nationality_name:string"], "overall": team["overall:int32"], "starting_xi_average_age": team["starting_xi_average_age:int32"], "logo_url": team["logo_url:string"]}
        teams_list.append(data)
    
    print(teams_list)
    return jsonify(teams_list)

@app.route('/api/players', methods=['GET'])
def get_players():
    """
    Retrieve a list of data for all the players. (data is the same as in the 'get_player' route)
    """
    players = database_players({})
    players_list = []
    for player in players:
        data = {"player_id": player["player_id:int32"], "player_url": player["player_url:string"], "short_name": player["short_name:string"], "long_name": player["long_name:string"], "player_positions": player["player_positions:string"], "overall": player["overall:int32"], "potential": player["potential:int32"], "age": player["age:int32"], "dob": player["dob:date"], "height_cm": player["height_cm:int32"], "weight_kg": player["weight_kg:int32"], "club_team_id": player["club_team_id:int32"], "club_name": player["club_name:string"], "league_id": player["league_id:int32"], "league_name": player["league_name:string"], "league_level": player["league_level:int32"], "club_jersey_number": player["club_jersey_number:int32"], "club_joined_date": player["club_joined_date:date"], "nationality_id": player["nationality_id:int32"], "nationality_name": player["nationality_name:string"], "nation_team_id": player["nation_team_id:int32"], "preferred_foot": player["preferred_foot:string"], "weak_foot": player["weak_foot:int32"], "skill_moves": player["skill_moves:int32"], "international_reputation": player["international_reputation:int32"], "work_rate": player["work_rate:string"], "pace": player["pace:int32"], "shooting": player["shooting:int32"], "passing": player["passing:int32"], "dribbling": player["dribbling:int32"], "defending": player["defending:int32"], "physic": player["physic:int32"]}
        players_list.append(data)
    
    print(players_list)
    return jsonify(players_list)

@app.route('/api/player/<string:name>', methods=['GET'])
def get_players_name(name):
    """
    Retrieve a list of data for the players containing the string passed in parameter in their name. (data is the same as in the 'get_player' route)
    """
    regex_pattern = re.compile(name, re.IGNORECASE)
    query = {"long_name:string": {"$regex": regex_pattern}}
    players = database_players(query)[:30]
    players_list = []
    for player in players:
        data = {"player_id": player["player_id:int32"], "player_url": player["player_url:string"], "short_name": player["short_name:string"], "long_name": player["long_name:string"], "player_positions": player["player_positions:string"], "overall": player["overall:int32"], "potential": player["potential:int32"], "age": player["age:int32"], "dob": player["dob:date"], "height_cm": player["height_cm:int32"], "weight_kg": player["weight_kg:int32"], "club_team_id": player["club_team_id:int32"], "club_name": player["club_name:string"], "league_id": player["league_id:int32"], "league_name": player["league_name:string"], "league_level": player["league_level:int32"], "club_jersey_number": player["club_jersey_number:int32"], "club_joined_date": player["club_joined_date:date"], "nationality_id": player["nationality_id:int32"], "nationality_name": player["nationality_name:string"], "nation_team_id": player["nation_team_id:int32"], "preferred_foot": player["preferred_foot:string"], "weak_foot": player["weak_foot:int32"], "skill_moves": player["skill_moves:int32"], "international_reputation": player["international_reputation:int32"], "work_rate": player["work_rate:string"], "pace": player["pace:int32"], "shooting": player["shooting:int32"], "passing": player["passing:int32"], "dribbling": player["dribbling:int32"], "defending": player["defending:int32"], "physic": player["physic:int32"]}
        players_list.append(data)
        print(data, "\n\n\n")
    return jsonify(players_list)

@app.route('/api/player/<int:id>', methods=['GET'])
def get_player(id):
    """
    Retrieve and return data for a specific player.

    Returns:
        dict: A dictionary containing player information with the following keys:
        - player_id (int): The ID of the player.
        - player_url (str): The URL of the player.
        - short_name (str): The short name of the player.
        - long_name (str): The long name of the player.
        - player_positions (str): The positions played by the player.
        - overall (int): The overall rating of the player.
        - potential (int): The potential rating of the player.
        - age (int): The age of the player.
        - dob (date): The date of birth of the player.
        - height_cm (int): The height of the player in centimeters.
        - weight_kg (int): The weight of the player in kilograms.
        - club_team_id (int): The ID of the player's club team.
        - club_name (str): The name of the player's club.
        - league_id (int): The ID of the league the player's club belongs to.
        - league_name (str): The name of the league.
        - league_level (int): The level of the league.
        - club_jersey_number (int): The jersey number of the player in the club.
        - club_joined_date (date): The date when the player joined the club.
        - nationality_id (int): The ID of the player's nationality.
        - nationality_name (str): The name of the nationality.
        - nation_team_id (int): The ID of the player's national team.
        - preferred_foot (str): The preferred foot of the player.
        - weak_foot (int): The weak foot rating of the player.
        - skill_moves (int): The skill moves rating of the player.
        - international_reputation (int): The international reputation of the player.
        - work_rate (str): The work rate of the player.
        - pace (int): The pace rating of the player.
        - shooting (int): The shooting rating of the player.
        - passing (int): The passing rating of the player.
        - dribbling (int): The dribbling rating of the player.
        - defending (int): The defending rating of the player.
        - physic (int): The physic rating of the player.
    """
    player = database_players({"player_id:int32": id})[0]
    data = {"player_id": player["player_id:int32"], "player_url": player["player_url:string"], "short_name": player["short_name:string"], "long_name": player["long_name:string"], "player_positions": player["player_positions:string"], "overall": player["overall:int32"], "potential": player["potential:int32"], "age": player["age:int32"], "dob": player["dob:date"], "height_cm": player["height_cm:int32"], "weight_kg": player["weight_kg:int32"], "club_team_id": player["club_team_id:int32"], "club_name": player["club_name:string"], "league_id": player["league_id:int32"], "league_name": player["league_name:string"], "league_level": player["league_level:int32"], "club_jersey_number": player["club_jersey_number:int32"], "club_joined_date": player["club_joined_date:date"], "nationality_id": player["nationality_id:int32"], "nationality_name": player["nationality_name:string"], "nation_team_id": player["nation_team_id:int32"], "preferred_foot": player["preferred_foot:string"], "weak_foot": player["weak_foot:int32"], "skill_moves": player["skill_moves:int32"], "international_reputation": player["international_reputation:int32"], "work_rate": player["work_rate:string"], "pace": player["pace:int32"], "shooting": player["shooting:int32"], "passing": player["passing:int32"], "dribbling": player["dribbling:int32"], "defending": player["defending:int32"], "physic": player["physic:int32"]}
    print(data)
    return jsonify(data)

@app.route('/api/team/<int:id>', methods=['GET'])
def get_team(id):
    """
    Retrieve and return data for a specific team.

    Returns:
        dict: A dictionary containing team information with the following keys:
        - team_id (int): The ID of the team.
        - team_url (str): The URL of the team.
        - team_name (str): The name of the team.
        - league_id (int): The ID of the league the team belongs to.
        - league_name (str): The name of the league.
        - league_level (int): The level of the league.
        - nationality_id (int): The ID of the team's nationality.
        - nationality_name (str): The name of the nationality.
        - overall (int): The overall rating of the team.
        - starting_xi_average_age (int): The average age of the starting XI players.
    """
    team = database_teams({"team_id:int32": id})[0]
    data = {"team_id": team["team_id:int32"], "team_url": team["team_url:string"], "team_name": team["team_name:string"], "league_id": team["league_id:int32"], "league_name": team["league_name:string"], "league_level": team["league_level:int32"], "nationality_id": team["nationality_id:int32"], "nationality_name": team["nationality_name:string"], "overall": team["overall:int32"], "starting_xi_average_age": team["starting_xi_average_age:int32"], "logo_url": team["logo_url:string"]}
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)