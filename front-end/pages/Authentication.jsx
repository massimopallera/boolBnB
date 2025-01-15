export default function Authentication(){

    function handleForm(e){
        e.preventDefault()

        const baseUrl = import.meta.env.VITE_EXPRESS_SERVER
        const path = baseUrl + '/login'
        
        // 😁 Add fields controls
        
        
        fetch(path, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
            } 
        )
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

     return(
        <>
            <form onSubmit={handleForm}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    )
}