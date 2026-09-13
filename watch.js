const fs = require('fs');
const { execSync } = require('child_process');

const BLACKBOARD_FILE = './AGENT_HANDOFF.md';

console.log(`\n👁️  Markdown Blackboard Watcher Started...`);
console.log(`Monitoring ${BLACKBOARD_FILE} for changes.`);

// Create a dummy handoff file if it doesn't exist
if (!fs.existsSync(BLACKBOARD_FILE)) {
    fs.writeFileSync(BLACKBOARD_FILE, `# 📋 Global Task Queue\n\n- [ ] **Task 1:** Example task for Claude`);
    console.log(`Created template ${BLACKBOARD_FILE}`);
}

let timeout;
fs.watch(BLACKBOARD_FILE, (eventType, filename) => {
    if (eventType === 'change') {
        // Debounce the file watch to prevent multiple rapid triggers
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log(`\n[${new Date().toLocaleTimeString()}] 📝 File change detected!`);
            console.log(`🚀 Waking up AI Agent...`);
            
            try {
                // In a real environment, this triggers your agent CLI
                // e.g., execSync(`claude --prompt "Read AGENT_HANDOFF.md and execute your pending tasks."`, { stdio: 'inherit' });
                console.log(`[SYSTEM] Claude Code / Antigravity would execute here!`);
            } catch (err) {
                console.error("Agent execution failed:", err.message);
            }
        }, 500);
    }
});
