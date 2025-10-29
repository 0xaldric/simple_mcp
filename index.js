// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
async function main() {
    const server = new McpServer({
        name: "simple-mcp-server",
        version: "1.0.0",
    });
    server.tool("add_numbers", "Add two numbers together", {
        a: z.number().describe("first number"),
        b: z.number().describe("second number"),
    }, async ({ a, b }) => {
        const result = a + b;
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${a} + ${b} is ${result}`,
                },
            ],
            structuredContent: { result },
        };
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch(err => {
    console.error("MCP Server error:", err);
    process.exit(1);
});
