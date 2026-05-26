## 1. The one-sentence answer
**Regular expressions let you define text patterns so the re module can search, extract, or replace matching substrings inside strings.**

Pehla step yeh samajhna hai ki ek pattern ek rule set hai jo decide karta hai konsa text match hoga. Jaise "koi bhi teen digit" ya "ek email address jisme @ aur .com ho". Python ka re module is pattern ko compile karta hai aur phir string ke andar scan karta hai.

Dusra point yeh hai ki groups allow karta hai pattern ke andar alag-alag hisson ko capture karna. findall saare matches laata hai aur sub unhe replace karta hai. Yeh sab string manipulation ko fast aur reliable banata hai bina manual loops ke.

> [!NOTE]
> Sabse bada "aha" yeh hai ki ek pattern ek baar likh do, phir wohi pattern hazaron strings par chal sakta hai bina code badle.

## 2. Why this matters — concrete and current
Google ka spam filter roz billions of emails mein phone numbers aur credit-card patterns dhundta hai using re-based rules inside their mail pipeline.

NASA telemetry logs mein sensor IDs aur timestamps extract karne ke liye re module use hota hai taaki real-time anomaly detection scripts fast chal sakein.

Semiconductor companies jaise TSMC apne fabrication log files mein wafer IDs aur error codes parse karte hain re.sub se taaki daily yield reports automatically clean ho jaayein.

Modern web frameworks jaise Django apne URL routing engine mein named groups use karte hain taaki /user/123/profile jaisi paths ko views se match kiya ja sake without custom parsing code.

## 3. Mental prerequisites

| Concept          | Why you need it here                              |
|------------------|---------------------------------------------------|
| Python strings   | re functions strings ko input aur output ke roop mein lete hain |
| Basic functions  | re.compile, re.findall, re.sub ko call karna padta hai |
| Lists            | findall aksar list return karta hai, isliye list handling zaroori hai |

Agar upar wale concepts clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw string literal protects backslashes
Aap jab pattern likhte ho to \d ya \w jaise escape sequences backslash ki wajah se galat interpret ho sakte hain. Isliye raw string r"..." use karte hain.

Example: r"\d{3}" likhne se Python backslash ko literal maanta hai.

Formal: A raw string literal is written as r"pattern" so that every backslash is passed unchanged to the regex engine.

> [!WARNING]
> Agar raw string nahi use kiya to "\\d" double backslash ban jaata hai aur pattern toot jaata hai.

### Step 2 — compile turns pattern into reusable object
re.compile(r"pattern") ek SRE_Pattern object deta hai jo baar-baar search kar sakta hai bina pattern dobara parse kiye.

Example: pattern = re.compile(r"\d+"); pattern.findall("abc123def45") → ['123','45']

Formal: compiled = re.compile(pattern, flags=0) returns a pattern object whose methods operate on target strings.

### Step 3 — findall returns all non-overlapping matches
findall har match ko list mein collect karta hai. Agar groups hain to sirf groups return hote hain.

Example: re.findall(r"(\d+)-(\d+)", "12-34 56-78") → [('12','34'),('56','78')]

Formal: re.findall(pattern, string, flags=0) → list of strings or list of tuples when groups exist.

### Step 4 — groups capture substrings inside parentheses
( ) ke andar jo bhi likha hai woh capture group ban jaata hai aur alag-alag index par milta hai.

Example: r"(\w+)@(\w+)" email ke local aur domain part ko alag karta hai.

Formal: A capturing group is defined by (subpattern) and is numbered from left to right starting at 1.

### Step 5 — sub replaces every match with replacement string
re.sub(pattern, repl, string) har match ko repl se badal deta hai. \1, \2 se groups ko replacement mein use kar sakte hain.

Example: re.sub(r"(\d{3})-(\d{2})", r"\2-\1", "123-45") → "45-123"

Formal: re.sub(pattern, repl, string, count=0, flags=0) returns the string after performing all replacements.

## 5. Worked examples — har step show karo

**Example 1 — Extract three-digit codes**
- *Given:* text = "Error codes: 404 500 301"
- *Find:* all three-digit numbers
Step 1: import re  
Step 2: matches = re.findall(r"\d{3}", text)  
*Why:* \d{3} exactly three digits maangta hai.  
**['404','500','301']**

*Reflection:* Simple pattern without groups returns plain list; easy to extend to four digits.

