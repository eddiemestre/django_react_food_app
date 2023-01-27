# The Food App - OLD VERSION

For the latest version, see [here](https://github.com/eddiemestre/foodapp-aws). This backend uses django whereas the latest uses AWS.

A mobile web-app that lets users create, read, update, and delete restaurant reviews.

This app uses a react frontend and django backend for all CRUD operations. Django provides exposed 
endpoints using [django rest framework](https://www.django-rest-framework.org/) and handles 
authentication using [simple_jwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
to create and blacklist refresh tokens (via http only cookies) and access tokens (via memory).

The app also utilizes the [react-spring](https://react-spring.dev/) library for site-wide animations. 

