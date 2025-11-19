const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
    const role = document.getElementById("role").value.trim();
    const level = document.getElementById("level").value.trim();
    const count = document.getElementById("count").value.trim();

    if (!role || !level || !count) {
        outputBox.innerText = "❌ Please fill all fields.";
        return;
    }

    outputBox.innerText = "⏳ Generating interview questions...";

    try {
        const response = await fetch(
            "https://ai-interview-generator-backend.onrender.com/generate-interview",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, level, count }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.ok) {
            let formatted = "";
            data.data.questions.forEach((q, i) => {
                formatted += `Q${i + 1}. ${q.question}\n💡 Answer: ${q.modelAnswer}\n\n`;
            });
            outputBox.innerText = formatted;
        } else {
            outputBox.innerText = "❌ Error generating questions.";
        }
    } catch (error) {
        outputBox.innerText = "⚠️ Server not reachable.";
    }
});
