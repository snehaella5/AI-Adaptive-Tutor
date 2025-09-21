import fetch from 'node-fetch';

const HF_API_KEY = process.env.HF_API_KEY;

async function test() {
  const prompt = "Write a short article on love";
  
  const res = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await res.json();
  console.log(data);
}

test();
