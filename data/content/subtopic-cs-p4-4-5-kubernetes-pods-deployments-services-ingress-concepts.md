## What it is
Kubernetes is a container orchestration system for automating the deployment, scaling, and management of applications. Its core components—Pods, Deployments, Services, and Ingress—are abstractions that define how your application runs. A Pod is the smallest deployable unit, a Deployment manages the lifecycle of Pods, a Service provides a stable network endpoint for them, and an Ingress manages external access to those Services.

## Why it matters
This architecture is the de facto standard for running scalable and resilient software in the cloud and on-premise. In aerospace, it's used to manage the complex microservices behind ground control systems and data processing pipelines from satellites. For large-scale physics simulations or distributed machine learning, Kubernetes can manage thousands of containerized jobs, automatically handling failures and scaling resources, which is critical for long-running, computationally intensive tasks.

## When to study it
Before tackling this, you must have a solid grasp of the following. If not, master them first.
1.  **Containers:** You must understand what a container (e.g., Docker) is, how to build a container image, and the concept of container isolation.
2.  **Basic Networking:** You need to know what IP addresses, ports, DNS, and load balancing are.
3.  **Declarative Configuration:** Familiarity with configuration files (like YAML or JSON) that *declare* a desired state, rather than scripting the steps to get there.

## How to study it (step by step)
1.  **Install a local cluster.** Install `minikube` or `kind`. This gives you a single-node Kubernetes cluster on your machine. Start the cluster.
2.  **Run a Pod directly.** Find a simple container image like `nginx`. Write a minimal YAML file for a `Pod` resource and apply it using `kubectl apply -f your-pod.yaml`. Use `kubectl get pods` to see it running and `kubectl delete pod <pod-name>` to destroy it. Notice it's gone for good.
3.  **Create a Deployment.** Write a YAML file for a `Deployment` that specifies the same `nginx` container. Set `replicas: 3`. Apply it. Use `kubectl get deployments` and `kubectl get pods` to see the three pods.
4.  **Test self-healing.** Get the name of one of the pods and manually delete it with `kubectl delete pod <pod-name>`. Immediately run `kubectl get pods -w` (the `-w` is for "watch"). You will see the deleted pod terminating and a new one being created automatically by the Deployment. This demonstrates desired state reconciliation.
5.  **Expose with a Service.** Pods are not accessible from outside the cluster by default. Write a `Service` YAML of type `NodePort`. Use a `selector` that matches the labels on the pods created by your Deployment. Apply it. Find the port it's exposed on and access your `nginx` server in your browser via `http://<minikube-ip>:<node-port>`.
6.  **Expose with Ingress.** Install an Ingress controller into your local cluster (e.g., the NGINX Ingress Controller). Write an `Ingress` YAML that defines a rule to route traffic from a dummy hostname (e.g., `my-nginx.local`) to the Service you just created. Configure your local `/etc/hosts` file to point `my-nginx.local` to your minikube IP. Access it via the hostname.

## Key ideas, with intuition
1.  **Pod: The Atomic Unit.** A Pod is the smallest and simplest unit in the Kubernetes object model that you create or deploy. It represents a single instance of a running process in your cluster. A Pod encapsulates one or more tightly coupled containers, which share storage and network resources (they can communicate via `localhost`). Think of it as a logical host. They are born together and die together.

2.  **Deployment: The Desired State Controller.** You rarely create Pods directly. Instead, you describe a desired state in a `Deployment` object: "I want 3 replicas of my application pod running at all times." The Deployment controller works tirelessly to ensure the current state of the cluster matches your desired state. If a Pod dies, the controller replaces it. This is the essence of declarative infrastructure.
    $$
    \text{Controller Loop: } \textbf{while true} \{ \text{if } (\text{current\_state} \neq \text{desired\_state}) \{ \text{reconcile()} \} \}
    $$

3.  **Service: Stable Network Abstraction.** Pods are ephemeral; they can be destroyed and recreated at any time, receiving a new IP address. This makes direct communication unreliable. A `Service` solves this by providing a stable, virtual IP address and DNS name. It acts as an internal load balancer, discovering pods via labels and forwarding traffic to them. It decouples the "what" (a logical service) from the "where" (the specific pods running it).

4.  **Ingress: The External Gatekeeper.** A Service exposes your application *within* the cluster. An `Ingress` is an API object that manages external access to the services in a cluster, typically HTTP and HTTPS. It acts as a reverse proxy or API gateway, allowing you to define routing rules based on hostnames and paths. For example, route `api.example.com/users` to the `user-service` and `api.example.com/orders` to the `order-service`. An Ingress resource is useless without an Ingress *controller* running to fulfill its rules.

## Worked example
Let's deploy a simple web server with 2 replicas and expose it to the outside world at `hello.world`.

