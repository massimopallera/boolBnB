import { useLocation } from "react-router-dom"
import { useState } from "react"

const initialFormData = {
    to: '',
    subject: '',
    text: '',
}




export default function SendMail(){
    
    const location = useLocation()
    const {ownerEmail} = location.state || ''


    const [formData, setFormData] = useState({initialFormData, to: ownerEmail})
    //send email
    function handleMail(e) {
        e.preventDefault()

        if(formData.subject === ''){
            //toast
            return;
        }

        if (formData.text === ''){
            //toast
            return;
        }

        fetch('http://127.0.0.1:3000/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...formData, to: ownerEmail})
        }).then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    
    
    return(
        <>
        <div>
            <form className='d-flex flex-column gap-3' onSubmit={handleMail}>

                <div>
                    <label htmlFor="to">Cc</label>
                    <input type="email" id="to" name="to" value={formData.to} onChange={(e) => e.target.value = formData.to} disabled/>
                </div>
                <div>
                    <label htmlFor="subject">Oggetto</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="text">Text</label>
                    <textarea name="text" id="" value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })}></textarea>
                </div>

                <button className="btn btn-primary">Invia email</button> 
            </form>
        </div>
        </>
    )
}