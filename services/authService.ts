async function authService(username, password) {

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      
    });
  
    if(!response.ok){
      await response.json();
      throw new Error(response.message);
    }
  
    return response.json();
  } catch (error) {
    alert("Error in login")

    return undefined;
  }
}

export default authService;
