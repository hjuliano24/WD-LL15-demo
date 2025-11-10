// script.js

const responseDiv = document.getElementById("response");

// Helper: call OpenAI API
async function getOpenAIResponse(prompt) {
  responseDiv.textContent = "Thinking... 🧊";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a handsome friend. Reply in a familiar and jocking manner."
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 60,
        temperature: 0.8
      })
    });

    const data = await res.json();

    if (data.choices && data.choices.length > 0) {
      responseDiv.textContent = data.choices[0].message.content.trim();
    } else {
      responseDiv.textContent = "No response found. 🤔";
    }
  } catch (error) {
    console.error(error);
    responseDiv.textContent = "Something went wrong. ❌";
  }
}

// Button actions
document.getElementById("iceBtn").addEventListener("click", () => {
  getOpenAIResponse("Give a short, fun icebreaker question.");
});

document.getElementById("factBtn").addEventListener("click", () => {
  getOpenAIResponse("Share a weird but true fact that people can react to.");
});

document.getElementById("jokeBtn").addEventListener("click", () => {
  getOpenAIResponse("Tell a quick, funny joke that can spark a laugh or comment.");
});

document.getElementById("weatherBtn").addEventListener("click", () => {
  getOpenAIResponse("Say something short and interesting about the weather to start a chat.");
});
