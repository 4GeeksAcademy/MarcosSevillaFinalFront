"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Comments, Medias, CharacterFavorites, PlanetFavorites, Planets, Characters
from datetime import datetime
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


# CRUD de los Users
@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = "Listado de usuarios" 
        response_body['results'] = result
        return response_body, 200
    
@api.route('/user/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    response_body = {}
    user = db.session.get(Users, id)   
    if not user:
        response_body['message'] = 'Usuario no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        user.first_name = data.get("first_name", user.first_name)
        user.last_name = data.get("last_name", user.last_name)
        user.email = data.get("email", user.email)
        user.phone = data.get("phone", user.phone)
        user.is_active = data.get("is_active", user.is_active)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        return response_body, 200


# CRUD de los Comments
@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        list_comments = [row.serialize() for row in rows]
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = list_comments  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_comment = Comments(
            body=data.get("body"),
            user_id=data.get("user_id"),
            post_id=data.get("post_id"))
        db.session.add(new_comment)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = new_comment.serialize()
        return response_body, 201

@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    comment = db.session.get(Comments, id)   
    if not comment:
        response_body['message'] = 'Comentario no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = comment.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        comment.body = data.get("body", comment.body)
        comment.user_id = data.get("user_id", comment.user_id)
        comment.post_id = data.get("post_id", comment.post_id)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = comment.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        return response_body, 200


#Todos los comments de un post
@api.route('/posts/<int:post_id>/comments', methods=['GET'])
def post_comments(post_id):
    response_body = {}
    post_comments = db.session.execute(db.select(Comments).where(Comments.post_id == post_id)).scalars()
    list_comments = [comment.serialize() for comment in post_comments]
    response_body['message'] = f'Todos los comentarios de un post con id {post_id}'
    response_body['results'] = list_comments
    return response_body, 200


# Todos los comentarios de un usuario
@api.route('/users/<int:user_id>/comments', methods=['GET'])
def user_comments(user_id):
    response_body = {}
    #logica para acceder a los datos de mi DB
    user_comments = db.session.execute(db.select(Comments).where(Comments.user_id == user_id)).scalars()
    list_comments = [comment.serialize() for comment in user_comments]
    response_body['message'] = f'Todos los comentarios del usuario con id {user_id}'
    response_body['results'] = list_comments
    return response_body, 200


# CRUD de los Media
@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        list_medias = [row.serialize() for row in rows]
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = list_medias  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_media = Medias(
            media_type=data.get("media_type"),
            image_url=data.get("image_url"),
            post_id=data.get("post_id"))
        db.session.add(new_media)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = new_media.serialize()
        return response_body, 201

@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    media = db.session.get(Medias, id)   
    if not media:
        response_body['message'] = 'Media no encontrada'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = media.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        media.media_type = data.get("media_type", media.media_type)
        media.image_url = data.get("image_url", media.image_url)
        """
        Media.post_id = data.get("post_id", media.post_id)
        No se debe permitir
        """
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = media.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(media)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        return response_body, 200


# CRUD de los FavotirosPlanets
@api.route('/planetfavorites', methods=['GET', 'POST'])
def planet_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites)).scalars()
        list_favorites = [row.serialize() for row in rows]
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = list_favorites  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_favorite = PlanetFavorites(
            user_id=data.get("user_id"),
            planet_id=data.get("planet_id"))
        db.session.add(new_favorite)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = new_favorite.serialize()
        return response_body, 201

