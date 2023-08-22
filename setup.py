import os
my_secret = os.environ['is_fork']
if my_secret:
  os.system("./repl.deploy node index.js")