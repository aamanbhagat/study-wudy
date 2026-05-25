## What it is
Docker is a platform for developing, shipping, and running applications in isolated environments called **containers**. It packages an application and all its dependencies—libraries, system tools, code, and runtime—into a single unit. This unit is portable and runs consistently on any machine that has Docker installed, regardless of the underlying operating system.

## Why it matters
Reproducibility is non-negotiable in science and engineering. Docker guarantees that a simulation, data analysis pipeline, or machine learning model runs in the exact same software environment every time, for everyone. In aerospace, it's used to create consistent test environments for flight software, and in ML, it's the standard for packaging and deploying trained models into production, ensuring the server environment perfectly matches the training environment.

## When to study it
Before tackling Docker, you should be comfortable with the command line (specifically Unix/Linux commands like `ls`, `cd`, `cp`, `rm`). You must understand the concept of software dependencies (e.g., what a `requirements.txt` file in Python or a `package.json` in Node.js does). A basic understanding of networking concepts like ports and IP addresses is also essential.

## How to study it (step by step)
1.  **Install Docker Desktop** on your machine. Open a terminal and run `docker run hello-world`. This command will download a tiny image and run it in a container, printing a confirmation message. This verifies your installation and demonstrates the fundamental Docker workflow.
2.  **Interact with a pre-built image.** Run `docker run -d -p 8080:80 nginx`. This pulls the official Nginx web server image and runs it in a detached (`-d`) container, mapping port `8080` on your machine to port `80` in the container. Visit `http://localhost:8080` in your browser. Use `docker ps` to see your running container and `docker stop <container_id>` to stop it.
3.  **Create your first `Dockerfile`.** Make a new directory. Inside, create a simple Python web app in a file named `app.py` (e.g., using the Flask framework). Create a `Dockerfile` in the same directory that specifies the instructions to build an image for this app.
4.  **Build and tag your image.** From your terminal, in the directory with your `Dockerfile`, run `docker build -t my-first-app .`. The `-t` flag tags your image with a human-readable name. The `.` tells Docker to use the current directory as the build context.
5.  **Run your custom image.** Execute `docker run -p 5000:5000 my-first-app`. This starts a container from the image you just built. You can now access your Python app in your browser.
6.  **Orchestrate with `docker-compose`.** Create a `docker-compose.yml` file. Define two services in this file: your web app and a database (e.g., `redis`). This YAML file declaratively defines a multi-container application.
7.  **Launch the orchestrated application.** Run `docker-compose up`. Docker will read your file, build any custom images, and start containers for all defined services, connecting them on a dedicated network. Use `docker-compose down` to stop and remove everything.

## Key ideas, with intuition
1.  **Image vs. Container: Blueprint vs. Building.** An **Image** is a read-only blueprint. It's a static, inert template containing the application and all its dependencies. A **Container** is a live, running instance of an image. You can create many containers from a single image, just as you can build many identical houses from one blueprint.
    $$
    \text{Image} \xrightarrow{\text{docker run}} \text{Container}
    $$

2.  **Layered Filesystem: Transparent Overlays.** A Docker image is not a single monolithic file. It's composed of multiple read-only layers stacked on top of each other. Each instruction in a `Dockerfile` (e.g., `RUN apt-get install ...`) creates a new layer. When you run a container, Docker adds a thin, writable layer on top. This is extremely efficient. When you change your source code, Docker only rebuilds the final layers, reusing the unchanged, cached layers from previous builds.

3.  **Isolation without Virtualization: Sharing the Kernel.** A Virtual Machine (VM) emulates hardware and runs a complete, independent guest operating system. This is heavy. A Docker container does *not* run its own OS kernel. Instead, it runs as an isolated process on the host machine's kernel. Docker uses kernel features (namespaces and cgroups) to give the container its own private view of the filesystem, processes, and network. This makes containers incredibly lightweight and fast to start.

4.  **Dockerfile & Docker Compose: Declarative Infrastructure.** A `Dockerfile` is a recipe for building a single image. You declare the steps: start `FROM` a base image, `COPY` your files, `RUN` some commands, and define the `CMD` to execute on start. `docker-compose.yml` is a recipe for a multi-container application. You declare the `services` (e.g., `webapp`, `database`), their images, ports, and dependencies. This declarative approach is powerful because you specify the desired *end state*, and Docker handles the imperative steps to get there.

## Worked example
Let's containerize a simple Python Flask web app.

**1. Project Structure:**
```text
/my-flask-app
├── app.py
├── requirements.txt
└── Dockerfile
```

**2. File Contents:**

`app.py`:
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Docker!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

`requirements.txt`:
```
Flask==2.1.2
```

`Dockerfile`:
```dockerfile
# 1. Start from an official Python base image
FROM python:3.9-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy dependency list and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the rest of the application code
COPY . .

# 5. Expose the port the app runs on
EXPOSE 5000

# 6. Define the command to run the application
CMD ["python", "app.py"]
```

**3. Build and Run Commands:**

In your terminal, inside the `/my-flask-app` directory:

```bash
# Build the image and tag it as 'flask-app'
$ docker build -t flask-app .

# Run a container from the image
# Map host port 5000 to container port 5000
$ docker run -p 5000:5000 flask-app
```

Now, navigate to `http://localhost:5000` in your web browser. You will see "Hello from Docker!".

