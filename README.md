# Nowted - Note Taking App

A note taking application with CRUD, Folder Feature, Authentication & Authorization features.

<p align="center"><strong>Login page</strong>. Design from <a href="https://www.figma.com/community/file/1254024318818305187/login-pages-v1-carey">Figma</a> ( Daniel Carey )
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/danggro/nowted/main/document/images/login-page.png" width="640" height="360">
</p>
<p align="center"><strong>Signup page</strong>. Design from <a href="https://www.figma.com/community/file/1254024318818305187/login-pages-v1-carey">Figma</a> ( Daniel Carey )
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/danggro/nowted/main/document/images/signup-page.png" width="640" height="360">
</p>
<p align="center"><strong>Main page</strong>. Design from <a href="https://codedesign.dev/challenge/nowted-app">codedesign.dev</a>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/danggro/nowted/main/document/images/main-page-folder.png" width="640" height="360">
</p>

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [document](#document)

## Project Overview

The project is a note-taking application built using Typescript, React.js, Styled Components, Express.js, Postgres for database, and Redis for session. It incorporates three major features: CRUD Note, Grouping Notes into Folder, Authentication + Authorization.

## Features

- CRUD (Create, Read, Update, & Delete) note
- Authentication & Authorization
- Grouping Notes into Folder

## Technologies

- React.js
- Node.js
- Redux
- Typescript
- Styled Components
- Webpack
- Axios
- Express.js
- Postgres
- Sequelize
- Redis
- Bcrypt
- Umzug
- Nginx
- Docker

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (node-16)
- Docker

### Installation

1. Clone the repository

```bash
git clone https://github.com/danggro/nowted.git
```

2. Go to the project directory and install dependencies for both the frontend and backend

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

3. Build docker image & start application for development

```bash
cd ./frontend
npm install
```

```bash
cd ./backend
npm install
```

> **Note:** In development environment must intall the dependencies because docker container attached with volumes in folder frontend & backend

```bash
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```

4. Build docker image & start application for production

```bash
docker compose build
docker compose up
```

## Usage

### Create New Account

The signup page can be accesses at the /signup route. Fill all input form (username, email, password) with valid value. If success page will navigated to login page

### Login

After user registered in to database, we can login with that username.

### CRUD

#### Create New Note

Click New Note on the left top of the page to show input form. Fill title, date, & content input with valid value then wait 5 second to be saved.

#### Read Note

Click note list on the left page to read your note.

#### Update Note

After specific note is show up it can be changed by click input, change the value, then wait 5 second to be saved.

#### Delete Note

Delete specific note with click 3 dot on the right top of the page and then click delete.

### Folder Feature

#### Create a New Folder

Click button beside title "Folder" to make a new folder then type something to give the folder name or it can be default "New Folder". Create new note when there's no folder yet it will create folder with name "Other" automatically

#### Move into Another Folder

Select another folder in select box note view to move note into another folder

#### Delete a Folder

Click button trash to delete folder. If a folder have note in it, the note will be automatically moved into "Other" folder.

## Deployments

For deploying my application, I use Azure App Service, which allows for straightforward execution of Docker Compose by writing or simply copying the `docker-compose.yml` file from the application to Azure. Then, activate Continous Deployment, for `Azure Container Registry` can be activated directly, but for other registries like `Docker Hub`, it have to manually add Webhook URL to image repository on Docker Hub. But sadly my Azure Trial is expired so I don't have a live demo for this application :(.

## Documents

### PRD ( Product Requirements Document )

- [PRD](https://github.com/danggro/nowted/blob/main/document/PRD/PRD.pdf)
- [MVP - Folder Feature](https://github.com/danggro/nowted/blob/main/document/PRD/Folder%20Feature%20MVP.pdf)

### Technical Design

- [Deployment Diagram](https://github.com/danggro/nowted/blob/main/document/Technical%20Design/Deployment%20Diagram/deployment_diagram.jpg)
- [ERD ( Entity Relationships Diagram )](https://github.com/danggro/nowted/blob/main/document/Technical%20Design/ERD/ERD%20Diagram.jpg)
- [ERD - Folder Feature](https://github.com/danggro/nowted/blob/main/document/Technical%20Design/ERD/ERD%20Folder%20Feature.png)

### API Specification

- [API Specification](https://github.com/danggro/nowted/tree/main/document/API%20Specification)
