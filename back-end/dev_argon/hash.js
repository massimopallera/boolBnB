import argon2 from 'argon2'

// Recupero la chiave Pepper
const PEPPER_KEY = process.env.PEPPER_KEY;

function hashPassword(user_password) {
    const combinedPassword = user_password + PEPPER_KEY; // Combina la password con la Pepper
    return argon2.hash(combinedPassword); // Genera l'hash
}


  async function loginUser(db_password, password) {
    try {
      // Recupera l'hash dal database
      const storedHash = db_password;
      if (!storedHash) {
        console.log("Utente non trovato");
        return;
      }
  
      // Verifica la password con l'hash memorizzato
      const isPasswordValid = await argon2.verify(storedHash, password+PEPPER_KEY);
  
      if (isPasswordValid) {
          // Procedi con il login
            console.log("Accesso consentito!");
            return true
      } else {
            // Rifiuta l'accesso
            console.log("Password errata!");
            return false;
      }
    } catch (err) {
      console.error("Errore durante la verifica della password:", err);
    }
  }


  function isValid(stored, password) {
    const combinedPassword = password + PEPPER_KEY; // Combina la password con la Pepper
    return argon2.verify(stored, combinedPassword); // Verifica se la password è valida
  }

  export default { hashPassword, loginUser, isValid };