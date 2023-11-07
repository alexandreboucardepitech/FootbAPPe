import pandas as pd
import gzip

def preprocess_csv(input_file, output_file):
    with gzip.open(input_file, 'rt') as f:
        lines = f.readlines()

    # Filter out lines with more than one field
    cleaned_lines = [line for line in lines if len(line.strip().split(',')) == 1]

    with open(output_file, 'w') as f:
        f.writelines(cleaned_lines)

def read_file():
    preprocess_csv('database/male_players.csv', 'database/cleaned_male_players.csv')
    destinations = pd.read_csv('database/cleaned_male_players.csv')
    print(destinations)

read_file()
