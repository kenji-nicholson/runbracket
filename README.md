# RunBracket
Deployed at https://runbracket.herokuapp.com

# Usage
To run: `python3 pp3.py`

## Features
- User registration and login using JSON web tokens between front and back end
- Persistent login using redux-persist and refresh JWTs.
- Utilizes MUI to provide dark mode in user settings page
- Tournament creation algorithm handles single elimination tournaments
- Supports seeded and unseeded tournaments.
- Users can update brackets with scores and winners
- Includes additional "Thug Finals" feature where after what would be the final round, a bonus round occurs and a random participant is selected to face the tournament winner.

## Tech Stack
- Languages: Python, JavaScript, HTML, CSS
- Frameworks: ReactJS + Redux (Front-End), Python Flask (Back-End)
- Database: PostgreSQL
