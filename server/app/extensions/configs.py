HOSTNAME = '127.0.0.1'
DATABASE = 'remote_sense'
PORT = 3306
USERNAME = 'root'
PASSWORD = 'checheqvq1208.'


class config():
    DB_URL = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
    SQLALCHEMY_DATABASE_URI = DB_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False