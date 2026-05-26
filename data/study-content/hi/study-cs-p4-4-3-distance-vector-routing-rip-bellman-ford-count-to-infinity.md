## 1. The one-sentence answer
**Distance vector routing** ek distributed algorithm hai jisme har router apne neighbours ko sirf apni destination tak ki estimated distance batata hai aur Bellman-Ford relaxation rule se routing table update karta hai.

Yeh approach RIP jaise protocols mein use hoti hai kyunki har node ko pura topology nahi pata hota. Har node sirf local information se kaam karta hai aur har 30 seconds (RIP case) ya jab change ho tab update exchange karta hai. Iska result yeh hota hai ki network mein har node eventually shortest path distances converge kar leta hai lekin slow convergence aur count-to-infinity jaise issues bhi paida hote hain.

> [!NOTE]
> Sabse badi aha yeh hai ki distance vector mein koi node global graph nahi dekhta; woh sirf “mere neighbour ne kaha ki uske through cost x hai” par trust karta hai, isliye ek galat update poore network ko poison kar sakta hai.

## 2. Why this matters — concrete and current
Cisco, Juniper aur Arista ke enterprise routers aaj bhi RIPv2 aur RIPvng ko legacy networks mein fallback ke taur par chalate hain jab OSPF ya EIGRP configure nahi kiya jaata. SpaceX Starlink ground stations mein internal routing ke liye distance-vector style protocols ka variant use hota hai kyunki satellite links par full link-state flood karna expensive padta hai.

Google’s B4 WAN aur Microsoft Azure backbone mein early versions ne distance vector ideas ko modified form mein test kiya tha lekin count-to-infinity ko solve karne ke liye path vector (BGP) ki taraf shift kar diya. Modern SD-WAN products jaise VMware VeloCloud aur Fortinet SD-WAN ab bhi distance vector concepts ko split-horizon aur route poisoning ke saath use karte hain taaki small branch offices mein configuration simple rahe.

Bellman-Ford ka distributed version ab bhi reinforcement learning based routing papers (jaise 2022 SIGCOMM “RouteNet”) mein baseline ke taur par compare kiya jaata hai.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Graph with non-negative edge weights | Distance vector sirf tab sahi chalta hai jab weights negative na hon |
| Relaxation operation       | Bellman-Ford ka core step isi par based hai               |
| Distributed systems        | Har router independent process hai, synchronous clock nahi hota |
| Routing table              | Har node ko sirf next-hop aur distance store karna padta hai |

Agar aapko non-negative weights aur relaxation clear nahi hain to pehle single-source shortest path (Bellman-Ford centralized version) padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Local view only
Har router apne directly connected neighbours ki list aur unke through cost ko jaanta hai. Kisi aur node ki information uske neighbours se hi aati hai.

Example: Router A, B se connected hai cost 2 par aur C se cost 5 par. A ko sirf yeh do links dikhte hain.

Formal statement: Node \(v\) ke paas sirf set \(N(v)\) (neighbours) aur weights \(w(v,u)\) for \(u \in N(v)\) hote hain.

> [!WARNING]
> Agar aap sochte ho ki har node pura graph jaanta hai to aap link-state routing (OSPF) ko distance-vector se confuse kar rahe ho.

### Step 2 — Bellman-Ford equation
Ek node \(v\) apni distance estimate \(d(v,x)\) ko update karta hai using
\[
d(v,x) \leftarrow \min_{u \in N(v)} \bigl( w(v,u) + d(u,x) \bigr)
\]
jab bhi neighbour \(u\) apni estimate \(d(u,x)\) bhejta hai.

Example: A ko B se pata chalta hai ki B se X tak distance 3 hai. A ke paas B tak cost 2 hai, to A apni distance \(2+3=5\) set karta hai.

### Step 3 — Distributed asynchronous updates
Updates periodically (RIP: 30 s) ya triggered (jab change ho) exchange hote hain. Koi global clock nahi hota, isliye temporary loops ban sakte hain.

Formal: Har node apni table ko asynchronously relax karta rehta hai jab tak koi change na ho.

> [!WARNING]
> Agar update frequency bahut kam rakho to convergence time badh jaata hai; agar bahut tez rakho to bandwidth waste hoti hai.

### Step 4 — Count-to-infinity problem
Jab ek link fail ho jaata hai aur koi alternate path nahi hota, to do nodes ek dusre ko galat tareeke se update karte rehte hain aur distance infinity tak count karti hai.

Example: A–B–X network mein B–X link down ho jaaye. A aur B ek dusre ko “main X tak 3 hoon” bolte rehte hain aur distance 3,4,5,… badhti jaati hai.

### Step 5 — Mitigation techniques
Split horizon: Router woh route wapas usi neighbour ko nahi bhejta jisse woh aaya tha.  
Poison reverse: Route ko metric infinity (16 in RIP) ke saath bhejte hain.  
Route poisoning + hold-down timer: RIP mein yeh combine karke count-to-infinity ko slow karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Simple three-node network**  
*Given:* Nodes A,B,X. Links: A–B cost 2, B–X cost 3.  
*Find:* A ki X tak distance after one update.  

A receives from B: \(d(B,X)=3\).  
A computes \(\min(2+3)=5\).  
*Why:* Sirf ek possible next-hop hai.  
**Final answer: 5**

