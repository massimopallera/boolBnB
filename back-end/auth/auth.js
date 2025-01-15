export default (req, res) => {
    const token = req.cookies.jwt; // O verifica da sessione
    if (token) {
      // Qui puoi anche decodificare e validare il token (es. con JWT)
      res.status(200).send('Utente autenticato');
    } else {
      res.status(401).send('Utente non autenticato');
    }
  }
  