document.getElementById("send").addEventListener("click", async () => {
    const method = document.getElementById("method").value;
    const url = document.getElementById("url").value;
    const headers = document.getElementById("headers").value;
    const body = document.getElementById("body").value;
  
    let options = {
      method,
      headers: {}
    };
  
    if (headers) {
      try {
        options.headers = JSON.parse(headers);
      } catch (e) {
        alert("Erro ao analisar os headers. Certifique-se que é JSON válido.");
        return;
      }
    }
  
    if (method !== "GET" && body) {
      try {
        options.body = body;
      } catch (e) {
        alert("Erro no body JSON.");
        return;
      }
    }
  
    try {
      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type");
      const statusText = `${res.status} ${res.statusText}`;
  
      document.getElementById("responseStatus").textContent = `Status: ${statusText}`;
  
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        document.getElementById("responseOutput").textContent = JSON.stringify(data, null, 2);
      } else {
        const text = await res.text();
        document.getElementById("responseOutput").textContent = text;
      }
    } catch (error) {
      document.getElementById("responseOutput").textContent = "Erro: " + error;
    }
  });
  