const logout = (req, res) => {

    // Logout
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict',
    })

    res.json({ message: 'logout eseguito correttamente' })
}

export default logout