from flask import Flask, abort, jsonify, render_template, request

app = Flask(__name__,  template_folder='webviews', static_folder='static', static_url_path='')

@app.route('/create-user', methods=['POST'])
def create_user():
    password_dict = {}
    user_json = request.get_json()
    username = user_json['username']
    password = user_json['password']
    with open("/tmp/password.txt", 'r') as file_object:
      users = file_object.readlines()
      for user in users:
        current_username, current_password = user.split(',')
        password_dict[current_username] = current_password
        if current_username == username:
          abort ('Username already exists')


@app.route('/login')
def login():
    return None

@app.route('/')
def hello_world():
    return render_template('claim_received.html')

if __name__ == '__main__':
    app.run()
