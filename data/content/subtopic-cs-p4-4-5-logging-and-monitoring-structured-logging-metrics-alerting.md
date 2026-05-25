## What it is
Logging, monitoring, and alerting are the sensory organs of a software system. Logging records discrete, timestamped events (e.g., "user 123 logged in"). Monitoring tracks and visualizes aggregate data over time, called metrics (e.g., "CPU usage is 65%"). Alerting automatically triggers notifications when a metric crosses a predefined threshold (e.g., "alert if CPU usage > 90% for 5 minutes").

## Why it matters
These concepts are the foundation of observability—the ability to understand a system's internal state from its external outputs. In aerospace, this is telemetry from a launch vehicle; you monitor fuel levels, engine temperatures, and trajectory, logging key stage-separation events and alerting on dangerous deviations. In machine learning, you monitor model prediction latency and accuracy drift, logging individual prediction requests and alerting when performance degrades, signaling the need for retraining. Without this, you are flying blind.

## When to study it
You are ready for this topic. The prerequisites are:
1.  **Basic Programming:** You must be able to write simple programs, understand functions, and use data structures like dictionaries or maps (for structured data).
2.  **Command Line Familiarity:** You should be comfortable running a program and viewing its output.
3.  **Basic I/O:** A conceptual understanding of writing to files or standard output.

## How to study it (step by step)
1.  **Baseline with `print`:** Write a simple Python script that simulates processing tasks. Have it loop 100 times, sometimes succeeding and sometimes failing randomly. Use `print()` statements to output the status of each task (e.g., `print(f"Task {i} failed with error: {error_message}")`).
2.  **Introduce Unstructured Logging:** Replace the `print()` statements with Python's built-in `logging` module. Configure it to log to a file. Run the script and inspect the log file. Notice it's just text, but now with timestamps and severity levels (INFO, ERROR).
3.  **Implement Structured Logging:** Modify your logger to output JSON objects instead of plain text strings. Each log entry should be a dictionary like `{"timestamp": "...", "level": "ERROR", "task_id": i, "error": "..."}`. Run the script again and compare the JSON log file to the previous plain-text one.
4.  **Add a Metric:** Use a library like `prometheus-client` for Python. Create a Counter metric called `tasks_failed_total`. Increment this counter every time a task fails.
5.  **Define an Alert Condition:** Write a simple conditional statement that checks your metric. `if tasks_failed_total.collect()[0].samples[0].value > 10: print("ALERT: More than 10 tasks have failed!")`. This simulates a basic alerting rule.
6.  **Analyze and Reflect:** Use a command-line tool like `jq` to query your JSON logs (e.g., find all logs for a specific `task_id`). Try to do the same with your plain-text logs using `grep`. Internalize why the structured approach is superior for machine analysis.

## Key ideas, with intuition
1.  **Logs are for events, Metrics are for state.** Imagine debugging a rocket failure. The log is the second-by-second transcript from mission control and the vehicle's computer: "10:05:01.321: Stage 1 separation command sent", "10:05:01.455: Stage 1 separation bolt failed to fire". The metrics are the continuous graphs of telemetry data shown on the big screen: fuel level, velocity, altitude. You need the event log to know *what happened in what order*, and you need the metrics graphs to see *trends and system health*.

2.  **Structure enables queries.** An unstructured log is like a novel: `"ERROR: Failed to process user 123 due to timeout."` To find all timeouts, you must search for the substring "timeout". A structured log is like a database row: `{"level": "ERROR", "user_id": 123, "error_type": "timeout"}`. Finding all timeouts is a precise query: `SELECT * WHERE error_type = 'timeout'`. The latter is faster, more reliable, and doesn't break if someone changes the wording of the log message.

