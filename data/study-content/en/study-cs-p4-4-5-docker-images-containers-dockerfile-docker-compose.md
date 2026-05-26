## 1. The one-sentence answer
**Docker provides a standardized way to package applications with their dependencies into portable units called images, instantiate those units as isolated runtime environments called containers, define image construction through declarative scripts called Dockerfiles, and orchestrate multiple containers through declarative configuration files consumed by docker-compose.**

An image is an immutable, layered filesystem snapshot plus metadata that contains everything needed to run a program. A container is a running process that uses an image as its root filesystem while sharing the host kernel under Linux namespaces and cgroups. The distinction matters because images are built once and reused everywhere; containers are ephemeral and stateful only through explicit volumes or networks.

A Dockerfile is a text file of ordered instructions that the Docker daemon executes to produce an image. docker-compose is a tool that reads a YAML file describing a graph of services, networks, and volumes and issues the correct sequence of Docker CLI calls to start and wire them together. These four concepts together replace ad-hoc “it works on my machine” setups with reproducible environments.

> [!NOTE]
> The decisive insight is that an image is never mutated after creation; every container starts from an identical, read-only snapshot, so environment drift disappears.

## 2. Why this matters — concrete and current
SpaceX uses Docker containers to run flight-software test harnesses on thousands of identical CI runners; each pull-request triggers a fresh container that mounts the exact same base image containing the flight-cert toolchain, eliminating the “works in simulation but not on hardware” class of defects.

In machine-learning research, the official PyTorch and TensorFlow Dockerfiles published by the respective teams guarantee that a paper’s training script produces identical numeric results on a researcher’s laptop, a university GPU cluster, and a cloud TPU node.

Semiconductor foundries such as TSMC run containerized electronic-design-automation workloads on internal Kubernetes clusters; each container pins a specific version of Synopsys or Cadence tools together with the exact license-daemon configuration, satisfying both reproducibility audits and strict export-control requirements.

Modern continuous-delivery pipelines at GitHub and GitLab execute every build step inside ephemeral containers whose images are themselves built from Dockerfiles stored in the same repository, giving commit-level traceability from source to deployed artifact.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linux process model      | Containers are ordinary processes that receive isolated views of filesystem, network, and PID space via namespaces. |
| Filesystem layers        | Union filesystems (overlay2) allow images to share unchanged layers, which is why Docker images are small and fast to transfer. |
| Client–server architecture | The Docker CLI never runs containers itself; it talks over a Unix socket or TCP to a privileged daemon that actually creates namespaces and cgroups. |
| Declarative configuration | Both Dockerfile and docker-compose describe desired state; the engine computes the minimal sequence of operations required to reach that state. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An image is a content-addressable, layered filesystem plus metadata
An image is not a single tarball; it is a directed acyclic graph of layers where each layer records only the filesystem diff produced by one instruction. The image manifest records the ordered list of layer digests and configuration JSON that includes entrypoint, environment variables, and exposed ports.

Concrete example: the official `alpine:3.18` image contains five layers; the final layer adds only the `/etc/os-release` file.

Formal statement:
$$
\text{Image} = (\text{manifest}, \{L_1, L_2, \dots, L_n\})
$$
where each \(L_i\) is identified by \(\text{SHA256}(L_i)\).

> [!WARNING]
> Treating an image as a mutable directory will cause layer cache invalidation on every build and produce images that differ by only a timestamp.

### Step 2 — A container is a process whose filesystem root is an image mount
When the daemon receives a `docker run` request it creates a new mount namespace, mounts the image’s layers as a single overlay filesystem at the container’s root, then executes the entrypoint inside that namespace.

Formal relation:
$$
\text{Container} = \text{Process}(\text{PID namespace}, \text{mount}(Image))
$$

### Step 3 — A Dockerfile is an ordered sequence of layer-producing instructions
Each Dockerfile instruction (FROM, RUN, COPY, …) either starts a new image or creates a new layer on top of the previous one. The resulting image ID is the digest of the final layer plus the configuration object.

### Step 4 — Layer caching is deterministic and content-addressed
Docker reuses a layer if and only if the instruction string and the hash of its parent layer are identical. Any change in an earlier instruction invalidates all subsequent layers.

### Step 5 — docker-compose describes a labelled multiset of containers and their wiring
The Compose file declares services, each referencing an image or build context, together with networks and volumes. The Compose binary translates the declarative graph into a sequence of `docker network create`, `docker volume create`, and `docker run` operations with the correct `--net` and `--volume` flags.

## 5. Worked examples — every step shown

**Example 1 — Minimal image**
*Given:* a directory containing only `hello.sh` that prints “hello”.
*Find:* the image ID after building.
```
FROM alpine:3.18
COPY hello.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/hello.sh
ENTRYPOINT ["hello.sh"]
```
- The FROM instruction selects the base manifest. *Why:* every image must descend from exactly one base image.
- The COPY instruction creates layer \(L_1\). *Why:* content changes produce new digests.
- The final image digest equals \(\text{SHA256}(\text{config} || L_1)\).  
**`sha256:9c6f0e8e...`**

*Reflection:* The example shows that even a one-line script yields a multi-layer image; omitting the chmod step produces a non-executable entrypoint at runtime.

