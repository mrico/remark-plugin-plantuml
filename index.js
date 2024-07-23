import { visit } from "unist-util-visit";
import child_process from "child_process";

const defaultOptions = {
  format: "png",
  jarPath: "plantuml.jar",
};

const renderPlantUML = (input, options) => {
  return new Promise((resolve, reject) => {
    const args = ["-jar", options.jarPath, `-t${options.format}`, "-pipe"];
    const child = child_process.spawn("java", args, {
      stdio: ["pipe", "pipe", "inherit"],
    });

    let chunks = [];

    child.stdout.on("data", (data) => {
      chunks.push(data);
    });

    child.on("close", (code) => {
      if (code == 1) {
        return reject(new Error("plantuml failed to render"));
      }

      const outputBuffer = Buffer.concat(chunks);
      resolve(outputBuffer);
    });

    child.stdin.write(input);
    child.stdin.end();
  });
};

export default function remarkPlantuml(options) {
  const opts = { ...defaultOptions, ...options };

  return async function transformer(syntaxTree) {
    const nodes = [];

    visit(syntaxTree, "code", (node) => {
      let { lang, value } = node;
      if (lang && value && lang === "plantuml") {
        nodes.push(node);
      }
    });

    const promises = nodes.map(async (node) => {
      let { value, alt } = node;
      try {
        const buffer = await renderPlantUML(value, opts);
        let decoded = buffer.toString("base64");

        node.type = "image";
        node.url = `data:image/${opts.format};base64,${decoded}`;
        node.alt = alt;
      } catch (error) {
        node.type = "text";
        node.value = `Error rendering PlantUML: ${error.message}`;
      }
    });

    await Promise.all(promises);
  };
}
