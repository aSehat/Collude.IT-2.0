# SoftDev-Group3
Collude.IT 2.0

Docker Setup:
  1. Download [this Dockerfile](https://github.com/aSehat/SoftDev-Group3/blob/documentation-readme/Dockerfile) locally (Docker can be downloaded [here](https://docs.docker.com/get-docker/))
  2. Run `docker build -t collude-app .` in the same directory as the Dockerfile
  3. Run `docker run -p 3000:3000 collude-app`

Setup and Run:
  1. Run the 'npm install' command in the /Application directory
  2. Run the 'npm install' command in the /client directory
  3. Check email for invite link to mongoDB > Join Atlas Organization
    * Add IP address to whitelist via MongoDB dashboard > Security > Network Access > Add IP Address
  4. Run the 'npm run dev' command in the /Application directory to start both backend and frontend servers
  5. Visit http://localhost:3000/ in the browser if it doesn't automatically launch

Stable API routes found in /Postman directory
'Readme.txt' files found in most file directories