*Reflection:* Yeh sabse basic case hai jisme koi choice nahi, sirf addition hoti hai.

**Example 2 — Node with two neighbours**  
*Given:* A connected to B (cost 4) and C (cost 1). B reports \(d(B,X)=6\), C reports \(d(C,X)=2\).  
*Find:* A’s distance to X.  

A evaluates \(4+6=10\) and \(1+2=3\).  
Chooses minimum = 3 via C.  
*Why:* Bellman-Ford equation dono options ko compare karti hai.  
**Final answer: 3 via C**

*Reflection:* Multiple next-hops hone par min lena zaroori hai.

**Example 3 — Link failure and count-to-infinity**  
*Given:* A–B cost 2, B–X cost 1. B–X fails. A’s table still has 3 via B.  
*Find:* Sequence of distances after three asynchronous updates.  

Update 1: B sends 16 (poison). A sets 16.  
Update 2: A sends 16 to B.  
Update 3: Both stay at 16.  
*Why:* Poison reverse ne loop ko break kiya.  
**Final answer: both nodes reach 16 (infinity in RIP)**

*Reflection:* Without poison reverse distance 4,5,6… tak jaati.

**Example 4 — Hold-down timer effect**  
*Given:* Same topology, hold-down timer = 2 update periods. Link B–X fails.  
*Find:* When A accepts new route.  

A receives poisoned update, starts hold-down. Even if alternate route (A–C–X) appears during timer, A ignores it. Timer expire hone ke baad hi new route accept karta hai.  
*Why:* Timer temporary oscillations ko rokta hai.  
**Final answer: new route accepted only after timer expiry**

*Reflection:* Hold-down correctness deta hai lekin convergence slow karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting split horizon    | Student sirf basic equation yaad rakhta hai | Har update ke time pe “kya main yeh route usi neighbour ko bhej raha hoon?” check karo |
| Assuming synchronous updates| Textbook diagrams synchronous dikhaate hain | Real protocols asynchronous hote hain, isliye loops possible hain |
| Using negative weights      | Bellman-Ford centralized version allow karta hai | Distance vector routing negative weights support nahi karti |
| Ignoring hold-down timer    | Timer ko “extra feature” samajhte hain      | RIP simulation mein timer ko explicitly model karo |
| Metric 16 = infinity galat samajhna | RIP 16 ko infinity maanta hai               | 16 aane par route ko turant delete kar do |
| Triggered update miss karna | Sirf periodic updates sochte hain           | Link failure par turant poison update bhejo |

## 7. The textbook-precise statement
In distance-vector routing, each node \(v\) maintains a distance estimate \(D_v(x)\) for every destination \(x\). Periodically or on topology change, node \(v\) sends its current distance vector to each neighbour. Upon receiving a vector from neighbour \(u\), node \(v\) performs the relaxation
\[
D_v(x) \leftarrow \min_{u \in N(v)} \bigl( c(v,u) + D_u(x) \bigr)
\]
for every destination \(x\), where \(c(v,u)\) is the link cost. The algorithm converges to shortest-path distances provided all link costs are non-negative and the network is stable. RIP (RFC 2453) implements this with hop-count metric, split horizon with poison reverse, and a hold-down timer of 180 s. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.5.2)

## 8. Visual — diagram or schematic
```
A ----(2)---- B ----(3)---- X
 \             /
  \--(5)------/
```
Nodes: A, B, X.  
Edges labelled with costs.  
B–X link failure hone ke baad A aur B ke beech loop banne ki sambhavna hoti hai.

## 9. The memory technique
1. **The hook** — Socho ek “rumour mill” jisme har insaan sirf apne dost se sun kar baat failata hai; galat rumour infinity tak badhta jaata hai.
2. **What to overlearn** — Bellman-Ford equation, RIP infinity = 16, split-horizon rule.
3. **Spaced-repetition schedule** — 1 din baad equation likho, 3 din baad count-to-infinity example solve karo, 7 din baad RIP timers yaad karo, 16 din baad full network simulation, 35 din baad poison-reverse proof.
4. **First-principles fallback** — Graph lo, har node ke liye sirf neighbours ki list banao, relaxation equation apply karte jaao jab tak values change na hon.

## 10. What this unlocks
Distance vector samajhne ke baad aap path-vector routing (BGP), link-state routing (OSPF), and routing convergence proofs ko asani se samajh paoge.

- BGP ke AS-path attribute ko count-to-infinity se compare kar sakoge
- DSDV aur AODV jaise MANET protocols ke design samajh aa jaayenge
- Software-defined networking controllers mein distance-vector modules likh sakoge

## 11. Self-check — five questions, no answers
1. Ek 4-node network mein jisme ek link fail ho jaaye, count-to-infinity kitne updates tak chal sakta hai agar poison reverse na ho?
2. RIP metric 16 kyun choose kiya gaya? Kya hota agar 255 hota?
3. Split horizon with poison reverse aur simple split horizon mein kya farak hai?
4. Agar ek link ka cost negative ho jaaye to distance vector kyun fail ho jaata hai?
5. Hold-down timer aur triggered update dono hone par convergence time ka qualitative graph draw karo.