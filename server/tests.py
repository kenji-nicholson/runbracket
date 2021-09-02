from app import create_app
from pprint import pprint
from app.models import *
from app.api.schemas import *
from app import db

if __name__ == '__main__':
    app = create_app()
    app_context = app.app_context()
    app_context.push()
    db.create_all()

    # tournament = Tournament(tournament_name="Test", tournament_id=1)
    # participant_a = Participant(participant_id=1, participant_name="A", tournament_id=1)
    # participant_b = Participant(participant_id=2, participant_name="B", tournament_id=1)
    # match = Match(match_id=1, participant_a_id=1, participant_b_id=2, tournament_id=1)
    # db.session.add(tournament)
    # db.session.add(participant_a)
    # db.session.add(participant_b)
    # db.session.add(match)
    # db.session.commit()
    # match_schema = MatchSchema(many=True)
    # matches = Match.query.all()
    # pprint(match_schema.dump(matches))
    tournament_schema = TournamentInfoSchema()
    tournament = {}
    tournament2 = tournament_schema.load(tournament)
    pprint(tournament_schema.dump(tournament2))