**Example 2 — Layer cache hit**
*Given:* the same Dockerfile run twice without modification.
*Find:* whether the daemon reuses layers.
- Docker computes the cache key for each instruction. *Why:* the key includes the parent image ID and the exact instruction text.
- All layers match, so the build finishes in <100 ms.  
**Cache hit on every layer**

*Reflection:* Changing only the comment still invalidates the cache because the instruction string differs.

**Example 3 — Container isolation**
*Given:* two containers started from the same image, one with `--network none`.
*Find:* whether they can ping each other.
- The first container receives an IP on the default bridge. *Why:* Docker creates a veth pair and attaches it to the bridge.
- The second container has no network namespace interfaces except loopback. *Why:* `--network none` creates an empty namespace.
- Ping fails.  
**No connectivity**

*Reflection:* Network isolation is independent of the image; the same image can participate in many different networks.

**Example 4 — Compose wiring**
*Given:* a Compose file declaring `web` and `db` services on a custom network.
*Find:* the command Compose issues for the web container.
- Compose first creates the network. *Why:* services must exist before containers reference them.
- It then runs `docker run --net project_default --name web ...`.  
**Equivalent CLI sequence reproduced**

*Reflection:* Compose is only a convenience layer; every object it creates remains visible and controllable via the Docker CLI.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Storing data inside the container filesystem | The mental model “container = lightweight VM” suggests persistence | Always mount named volumes or bind mounts for any data that must survive `docker rm` |
| Using `latest` tag in production | The tag is mutable; the same name can point to different images over time | Pin every image reference to a content digest or a semantic version tag |
| Running the Docker daemon as root on a multi-tenant host | The daemon has full root access to the host kernel | Use rootless mode or a dedicated build node with strict access control |
| COPY . . before installing dependencies | Any source change invalidates the entire dependency layer | Order Dockerfile so that dependency installation precedes source copy |
| Forgetting that `docker-compose up` rebuilds only when the Compose file or build context changes | Compose does not watch Dockerfile changes unless `--build` is supplied | Always run `docker-compose build` explicitly in CI before `up` |
| Exposing ports without understanding host-port mapping | `-p 80:80` collides when two containers request the same host port | Use dynamic host ports or an ingress proxy |
| Assuming environment variables in the Dockerfile are visible at runtime | Dockerfile `ENV` bakes values into the image; runtime overrides require `-e` | Document which variables are build-time (ARG) versus runtime (ENV) |

## 7. The textbook-precise statement
A Docker image is a content-addressable object stored in an OCI distribution-spec registry. It consists of a manifest (mediaType `application/vnd.oci.image.manifest.v1+json`) listing an ordered sequence of layer descriptors and a configuration descriptor. A container is a Linux process whose filesystem, PID, network, and IPC namespaces are isolated and whose root filesystem is provided by mounting the image’s layers with a union filesystem driver. A Dockerfile is a text file whose ordered instructions are interpreted by the Docker builder to produce successive image layers. docker-compose (Compose V2) translates a Compose Specification YAML document into a set of OCI container, network, and volume create/run operations. (See Docker Inc., “Docker Engine API v1.43”, §Images and §Containers, and OCI Image Spec v1.0.2.)

## 8. Visual — diagram or schematic
```text
Host Kernel
├── Namespaces
│   ├── container-1 (mnt, pid, net, ipc)
│   └── container-2 (mnt, pid, net, ipc)
├── Overlay2 layers (read-only)
│   ├── alpine-base (layer L0)
│   ├── apt-install (layer L1)
│   └── app-copy   (layer L2)
└── Writable container layer (upperdir)
    ├── container-1 upperdir
    └── container-2 upperdir
```
The diagram shows two containers sharing the same three read-only layers while each maintains its own thin writable upper directory.

## 9. The memory technique
1. **The hook** — picture a shipping container (the runtime) stamped with a unique bill-of-lading number (image digest) that was printed from a factory blueprint (Dockerfile) and loaded onto a vessel by a single manifest (docker-compose).
2. **What to overlearn** — image ID is a digest, not a tag; containers are ephemeral; every Dockerfile instruction creates a layer.
3. **Spaced-repetition schedule** — review the four core definitions after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — rebuild the mental model from “namespaces + union mount + content addressing”.

## 10. What this unlocks
Mastery of these primitives lets you reason about reproducible builds, immutable infrastructure, and declarative orchestration, which are prerequisites for Kubernetes controllers, serverless container platforms, and supply-chain security tooling.

- Next: Kubernetes Pod and Deployment specifications
- Container runtime interfaces (CRI)
- BuildKit and multi-stage Dockerfile patterns
- Image signing and SBOM generation

## 11. Self-check — five questions, no answers
1. If two Dockerfiles differ only by a comment, do they produce images with identical layer digests?
2. A container is stopped and removed; a named volume it used is not removed. Where does the data reside after removal?
3. Explain why `docker build --no-cache` can produce a different image ID even when the Dockerfile and build context are unchanged.
4. In a docker-compose file, two services declare the same named volume. Do they share writes or receive separate copies?
5. A production image must not contain build-time secrets. Which Dockerfile instruction guarantees that an ARG value never appears in any layer?