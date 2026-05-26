## 1. The one-sentence answer
**Kubernetes is a container orchestration system whose core abstractions—pods, deployments, services, and ingress—let you run, scale, and expose workloads reliably across a cluster of machines.**

A pod is the smallest schedulable unit: one or more containers that share storage, network, and a lifecycle. A deployment declaratively manages a set of identical pods, handling replication, rolling updates, and self-healing when nodes fail. A service provides a stable network endpoint and load-balancing layer over a dynamic set of pods. Ingress sits above services and routes external HTTP or HTTPS traffic into the cluster according to hostnames and paths.

These four objects form a clean separation of concerns. Pods encapsulate runtime, deployments manage cardinality and updates, services solve discovery and stability, and ingress solves external routing. Once understood, they compose into almost every production pattern.

> [!NOTE]
> The decisive insight is that Kubernetes never lets you address a single container directly; every interaction is mediated by one of these four abstractions, which is why the system can move workloads without breaking callers.

## 2. Why this matters — concrete and current
Google’s internal Borg system, the direct ancestor of Kubernetes, runs every one of its search, Gmail, and YouTube workloads; the public Kubernetes release simply externalized that model. Modern machine-learning training platforms such as Google Vertex AI and Amazon SageMaker both schedule GPU jobs inside Kubernetes pods so that a single training run can span hundreds of nodes with automatic restart on preemption.

Cloud-native databases such as CockroachDB and Vitess expose their SQL endpoints through Kubernetes services; the service’s stable ClusterIP survives pod restarts and node drains, allowing zero-downtime schema migrations that would otherwise require manual DNS updates.

Netflix’s Titus platform uses Kubernetes deployments to manage the canary release of its streaming microservices; each deployment object records the exact container image and replica count, enabling automated rollback when error-rate metrics cross a threshold.

Semiconductor design houses such as TSMC run electronic-design-automation workloads on on-premise Kubernetes clusters; ingress controllers front the web-based EDA portals while services keep long-running simulation pods reachable even when individual compute nodes are taken offline for maintenance.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Linux container      | Pods are just co-located containers sharing a namespace   |
| YAML                 | All four abstractions are declared in YAML manifests      |
| Basic TCP/IP         | Services and ingress manipulate virtual IPs and ports     |
| DNS                  | Services register names that pods and clients resolve     |

## 4. Building the idea — from intuition to formalism

### Step 1 — A container is an isolated process
A container packages an application together with its libraries and a minimal filesystem. The kernel isolates its view of processes, network, and mounts via namespaces and cgroups.  
Example: running `docker run nginx` starts one process listening on port 80 inside its own network namespace.  
Formally, a container is a process tree whose root filesystem and network stack are distinct from the host:  
\[
\text{container} = (P, FS, NET)
\]  
where \(P\) is the process subtree, \(FS\) the mount namespace, and \(NET\) the network namespace.  
> [!WARNING] Treating a container as a lightweight VM leads to the mistake of expecting it to survive node reboots by itself.

### Step 2 — A pod groups containers that must share fate
When two processes need the same localhost port or shared volume, Kubernetes places them in one pod. They share the pod’s network namespace and any declared volumes.  
Example: a main application container and a sidecar logging container both write to `/var/log` mounted from an emptyDir volume.  
Formally:  
\[
\text{pod} = \{c_1, c_2, \dots, c_k\} \text{ with shared } (NET, V)
\]  
where \(V\) denotes attached volumes.  
> [!WARNING] Placing unrelated processes in the same pod couples their lifecycles; a crash in one terminates the whole pod.

### Step 3 — A deployment owns a replica set of pods
A deployment object records a pod template and a desired replica count. The controller creates or deletes pods until the observed count matches the desired count and performs rolling updates on template changes.  
Example: `replicas: 3` with image `app:v2` yields three pods; changing the image to `app:v3` triggers a rolling replacement.  
Formally the deployment controller maintains the invariant  
\[
|\{p \mid p \text{ matches template } T\}| = r
\]  
where \(r\) is the replica count.  
> [!WARNING] Editing a pod directly bypasses the deployment controller; the pod will be replaced on the next reconciliation.

### Step 4 — A service gives pods a stable network identity
Pods receive ephemeral IPs. A service creates a virtual IP (ClusterIP) and a DNS name that load-balances across all pods matching a label selector.  
Example: service `frontend` with selector `app=web` forwards traffic to any current pod bearing that label.  
Formally:  
\[
\text{service}(VIP, selector) \mapsto \{p \mid \text{labels}(p) \supset selector\}
\]  
> [!WARNING] Forgetting to update the selector after a label change leaves the service pointing at zero endpoints.

### Step 5 — Ingress routes external traffic into services
An ingress resource declares host-based and path-based rules that an ingress controller (commonly NGINX or Envoy) translates into layer-7 routing.  
Example: host `api.example.com` with path `/v1` forwards to service `api-v1`.  
Formally an ingress is a function  
\[
\text{ingress}: (host, path) \to service
\]  
> [!WARNING] Ingress operates at layer 7; attempting to use it for raw TCP traffic without a TCP proxy ingress controller fails.

## 5. Worked examples — every step shown

