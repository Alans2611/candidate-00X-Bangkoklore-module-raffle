from .db import db

class submit_lore(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(100), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    bodytext = db.Column(db.String(1000), nullable = False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    def to_dict(self):
        return{
            'id':self.id,
            'name': self.name,
            'email':self.email,
            'title':self.title,
            'bodytext':self.bodytext,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }