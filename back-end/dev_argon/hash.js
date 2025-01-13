import argon2 from 'argon2'

// Recupero la chiave Pepper
const PEPPER_KEY = process.env.PEPPER_KEY;

async function hashPassword(user_password) {
    const combinedPassword = user_password + PEPPER_KEY; // Combina la password con la Pepper
    return argon2.hash(combinedPassword); // Genera l'hash
}

async function isValid(storedHash, mail){

  try {
    const isValid = await argon2.verify(storedHash, mail+PEPPER_KEY)
  
    if (!isValid) {
      console.log('token non valido');
      return false    
    } 

    console.log('Token valido');
    return true

} catch (error) {
    console.log(error);
    return error.message
  }
  
}

  async function loginUser(db_password, password) {
    try {
      // Recupera l'hash dal database
      const storedHash = db_password;
      if (!storedHash) {
        console.log("Utente non trovato");
        return false;
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


  export default { hashPassword, loginUser };