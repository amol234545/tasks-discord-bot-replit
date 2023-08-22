import os
try:
  my_secret = os.environ['is_fork']
except KeyError:
  print("--- Test Mode ---")
  token = input("Enter your discord token: ")
  