**Example 2 — Capture date parts**
- *Given:* date = "2024-11-05"
- *Find:* year, month, day separately
matches = re.search(r"(\d{4})-(\d{2})-(\d{2})", date).groups()  
*Why:* groups() tuple deta hai jisme har ( ) ka content hai.  
**('2024','11','05')**

*Reflection:* search first match deta hai jabki findall saare deta hai; groups() tab useful hai jab structure fixed ho.

**Example 3 — Mask phone numbers**
- *Given:* msg = "Call 987-654-3210 now"
- *Find:* replace with masked version
result = re.sub(r"(\d{3})-(\d{3})-\d{4}", r"\1-XXX-XXXX", msg)  
*Why:* \1 pehla group reuse karta hai, baaki hide.  
**"Call 987-XXX-XXXX now"**

*Reflection:* sub ek hi line mein sanitisation kar deta hai jo loops se lamba padta.

**Example 4 — Nested groups with findall**
- *Given:* log = "user:42 action:login time:09:15"
- *Find:* user id and action together
result = re.findall(r"user:(\d+) action:(\w+)", log)  
*Why:* findall groups ko tuple list banata hai jab multiple ( ) hote hain.  
**[('42','login')]**

*Reflection:* Jab multiple groups hote hain to findall automatically tuple banata hai, isliye list of tuples handle karna padta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting raw string       | Backslash interpreted by Python first       | Always write r"..." for patterns             |
| Using search instead of findall | search stops at first match                 | Choose findall when all matches required     |
| Overlapping matches missed  | findall never overlaps                      | Use finditer + manual span logic if overlap needed |
| Group numbering confusion   | Left-to-right counting hard to track        | Use named groups (?P<name>...) for clarity   |
| None result on match        | search returns None when no match           | Always check if match: before calling .group() |
| Greedy quantifiers          | .* eats too much text                       | Use .*? for non-greedy when needed           |
| Flags not passed            | re.IGNORECASE etc. forgotten                | Pass flags=re.IGNORECASE explicitly          |

## 7. The textbook-precise statement
From the official Python documentation (re — Regular expression operations, Python 3.12):  
re.compile(pattern, flags=0) compiles a regular expression pattern into a regular expression object.  
re.findall(pattern, string, flags=0) returns all non-overlapping matches of pattern in string as a list of strings. If one or more groups are present, returns a list of tuples.  
re.sub(pattern, repl, string, count=0, flags=0) returns the string obtained by replacing the leftmost non-overlapping occurrences of pattern in string by the replacement repl. All backreferences in repl are processed.

## 8. Visual — diagram or schematic
```
string:   "user:42 action:login"
          |     |          |
          |     |          └── match end
          |     └── group 1 captured
          └── literal "user:"
pattern:  user:(\d+) action:(\w+)
groups:        1             2
```

## 9. The memory technique

**The hook** — Socho ek detective jo ek pattern wali magnifying glass se text mein hidden numbers aur words dhoondta hai; har baar wohi glass use hoti hai.

**What to overlearn** — r"..." raw string, findall groups → list of tuples, sub mein \1 \2 backreference.

**Spaced-repetition schedule** — 1 din baad ek chhota pattern likho, 3 din baad findall+groups, 7 din baad sub with backrefs, 16 din baad flags ke saath, 35 din baad full log parsing.

**First-principles fallback** — Agar pattern bhool jaaye to string ke har character ko ek-ek karke check karne ka loop likho, phir us loop ko pattern rules mein badlo.

## 10. What this unlocks
Yeh foundation aapko log parsing, config file readers, simple compilers aur data cleaning pipelines tak le jaata hai.

- Next: re.finditer for span information  
- Next: named groups (?P<name>...)  
- Next: re.VERBOSE for readable multi-line patterns  
- Next: combining with pandas str.extract  

## 11. Self-check — five questions, no answers
1. r"\d+" aur "\d+" mein kya farak hai jab re.compile mein use karo?
2. findall ek pattern mein do groups hone par kya return karta hai?
3. re.sub(r"(\w+)@(\w+)", r"\2.\1", "a@b") ka result kya hoga?
4. Agar pattern match nahi karta to search aur findall ka behaviour kya hota hai?
5. Ek aisa pattern likho jo "12-34" ko "34-12" mein badal de bina manually string slice kiye.