**Reflection on why this works:**
-   `FROM` provided a minimal OS with Python pre-installed, so we didn't have to configure it from scratch.
-   `WORKDIR` ensured all subsequent commands (`COPY`, `RUN`) happened in a clean `/app` directory inside the container, not scattered across the filesystem.
-   Copying `requirements.txt` first and running `pip install` before copying the rest of the code is a crucial optimization. If we only change `app.py`, Docker uses the cached layer for the `pip install` step, making subsequent builds much faster.
-   `CMD` tells the container what process to start when it's launched. `host='0.0.0.0'` is critical for the server to be accessible from outside the container.
-   `docker run -p 5000:5000` connected the isolated network inside the container to your machine's network, allowing your browser to reach the Flask app.

## Diagrams
**VM vs. Container Architecture**
```text
        VIRTUAL MACHINE                            CONTAINER
+-----------------------------+      +------------------------------------+
|        App A | Bins/Libs    |      | App A | Bins/Libs | App B | Bins/Libs|
+-----------------------------+      +------------------------------------+
|          Guest OS           |      |             Containerd             |
+-----------------------------+      +------------------------------------+
|          Hypervisor         |      |           DOCKER ENGINE            |
+-----------------------------+      +------------------------------------+
|           HOST OS           |      |              HOST OS               |
+-----------------------------+      +------------------------------------+
|          HARDWARE           |      |             HARDWARE               |
+-----------------------------+      +------------------------------------+
```
*Observation: Containers share the host OS kernel, making them lighter and more efficient than VMs, which require a full guest OS for each application.*

**Docker Image Layers**
```text
+-----------------------------------+
|      Container (Writable Layer)   |  <-- Created when you run `docker run`
+-----------------------------------+
| CMD ["python", "app.py"] (Layer N)  |  <-- Read-only image layers
+-----------------------------------+
| COPY . . (Layer N-1)              |
+-----------------------------------+
| RUN pip install ... (Layer N-2)   |
+-----------------------------------+
| FROM python:3.9-slim (Base Layer) |
+-----------------------------------+
```
*Observation: Each instruction in the Dockerfile adds a read-only layer. Changes only affect the top-most layers, enabling efficient caching and storage.*

## Memory technique — remember this forever
1.  **The Restaurant Kitchen Analogy:**
    *   **`Dockerfile`**: A detailed **Recipe** for a dish.
    *   **`Image`**: A pre-packaged, vacuum-sealed **Meal Kit**. It's created from the recipe, is read-only, and contains all necessary ingredients.
    *   **`Container`**: A chef **Cooking and Serving** the dish. It's a running instance of the meal kit. You can make many identical dishes (containers) from one meal kit (image).
    *   **`docker-compose`**: The head chef's **Menu Plan**. It coordinates multiple chefs (containers) to prepare different dishes (services like a web app, database, cache) that must be served together as a complete meal.

2.  **Overlearn these definitions:**
    *   **Image**: A read-only template used to create containers.
    *   **Container**: A runnable instance of an image.
    *   **Dockerfile**: A text file with instructions for building a Docker image.

3.  **Spaced Repetition Schedule:** Review this material at: **1 day, 3 days, 7 days, 16 days, 35 days**. Actively try to rebuild the worked example from memory on each review day.

4.  **First Principles Pathway:** If you forget the `Dockerfile` syntax, reason from the goal: "I need to package my app to run anywhere."
    *   What's the absolute minimum I need? A base system. -> `FROM`
    *   Where should my code live inside it? In a dedicated folder. -> `WORKDIR`
    *   How do I get my code in there? Copy it. -> `COPY`
    *   Does my code have dependencies? Yes, I need to install them. -> `RUN`
    *   How do I start the app? By running a command. -> `CMD`

## Common mistakes
1.  **Ignoring `.dockerignore`:** Your build context (`.` in `docker build .`) sends all files in the directory to the Docker daemon. If you don't have a `.dockerignore` file, you might send gigabytes of unnecessary data (like local `venv` folders, build artifacts, or `.git` history), making builds slow and images bloated.
2.  **Confusing `RUN`, `CMD`, and `ENTRYPOINT`:**
    *   `RUN` executes a command *at build time* to create a layer (e.g., installing packages).
    *   `CMD` provides the *default command* to run when a container starts. It can be easily overridden from the command line (e.g., `docker run my-app ls -l`).
    *   `ENTRYPOINT` configures a container to run as an executable. It's harder to override and is used when you want the container to always behave like a specific command.
3.  **Re-installing dependencies on every build:** Placing `COPY . .` before `RUN pip install -r requirements.txt` is a common performance mistake. Any change to any file will invalidate the cache for the `COPY` layer and all subsequent layers, forcing dependencies to be re-installed every single time. The correct order is to copy only the dependency file, install, then copy the rest of the code.

## Self-check
1.  Write a `Dockerfile` for a simple "Hello World" Node.js application that uses the Express framework.
2.  Your Python `Dockerfile` build is slow. You notice that `RUN pip install ...` is executed every time you change a single comment in your `app.py` source code. How would you restructure the `Dockerfile` to leverage layer caching and fix this?
3.  Write a `docker-compose.yml` file that defines two services: a `frontend` service using an `nginx` image to serve static HTML files from a local `./html` directory, and a `backend` service using the `flask-app` image you built in the worked example. How would you configure Nginx to proxy requests from `/api` to the backend service, using only Docker's internal networking?