@api.route('/planetfavorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet_favorite(id):
    response_body = {}
    favorite = db.session.get(PlanetFavorites, id)  
    if not favorite:
        response_body['message'] = 'Favorito no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = favorite.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        favorite.user_id = data.get("user_id", favorite.user_id)
        favorite.planet_id = data.get("planet_id", favorite.planet_id)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = favorite.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(favorite)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        return response_body, 200


# CRUD de los FavotirosCharacters
@api.route('/characterfavorites', methods=['GET', 'POST'])
def favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        list_favorites = [row.serialize() for row in rows]
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = list_favorites  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_favorite = CharacterFavorites(
            user_id=data.get("user_id"),
            character_id=data.get("character_id"))
        db.session.add(new_favorite)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = new_favorite.serialize()
        return response_body, 201
    
@api.route('/characterfavorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def favorite(id):
    response_body = {}
    favorite = db.session.get(CharacterFavorites, id)  
    if not favorite:
        response_body['message'] = 'Favorito no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = favorite.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        favorite.user_id = data.get("user_id", favorite.user_id)
        favorite.character_id = data.get("character_id", favorite.character_id)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = favorite.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(favorite)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        return response_body, 200


# CRUD de los Posts
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        list_post = [row.serialize() for row in rows]
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = list_post  
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_post = Posts(
            title=data.get("title"),
            description=data.get("description"),
            body=data.get("body"),
            date=datetime.strptime(data["date"], '%Y-%m-%d %H:%M:%S') if "date" in data else datetime.utcnow(),
            image_url=data.get("image_url"),
            user_id=data.get("user_id"))
        db.session.add(new_post)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method}'
        response_body['results'] = new_post.serialize()
        return response_body, 201

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    post = db.session.get(Posts, id)
    if not post:
        response_body['message'] = 'Post no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = post.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        post.title = data.get("title", post.title)
        post.description = data.get("description", post.description)
        post.body = data.get("body", post.body)
        post.date = data.get("date", post.date)  # Asegurar que la fecha sea correcta
        post.image_url = data.get("image_url", post.image_url)
        post.user_id = data.get("user_id", post.user_id)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        response_body['results'] = post.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        response_body['message'] = f'Respuesta desde {request.method} para el id: {id}'
        return response_body, 200


# Todos los posts de un usuario
@api.route('/users/<int:user_id>/posts', methods=['GET'])
def users_posts(user_id):
    response_body = {}
    # Logica para acceder a mi DB
    user_posts = db.session.execute(db.select(Posts).where(Posts.user_id == user_id)).scalars()
    list_posts = [post.serialize() for post in user_posts]
    response_body['message'] = f'Todos los posts del usuario con id {user_id}'
    response_body['results'] = list_posts
    return response_body, 200


# Api externa Planets
@api.route('/api/planets/import', methods=['GET'])
def import_planets():
    response = requests.get("https://swapi.tech/api/planets/")  
    if response.status_code != 200:
        return jsonify({"message": "Error al obtener planetas"}), 400
    data = response.json()
    planets = []
    for planet in data["results"]:
        planet_detail = requests.get(planet["url"]).json()["result"]["properties"]   
        new_planet = Planets(
            name=planet_detail["name"],
            diameter=planet_detail.get("diameter"),
            rotation_period=planet_detail.get("rotation_period"),
            orbital_period=planet_detail.get("orbital_period"),
            gravity=planet_detail.get("gravity"),
            population=planet_detail.get("population"),
            climate=planet_detail.get("climate"),
            terrain=planet_detail.get("terrain"))
        db.session.add(new_planet)
        planets.append({
            "name": planet_detail["name"],
            "diameter": planet_detail.get("diameter"),
            "rotation_period": planet_detail.get("rotation_period"),
            "orbital_period": planet_detail.get("orbital_period"),
            "gravity": planet_detail.get("gravity"),
            "population": planet_detail.get("population"),
            "climate": planet_detail.get("climate"),
            "terrain": planet_detail.get("terrain")})
        db.session.commit()
    return jsonify({"message": "Planetas importados exitosamente", "results": planets}), 200

@api.route('/planets')
def get_planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets/'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['results'] = data
        return response_body, 200


# Api externa Characters
@api.route('/api/characters/import', methods=['GET'])
def import_characters():
    url = "https://swapi.tech/api/people/"
    characters = []
    
    while url:  # Recorre todas las páginas de la API externa
        response = requests.get(url)
        if response.status_code != 200:
            return jsonify({"message": "Error al obtener personajes"}), 400
        data = response.json()
        
        for character in data["results"]:
            character_detail = requests.get(character["url"]).json()["result"]["properties"]
            
            new_character = Characters(
                name=character_detail["name"],
                height=character_detail.get("height"),
                mass=character_detail.get("mass"),
                hair_dolor=character_detail.get("hair_color"),
                skin_color=character_detail.get("skin_color"),
                eye_color=character_detail.get("eye_color"),
                birth_year=character_detail.get("birth_year"),
                gender=character_detail.get("gender"))
            
            db.session.add(new_character)
            
            characters.append({
                "name": character_detail["name"],
                "height": character_detail.get("height"),
                "mass": character_detail.get("mass"),
                "hair_dolor": character_detail.get("hair_color"),
                "skin_color": character_detail.get("skin_color"),
                "eye_color": character_detail.get("eye_color"),
                "birth_year": character_detail.get("birth_year"),
                "gender": character_detail.get("gender")})

        url = data.get("next")  

    db.session.commit()  # ✅ Guardamos los personajes en la BD **después del for**
    
    return jsonify({"message": "Personajes importados exitosamente", "results": characters}), 200


@api.route('/characters')
def get_characters():
    response_body = {}
    url = 'https://swapi.tech/api/people/'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['results'] = data
        return response_body, 200