3.  **Alerts are questions about metrics.** An alert is a programmatic way of asking "Is the system in a state I need to worry about?" The simplest question is about the current value: Is $M(t) > C$?, where $M(t)$ is the metric value at time $t$ and $C$ is a constant threshold. More powerful alerts ask about behavior over time, using calculus concepts:
    *   **Rate of change:** Is the derivative $\frac{dM}{dt} > C_{rate}$? (e.g., "Is memory usage growing too fast?")
    *   **Sustained behavior:** Is the average over a window $\frac{1}{\Delta t} \int_{t-\Delta t}^{t} M(\tau) d\tau > C_{avg}$? (e.g., "Has CPU been over 90% for the last 5 minutes?")

## Worked example
Let's implement a simple file processor in Python, instrumenting it with structured logging and metrics.

**Step 1: The initial, uninstrumented code.**
```python
import random
import time

def process_file(filename):
    """Simulates processing a file, might fail."""
    print(f"Starting to process {filename}...")
    if random.random() < 0.2: # 20% chance of failure
        print(f"ERROR: Failed to process {filename} due to a random error.")
        return False
    time.sleep(0.1)
    print(f"Successfully processed {filename}.")
    return True

for i in range(10):
    process_file(f"file_{i}.dat")
```
This code uses `print`, which is hard to parse automatically and mixes debug output with potential error messages.

**Step 2: Refactor to structured logging and add metrics.**
We'll use standard libraries and a common format.
```python
import random
import time
import logging
import json
from prometheus_client import Counter, generate_latest

# --- Metrics Definition ---
FILES_PROCESSED_TOTAL = Counter('files_processed_total', 'Total number of files processed')
FILES_FAILED_TOTAL = Counter('files_failed_total', 'Total number of files that failed processing')

# --- Structured Logging Setup ---
class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": self.formatTime(record, self.datefmt),
            "level": record.levelname,
            "message": record.getMessage(),
            "filename": record.args.get("filename", "N/A")
        }
        return json.dumps(log_record)

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logger = logging.getLogger('file_processor')
logger.setLevel(logging.INFO)
logger.addHandler(handler)
logger.propagate = False # Prevent duplicate logs to root logger

# --- Application Logic ---
def process_file_instrumented(filename):
    """Simulates processing a file, with proper instrumentation."""
    log_context = {"filename": filename}
    logger.info("Starting file processing", extra=log_context)
    
    if random.random() < 0.2:
        logger.error("File processing failed", extra=log_context)
        FILES_FAILED_TOTAL.inc()
        return False
        
    time.sleep(0.1)
    logger.info("File processing successful", extra=log_context)
    FILES_PROCESSED_TOTAL.inc()
    return True

# --- Main Execution ---
for i in range(10):
    process_file_instrumented(f"file_{i}.dat")

# --- Alerting Simulation ---
# In a real system, a tool like Prometheus would scrape this endpoint.
print("\n--- METRICS ---")
print(generate_latest().decode('utf-8'))

failed_count = FILES_FAILED_TOTAL.collect()[0].samples[0].value
if failed_count > 2:
    print(f"ALERT! High failure count: {failed_count} failures detected.")

```
**Output might look like:**
```json
{"timestamp": "...", "level": "INFO", "message": "Starting file processing", "filename": "file_0.dat"}
{"timestamp": "...", "level": "INFO", "message": "File processing successful", "filename": "file_0.dat"}
{"timestamp": "...", "level": "INFO", "message": "Starting file processing", "filename": "file_1.dat"}
{"timestamp": "...", "level": "ERROR", "message": "File processing failed", "filename": "file_1.dat"}
...
```
```text
--- METRICS ---
# HELP files_processed_total Total number of files processed
# TYPE files_processed_total counter
files_processed_total 8.0
# HELP files_failed_total Total number of files that failed processing
# TYPE files_failed_total counter
files_failed_total 2.0

```
**Reflection:**
- **Logging:** The JSON output is machine-readable. We can now reliably query for all events related to `file_1.dat` or all `ERROR` level logs without messy text parsing.
- **Metrics:** We've decoupled the *count* of failures from the individual failure *events*. We can graph `files_failed_total` over time without reading and parsing the entire log file.
- **Alerting:** The simple `if` statement demonstrates the principle: an alert is just a condition evaluated against a metric. A real system would do this continuously.

