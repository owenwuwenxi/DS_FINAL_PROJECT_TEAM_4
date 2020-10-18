FROM php:7.4-apache

LABEL maintainer="Team 4"

COPY app /srv/app

COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

