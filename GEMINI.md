# Drawing Board Workspace Rules

## Mandatory Visual Browser Execution Policy
- **NO HEADLESS BROWSERS**: When auditing, verifying UI, testing responsiveness, or inspecting pages, NEVER run silent headless automation.
- **INTERACTIVE DESKTOP TARGETING**: Browser windows must launch onto the user's desktop (`WinSta0\Default`) so they are visible on screen.
- **LIVE VISUAL ACTIONS**: All browser interactions (clicking, scrolling, typing, switching tabs) must be visibly displayed on the user's screen with cursor indicators, ripple effects, and smooth scrolling.
- **CDP CONNECTION**: Use port `9222` to connect to and drive the visible Chrome window live.