**Step 1: Create the Deployment**
This manifest tells Kubernetes we want a Deployment named `web-server`. It should maintain 2 replicas of Pods. Each Pod is created from a template containing one container, using the `nginx:alpine` image. We label the Pods `app: web`.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
```
*Reflection:* The `selector.matchLabels` in the Deployment spec is crucial. It tells the Deployment which Pods it is responsible for managing. The `template.metadata.labels` ensures that Pods created by this Deployment have the correct label to be selected.

**Step 2: Create the Service**
This manifest creates a Service named `web-service`. It looks for any Pod with the label `app: web` (our Pods from the Deployment) and exposes their port `80` on a single, stable cluster IP address at port `80`.

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```
*Reflection:* The `selector` is the glue that connects the Service to the Pods. The Service doesn't know or care about the Deployment; it only cares about Pods with matching labels. This decoupling is a powerful design pattern.

**Step 3: Create the Ingress**
This manifest creates an Ingress rule. It states that any HTTP traffic for the host `hello.world` on path `/` should be routed to our `web-service` on port `80`.

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - host: "hello.world"
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```
*Reflection:* This final piece connects the outside world to our internal service abstraction. The user hits a hostname, the Ingress controller routes it to the stable Service IP, and the Service load-balances it to one of the healthy Pods.

## Diagrams
Here is the flow of an external request through the Kubernetes objects:

```text
       User Request
 (http://hello.world)
           |
           v
+---------------------+
|   Internet Router   |
+---------------------+
           |
           v
+---------------------+      +------------------------+
| Ingress Controller  |----->| Ingress Resource       |
| (Reverse Proxy)     |      | (Routing Rules)        |
| Host: hello.world?  |      | / -> web-service:80    |
+---------------------+      +------------------------+
           |
           v (Routes to correct Service)
+---------------------+      +------------------------+
| Service (web-service) |----->| Endpoints Controller   |
| (Stable Virtual IP) |      | (Watches Pods)         |
|                     |      | Pod1_IP, Pod2_IP       |
+---------------------+      +------------------------+
           |
           | (Load balances to a healthy Pod)
           |
      /----v----\
     /           \
+-------+     +-------+
| Pod 1 |     | Pod 2 |  <-- Managed by Deployment
| NGINX |     | NGINX |
+-------+     +-------+
```

## Memory technique — remember this forever
1.  **The Restaurant Analogy:**
    *   **Pod:** A single chef working at a station. The station has all the tools (containers). The chef is replaceable.
    *   **Deployment:** The Head Chef. Their job is to ensure there are always 3 chefs (`replicas: 3`) on the line. If a chef goes home sick, the Head Chef immediately calls in a replacement. They manage the *staffing level*, not individual chefs.
    *   **Service:** The "Order Up" window. Waiters don't talk to individual chefs. They put the order ticket on this single, stable window. The system ensures the ticket gets to an available chef. It's the stable point of contact.
    *   **Ingress:** The restaurant's Maître d' and front door. They greet customers, look at the menu (URL path), and direct them to the correct "Order Up" window (`/sushi` goes to the sushi bar Service, `/steak` goes to the grill Service).

2.  **Facts to Overlearn:**
    *   `Pod`: Smallest deployable unit, contains one or more containers, shares network/storage.
    *   `Deployment`: Manages a `ReplicaSet` to ensure a desired number of Pods are running.
    *   `Service`: Exposes a set of Pods using a stable DNS name and IP address, using a `selector` to find them.
    *   `Ingress`: Maps external HTTP/S routes (host/path) to internal `Services`.

3.  **Spaced Repetition Schedule:** Review this material in **1 day, 3 days, 7 days, 16 days, and 35 days**. Each time, try to draw the diagram from memory and explain the restaurant analogy.

4.  **First Principles Pathway:** If you forget, start from the problem: "How do I run a scalable, fault-tolerant application?"
    *   I need to run my code. -> Wrap it in a **Pod**.
    *   What if a Pod dies? I need something to automatically restart it. -> Use a **Deployment** to manage its lifecycle.
    *   Pods get new IPs when they restart. How do other parts of my system find them? -> Create a **Service** to give them a stable address.
    *   How do users from the internet access my application? -> Create an **Ingress** to route external traffic to my Service.

## Common mistakes
1.  **Confusing Service `port` and `targetPort`:** `port` is the port the Service itself exposes. `targetPort` is the port on the Pod's container that the Service should forward traffic to. They can be different.
2.  **Forgetting the Ingress Controller:** Creating an `Ingress` resource does nothing on its own. You need a separate program, an Ingress *Controller* (like NGINX or Traefik), running in the cluster to actually implement the routing rules.
3.  **Mismatched Labels and Selectors:** The entire system is glued together by labels. If a Service's `selector` doesn't match the `labels` on your Pods, the Service will have no endpoints and will not forward traffic. Always double-check them.
4.  **Accessing Pods by IP:** Never rely on a Pod's IP address. It is ephemeral and will change. Always, always, always communicate with Pods through a Service.

## Self-check
1.  You have an application running in a Pod. Your colleague says they cannot connect to it from their machine outside the cluster. What Kubernetes object is likely missing or misconfigured?
2.  A Deployment is configured with `replicas: 5`. You observe only 4 pods running. What are two possible reasons for this discrepancy that the Deployment controller cannot immediately fix?
3.  You want to perform a "blue-green" deployment. You have `app-v1` running, exposed by a Service called `my-app-service`. You deploy `app-v2`. How would you modify your Kubernetes objects (without downtime) to switch all user traffic from v1 to v2?