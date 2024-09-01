from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/second')
def second_page():
    return render_template('second_page.html')

@app.route('/headers')
def headers():
    headers = dict(request.headers)
    headers_str = "<br>".join([f"{key}: {value}" for key, value in headers.items()])
    return f"<h1>HTTP Request Headers</h1><p>{headers_str}</p>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

