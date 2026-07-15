export async function App(input) {
  const token = process.env.API_TOKEN;
  const response = await fetch('https://example.test/api', { headers: { Authorization: token } });
  const data = await response.json();
  if (input) localStorage.setItem('state', JSON.stringify(data));
  return `<button onclick="fetch('/delete')">Submit</button>${JSON.stringify(data)}`;
}