## Diagrams
A typical logging and monitoring pipeline:

```text
+-------------+      +-----------------+      +-----------------+      +-----------------+
| Application |----->| Logger/Metrics  |----->|   Aggregator    |----->|   Dashboard &   |
| (Your Code) |      | Client Library  |      | (e.g., Fluentd, |      |   Alerting UI   |
+-------------+      +-----------------+      |   Prometheus)   |      | (e.g., Grafana) |
       |                                      +-----------------+      +-----------------+
       |                                              |
       +----------------------------------------------+
       Writes structured logs & emits metrics
```

A metric over time, triggering an alert:

```text
    ^ Metric Value
100 |                        /-----\
    |                       /       \
 90 +----------------------/---------+---- Alert Threshold
    |          /-\         /
 80 |         /   \       /
    |        /     \     /
 70 |-------/       \---/
    +-----------------------------------> Time
```

## Memory technique — remember this forever
1.  **The Cockpit Analogy:**
    *   **Metrics** are the gauges on your dashboard: altitude, airspeed, fuel level. They give you a high-level, real-time view of system health.
    *   **Logs** are the "black box" flight recorder. They contain a detailed, timestamped, immutable record of every single event that happened, crucial for post-mortem analysis.
    *   **Alerts** are the warning lights and alarms (e.g., "STALL", "LOW FUEL"). They fire when a metric (or combination of metrics) enters a dangerous state, demanding immediate attention.

2.  **Overlearn these facts:**
    *   Logs: Immutable, timestamped events. For debugging *what happened*.
    *   Metrics: Numerical, aggregatable state. For understanding *trends and health*.
    *   Alerts: A function of metrics crossing a threshold. For *automated notification*.

3.  **Spaced Repetition Schedule:**
    *   Review the Cockpit Analogy and the three facts above in **1 day**.
    *   Re-do the worked example from scratch in **3 days**.
    *   Explain the difference between logs and metrics to a rubber duck in **7 days**.
    *   Design the key metrics for a system you use (e.g., a web browser) in **16 days**.
    *   Re-read this entire mini-lesson in **35 days**.

4.  **First Principles Pathway:** If you forget everything, start here: "My program has failed. What two categories of information do I wish I had?"
    *   I wish I had a step-by-step transcript of what it did right before it failed. -> **This leads you to the concept of logging.**
    *   I wish I knew what the state of the system (CPU, memory, request count) was trending towards before it failed. -> **This leads you to the concept of metrics.**
    *   I wish something had warned me *before* it failed. -> **This leads you to the concept of alerting.**

## Common mistakes
1.  **Logging sensitive information:** Never log passwords, API keys, or personally identifiable information (PII) in plain text. This is a massive security vulnerability.
2.  **High-cardinality metrics:** Don't put unbounded values like `user_id` or `request_id` into a metric label. This causes the number of unique time series to explode, overwhelming your monitoring system. `http_requests_total{path="/user/profile", status="200"}` is good. `http_requests_total{user_id="1234567"}` is bad.
3.  **Using logs for metrics:** Don't rely on parsing log files to calculate metrics (e.g., `grep "ERROR" my.log | wc -l`). This is slow, brittle, and inefficient. Use a dedicated metrics system with counters.
4.  **Alert fatigue:** Creating alerts for things that aren't actionable. If an alert fires and the response is "ignore it," the alert is noise. This trains engineers to ignore all alerts, including critical ones.

## Self-check
1.  Take the first "uninstrumented" Python script from the worked example. Modify it to log to a file in the format `timestamp | LEVEL | message`. Do not use JSON.
2.  Consider a web server that serves user profile pages at `/users/<id>`. Define three key metrics you would want to monitor for this server's health and performance. For one of them, define a specific, justifiable alert condition.
3.  A critical service in your distributed system is experiencing a 500ms latency spike every hour, on the hour. You have structured logs from all services, metrics for request counts and latency, and an alerting system. Describe the step-by-step process you would use to diagnose the root cause. What is the first thing you would query in your logs? What would you look for in your metrics dashboards?