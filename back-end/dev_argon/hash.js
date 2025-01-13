import argon2 from 'argon2'

// Recupero la chiave Pepper
const PEPPER_KEY = process.env.PEPPER_KEY;

function hashPassword(user_password) {
    const combinedPassword = user_password + PEPPER_KEY; // Combina la password con la Pepper
    return argon2.hash(combinedPassword); // Genera l'hash
}


  async function loginUser(username, password) {
    try {
      // Recupera l'hash dal database
      const storedHash = database[username];
      if (!storedHash) {
        console.log("Utente non trovato");
        return;
      }
  
      // Verifica la password con l'hash memorizzato
      const isPasswordValid = await argon2.verify(storedHash, password);
  
      if (isPasswordValid) {
        console.log("Accesso consentito!");
        // Procedi con il login
      } else {
        console.log("Password errata!");
        // Rifiuta l'accesso
      }
    } catch (err) {
      console.error("Errore durante la verifica della password:", err);
    }
  }

  export default { hashPassword, loginUser };