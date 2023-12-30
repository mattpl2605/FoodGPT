from flask import Flask, request, jsonify
import csv
import openai
import io

app = Flask(__name__)



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

def write_csv(csv_content, filename):
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        for row in csv_content:
            writer.writerow(row)

def generate_meal_plan(bmr, tdee, macros, preferences, allergies):
    openai.api_key = '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'

    # Prompt engineering
    prompt = (
        f"I want you to act as my personal nutritionist. I will tell you about my dietary preferences, allergies, my basal metabolic rate, total daily energy expenditure, and macro split, and you will suggest a one-week meal plan specifying food of each day for me to try that will cause me to reach my target and satisfy my calories. You should only reply with the meal plan you recommend, including the quantities and the nutritional facts of each meal, and nothing else.\n\n"
        f"The meal plan should be output in the format of a csv. In the table you must output the following columns with the same exact names without any modifications: Day, Meal, Calories, Food, Quantity, Carbs, Fats, Protein. Make sure to provide the meal plan for the whole week and not just one day. Don't return any row with empty values.\n\n"
        f"Here are some constraints and penalties for this task:\n\n"
        f"- If the total calories for any day are too high or too low according to the criteria based on the person's input goal then deduct 10 points from your final score.\n"
        f"- If any row has empty values then deduct 5 points from your final score.\n"
        f"- If any column name is modified then deduct 5 points from your final score.\n\n"
        f"Your final score should be as high as possible. My first request is: 'basal metabolic rate: {bmr}; Preferences: {preferences}; Allergies: {allergies}; total daily energy expenditure: {tdee}; Macros: {macros} weight.'")

    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=2000
    )

    csv_content = response['choices'][0]['message']['content']

    csv_reader = csv.reader(io.StringIO(csv_content))
    parsed_csv = list(csv_reader)

    write_csv(parsed_csv, 'meal_plan.csv')

    return 'Meal plan generated successfully'

def generate_recipe(food_item, quantity):
    prompt = f"""
        I want you to act as my personal chef. 
        I will tell you about a meal with its quantities, and you will tell me the exact recipe for me to cook it.
        You should only reply with the recipe, and nothing else. The recipe should include the exact ingredients needed and a numbered list of steps to follow. 
        Do not write explanations. My first request is {food_item}. Quantity: {quantity}
        """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000
    )

    return response['choices'][0]['message']['content']


@app.route('/generate-meal-plan-and-recipes', methods=['POST'])
def meal_plan_and_recipes():
    data = request.json
    try:
        bmr = calculate_bmr(data['weight'], data['height'], data['age'], data['gender'])
        tdee = calculate_tdee(bmr, data['activity_level'])
        macros = calculate_macros(tdee, data['goal'])
        preferences = data.get('preferences', '')
        allergies = data.get('allergies', '')

        meal_plan = generate_meal_plan(bmr, tdee, macros, preferences, allergies)

        with open('meal_plan.csv', 'r') as file:
            reader = csv.reader(file)
            next(reader)
            recipes = {}
            for row in reader:
                food_item = row[3]
                quantity = row[4]
                if food_item and food_item not in recipes:
                    recipes[food_item] = generate_recipe(food_item, quantity)
    except (ValueError, TypeError, KeyError) as e:
        return jsonify({'error': str(e)}), 400

    return jsonify({'meal_plan': meal_plan, 'recipes': recipes})

if __name__ == '__main__':
    app.run(debug=True)