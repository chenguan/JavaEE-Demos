#!/usr/bin/env bash

mvn clean -U package
mvn tomcat7:run