**Example 1 — Minimal pod**  
*Given:* Need to run a single nginx process.  
*Find:* YAML that creates a pod.  
Step 1: Declare apiVersion and kind.  
*Why:* Kubernetes routes the manifest to the correct controller.  
Step 2: Add metadata.name.  
*Why:* Every object requires a unique name inside its namespace.  
Step 3: Supply spec.containers with image.  
*Why:* The container runtime needs an image reference.  
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.25
```
**Final answer**  
A running pod named `nginx` whose single container uses image `nginx:1.25`.  
*Reflection:* The manifest is declarative; the API server and kubelet together realize the desired state.

**Example 2 — Deployment with three replicas**  
*Given:* Need three identical pods that survive node failure.  
*Find:* Deployment manifest.  
Step 1: Set kind Deployment and replicas: 3.  
*Why:* The deployment controller owns replica count.  
Step 2: Embed pod template under spec.template.  
*Why:* The template is the blueprint for each replica.  
Step 3: Add selector that matches template labels.  
*Why:* The controller uses the selector to identify managed pods.  
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
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
        image: nginx:1.25
```
**Final answer**  
Three pods, each labelled `app=web`, managed by deployment `web`.  
*Reflection:* Changing replicas or image later only requires editing the deployment.

**Example 3 — Service exposing the deployment**  
*Given:* The three pods must be reachable inside the cluster by a stable name.  
*Find:* Service manifest.  
Step 1: Declare kind Service and type ClusterIP.  
*Why:* ClusterIP is the default stable virtual IP.  
Step 2: Set selector identical to the deployment.  
*Why:* The service must discover exactly the pods created by the deployment.  
Step 3: Define port mapping.  
*Why:* Clients connect to the service port; the service forwards to the container port.  
```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
```
**Final answer**  
DNS name `web` resolves to a ClusterIP that load-balances across the three pods.  
*Reflection:* The service survives pod replacement because it selects by label, not by pod name.

**Example 4 — Ingress routing external traffic**  
*Given:* External clients must reach the service at `https://example.com/web`.  
*Find:* Ingress manifest plus assumption of an ingress controller.  
Step 1: Declare kind Ingress.  
*Why:* Ingress resources are interpreted by the controller, not the core API server.  
Step 2: Specify rules with host and path.  
*Why:* The controller matches incoming HTTP requests against these rules.  
Step 3: Reference the backend service.  
*Why:* The controller ultimately forwards to the service’s ClusterIP.  
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 80
```
**Final answer**  
External HTTPS requests to `/web` on `example.com` reach the service `web`.  
*Reflection:* Ingress is purely routing; TLS termination is configured separately on the controller.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Editing a pod created by a deployment | kubectl apply on a pod manifest looks natural | Always edit the deployment; let it own pods  |
| Using the wrong selector on a service | Copy-paste from an older deployment         | Keep selector identical to deployment’s matchLabels |
| Expecting a pod IP to be stable     | Pods are ephemeral by design                | Route only through services                  |
| Forgetting that ingress is layer 7  | Confusing it with a load-balancer service   | Use LoadBalancer service or dedicated TCP ingress for non-HTTP |
| Running multiple unrelated containers in one pod | “They need to talk on localhost”            | Use shared volume or sidecar pattern only when lifecycle coupling is required |
| Scaling a deployment to zero while a service still points at it | Service selector still matches zero pods    | Verify endpoints with `kubectl get endpoints` |
| Assuming ingress controller is installed by default | Many clusters ship without one              | Confirm with `kubectl get ingressclass`      |

## 7. The textbook-precise statement
A Kubernetes cluster maintains four primary resource types whose controllers enforce declarative invariants (Burns et al., “Kubernetes: Up and Running”, 2e, Ch. 5–8). A pod is an atomic scheduling unit comprising one or more containers that share a network namespace and zero or more volumes. A deployment manages a replica set whose size equals the declared `replicas` field and whose pod template matches the `selector`. A service maintains a virtual IP and DNS entry that resolves to the current set of endpoints matching its selector. An ingress resource supplies routing rules interpreted by an ingress controller that maps `(host, path)` tuples onto services. All controllers run a reconciliation loop that drives actual state toward desired state.

## 8. Visual — diagram or schematic
```text
External client
      │
      ▼  HTTPS
Ingress Controller (NGINX/Envoy)
      │  (host+path rules)
      ▼
Service (ClusterIP + DNS)
      │  (label selector)
      ▼  load-balanced TCP
Pod 1          Pod 2          Pod 3
┌──────────┐   ┌──────────┐   ┌──────────┐
│ container│   │ container│   │ container│
└──────────┘   └──────────┘   └──────────┘
Deployment owns replicas and performs rolling updates
```

## 9. The memory technique

1. **The hook** — Picture four nested Russian dolls: the innermost doll is the pod (the actual running containers), the next is the deployment (the manager that keeps the right number of dolls), the next is the service (the label that lets you call any of them by one name), and the outermost is ingress (the doorman who decides which callers get in).

2. **What to overlearn** — Pod = smallest unit; Deployment owns replica count and updates; Service = selector + stable IP; Ingress = layer-7 router.

3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days by writing each object’s YAML skeleton from memory.

4. **First-principles fallback** — Re-derive from the container: a container needs a lifecycle wrapper (pod), a cardinality manager (deployment), a discovery mechanism (service), and an entry point (ingress).

## 10. What this unlocks
Mastery of these four objects lets you reason about every higher-level Kubernetes pattern. You can next study StatefulSets for ordered, persistent workloads, HorizontalPodAutoscalers that mutate deployment replica counts, NetworkPolicies that act on pod labels, and Helm charts that template entire graphs of deployments, services, and ingress resources.

## 11. Self-check — five questions, no answers
1. A pod contains two containers that must share a Unix socket. Which object should declare the shared emptyDir volume?  
2. After changing a deployment’s container image, three old pods remain running. Which controller is responsible for their termination?  
3. A service’s endpoints list is empty even though matching pods exist. Name the most likely misconfiguration.  
4. An ingress rule routes `/api` to service A and `/web` to service B. Which component performs the actual HTTP path matching?  
5. You need to expose a TCP database port to external clients without TLS termination. Which abstraction should you avoid and why?