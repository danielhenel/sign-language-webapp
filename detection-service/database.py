from pymongo import MongoClient

DB_URL =  # MONGODB CONNECTION STRING

client = MongoClient(DB_URL)
db = client.signlng
users = db.users
records = db.records

class User:
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
    
    def to_json(self):
        return { 
            "_id" : self.username,
            "password" : self.password,
            "email" : self.email
        }

class Record:
    def __init__(self, username, points):
        self.username = username
        self.points = points

    def to_json(self):
        return { 
            "_id" : self.username,
            "points" : self.points
        }