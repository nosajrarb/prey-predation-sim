from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/simulate', methods=['POST'])
def simulate():
    alpha = float(request.form['alpha'])
    beta = float(request.form['beta'])
    gamma = float(request.form['gamma'])
    delta = float(request.form['delta'])
    x0 = int(request.form['x0'])
    y0 = int(request.form['y0'])

    t_max = 200
    dt = 0.1
    time = np.arange(0, t_max, dt)

    prey = np.zeros(len(time))
    predator = np.zeros(len(time))

    prey[0] = x0
    predator[0] = y0

    for t in range(1, len(time)):
        dx = (alpha * prey[t-1] - beta * prey[t-1] * predator[t-1]) * dt
        dy = (delta * prey[t-1] * predator[t-1] - gamma * predator[t-1]) * dt
        prey[t] = prey[t-1] + dx
        predator[t] = predator[t-1] + dy

    result = {
        'time': time.tolist(),
        'prey': prey.tolist(),
        'predator': predator.tolist()
    }
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)


