# The Food App

A mobile web-app that lets users create, read, update, and delete restaurant reviews.

View a working demo [here](https://the-django-food-app.herokuapp.com/) (ongoing bug fixes). Best viewed on mobile or in a browser with a mobile viewport. 

This app uses a react frontend and django backend for all CRUD operations. Django provides exposed 
endpoints using [django rest framework](https://www.django-rest-framework.org/) and handles 
authentication using [simple_jwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
to create and blacklist refresh tokens (via http only cookies) and access tokens (via memory).

The app also utilizes the [react-spring](https://react-spring.dev/) library for site-wide animations. 

