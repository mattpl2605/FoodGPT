from flask import Flask, request, jsonify
import csv
import openai

app = Flask(__name__)

openai.api_key = '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'

def calculate_bmr(weight, height, age, gender):
    if gender.lower() == 'male':
        return 10 * weight + 6.25 * height - 5 * age + 5
    elif gender.lower() == 'female':
        return 10 * weight + 6.25 * height - 5 * age - 161
    else:
        raise ValueError("Invalid gender")

def calculate_tdee(bmr, activity_level):
    activity_factors = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9
    }

    return bmr * activity_factors.get(activity_level, 1.2)

def calculate_macros(tdee, goal):
    macros = {
        'lose weight': {'carbs': 0.10, 'protein': 0.50, 'fat': 0.40},
        'maintain weight': {'carbs': 0.40, 'protein': 0.30, 'fat': 0.30},
        'gain muscle': {'carbs': 0.50, 'protein': 0.30, 'fat': 0.20}
    }

    selected_macros = macros.get(goal, macros['maintain weight'])

    return {
        'carbs_grams': (tdee * selected_macros['carbs']) / 4,
        'protein_grams': (tdee * selected_macros['protein']) / 4,
        'fat_grams': (tdee * selected_macros['fat']) / 9
    }


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    weight = data.get('weight')
    height = data.get('height')
    age = data.get('age')
    gender = data.get('gender')
    activity_level = data.get('activity_level')
    goal = data.get('goal')

    try:
        bmr = calculate_bmr(weight, height, age, gender)
        tdee = calculate_tdee(bmr, activity_level)
        macros = calculate_macros(tdee, goal)
    except (ValueError, TypeError) as e:
        return jsonify({'error': str(e)}), 400

    return jsonify({
        'BMR': bmr,
        'TDEE': tdee,
        'Macros': macros
    })

if __name__ == '__main__':
    app.run(debug=True)