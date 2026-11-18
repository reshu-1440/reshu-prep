import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from topic_content import TOPIC_CONTENT
from generate_roadmap import week_blueprints

errors = []
warnings = []

print(f"Total entries in TOPIC_CONTENT: {len(TOPIC_CONTENT)}")

for key, entry in TOPIC_CONTENT.items():
    # Check fields
    required_fields = ["t1_details", "t1_why", "t1_dod", "t2_details", "t2_why", "t2_dod"]
    for field in required_fields:
        if field not in entry:
            errors.append(f"[{key}] Missing field: {field}")
            continue

    # Check t1_details steps
    t1_steps = entry.get("t1_details", "").split("\n")
    if len(t1_steps) != 4:
        errors.append(f"[{key}] t1_details has {len(t1_steps)} steps, expected 4")
    for i, step in enumerate(t1_steps):
        prefix = f"{i+1}."
        if not step.strip().startswith(prefix):
            errors.append(f"[{key}] t1 step {i+1} does not start with '{prefix}': {step}")
        words = step.strip().split()
        if len(words) > 15:
            errors.append(f"[{key}] t1 step {i+1} has {len(words)} words (> 15): {step}")

    # Check t2_details steps
    t2_steps = entry.get("t2_details", "").split("\n")
    if len(t2_steps) != 3:
        errors.append(f"[{key}] t2_details has {len(t2_steps)} steps, expected 3")
    for i, step in enumerate(t2_steps):
        prefix = f"{i+1}."
        if not step.strip().startswith(prefix):
            errors.append(f"[{key}] t2 step {i+1} does not start with '{prefix}': {step}")
        words = step.strip().split()
        if len(words) > 15:
            errors.append(f"[{key}] t2 step {i+1} has {len(words)} words (> 15): {step}")

# Check topic matching against week_blueprints
all_days = []
for w in week_blueprints:
    for df in w.get("dayFocus", []):
        all_days.append((w["week"], df[0], df[1], df[2]))

print(f"Total days across all 26 weeks: {len(all_days)}")

unmatched_w1_18 = []
matched_w1_18 = 0

for week, title, topic, track in all_days:
    full_str = f"{title} {topic}"
    matched_key = None
    for k in TOPIC_CONTENT:
        if k.startswith("_"):
            continue
        if k.lower() in full_str.lower():
            matched_key = k
            break
    
    if week <= 18:
        # Day 7 is evaluation in weeks 1-18
        if "evaluation" in title.lower() or "audit" in title.lower() or "milestone" in title.lower():
            # evaluation day
            pass
        elif matched_key:
            matched_w1_18 += 1
        else:
            unmatched_w1_18.append((week, title, topic))

print(f"Matched days in weeks 1-18: {matched_w1_18}")
if unmatched_w1_18:
    print(f"Unmatched days in weeks 1-18 ({len(unmatched_w1_18)}):")
    for w, ti, to in unmatched_w1_18:
        print(f"  Week {w}: {ti} | {to}")

if errors:
    print(f"ERRORS ({len(errors)}):")
    for err in errors:
        print(f"  - {err}")
    sys.exit(1)
else:
    print("ALL VALIDATION CHECKS PASSED PERFECTLY!")
