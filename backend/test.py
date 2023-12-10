from DatabaseSource import help_functions
import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
print(dotenv_path)

connection = None
print("Connecting to db from outside main")
connection = mysql.connector.connect(host=os.getenv("HOST"), user=os.getenv(
    "MYSQL_USER"), passwd=os.getenv("MYSQL_PASSWORD"), database=os.getenv("DB_NAME"))

if connection.is_connected():
    print("MySQL Database connection successful")
