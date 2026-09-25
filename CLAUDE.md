# Execution Rules & Cost Optimization
- DO NOT use multi-turn exploratory tool calls (grep, repeated reads) unless strictly necessary.
- Apply code edits directly in a single `Edit` operation.
- Keep reasoning and thinking minimal.
- Never output explanatory summaries or markdown bullet points after an edit. Simply apply the diff and confirm in one short sentence.
- Restrict all file operations strictly to the files explicitly mentioned by the user.