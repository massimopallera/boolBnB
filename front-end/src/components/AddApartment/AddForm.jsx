import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
    rooms: '',
    beds: '',
    toilets: '',
    sq_meters: '',
    address: '',
    description: '',
    name: '',
    added_services: []
};

export default function AddForm({ isAuthenticated }) {
    const [formData, setFormData] = useState(initialFormData);
    const [services, setServices] = useState();
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const allowedExtensions = ["jpeg", "jpg", "gif"];
    const maxFileSize = 3 * 1024 * 1024; // 3MB in byte

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile);

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    async function handleForm(e) {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            toast.error("inserisci una foto.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            })

            return;
        }

        const fileName = file.name;
        const fileSize = file.size;
        const fileExtension = fileName.split(".").pop().toLowerCase();

        let isGood = false;

        if (!allowedExtensions.includes(fileExtension)) {
            setMessage("File type is not allowed (Upload jpeg, jpg, gif).");
            isGood = true;
        }

        if (fileSize > maxFileSize) {
            setMessage("File is over 3MB in size.");
            isGood = true;
        }

        if (isGood) return;

        let formErrors = {};

        if (!formData.rooms) formErrors.rooms = "Il numero di stanze è obbligatorio";
        if (!formData.beds) formErrors.beds = "Il numero di letti è obbligatorio";
        if (!formData.toilets) formErrors.toilets = "Il numero di bagni è obbligatorio";
        if (!formData.sq_meters) formErrors.sq_meters = "La grandezza in metri quadri è obbligatoria";
        if (!formData.address) formErrors.address = "L'indirizzo è obbligatorio";
        if (!formData.description) formErrors.description = "La descrizione è obbligatoria";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);

            for (let key in formErrors) {
                if (formErrors.hasOwnProperty(key)) {
                    toast.error(formErrors[key], {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        theme: "light",
                    });
                }
            }



        }
        setErrors({});




        // Create a FormData instance for image upload
        const formImageData = new FormData();
        setFormData({ ...formData, apartments_images: file.name });

        formImageData.append("file", file);
        // const imgName = formImageData.name

        // const imageBlob = new Blob(file, { type: 'image/jpeg' }); 

        console.log(formImageData);

        try {
            fetch("http://localhost:3000/apartments/image", {
                method: "POST",
                body: formImageData,
                credentials: "include", // Include cookies in the request
            })
                .then(response => response.json())
                .then(data => {

                    if (data.success) {
                        setMessage(`File ${fileName} was uploaded successfully!`);
                        /* const imageData = await response.json();
                        // Assuming the image name is returned and stored in the database
                        */
                    } else {
                        setMessage("Upload failed. Please try again.");
                        toast.error("Errore durante l'upload dell'immagine.", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            theme: "light",
                        })
                    }
                })
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("An error occurred during the upload.");
            toast.error("Errore durante l'upload dell'immagine.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            });
            return;
        }

        // Send form data to the server
        try {
            fetch('http://localhost:3000/apartments', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", // Specify the content type as JSON
                },
                credentials: 'include',
                body: JSON.stringify({ ...formData }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setFormData(initialFormData);
                        toast.success("Inserimento avvenuto con successo!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            theme: "light",
                        });

                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);


                    } else {
                        throw new Error("Failed to submit form data");
                    }
                })
        } catch (err) {
            console.error(err);
            toast.error("Errore durante l'inserimento", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            });
        }
    }

    // Get services for checkboxes
    function getServices() {
        fetch('http://localhost:3000/apartments/services')
            .then(resp => resp.json())
            .then(data => setServices(data.data))
            .catch(err => console.log(err));
    }

    // Checkbox logic for selecting services
    function handleCheckbox(e) {
        const { value, checked } = e.target;
        let updatedServices = [...formData.added_services];

        if (checked) {
            if (!updatedServices.includes(value)) {
                updatedServices.push(value);
            }
        } else {
            updatedServices = updatedServices.filter(service => service !== value);
        }

        setFormData({ ...formData, added_services: updatedServices });
    }

    useEffect(() => { getServices() }, [isAuthenticated]);

    return (
        <div className="container mt-5">
            <form className="card bg-light bg-gradientd-flex flex-column p-3 mb-3" onSubmit={handleForm}>
                <h4 className="text-center">Aggiungi inserzione</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome Inserzione</label>
                    <input type="text" min="0" className="form-control" name="name" id="name" placeholder="Inserisci il nome appartamento" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rooms" className="form-label">Stanze</label>
                    <input type="number" min="0" className="form-control" name="rooms" id="rooms" placeholder="Inserisci il numero di stanze" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="beds" className="form-label">Letti</label>
                    <input type="number" min="0" className="form-control" name="beds" id="beds" placeholder="Inserisci il numero di letti" value={formData.beds} onChange={(e) => setFormData({ ...formData, beds: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="toilets" className="form-label">Bagni</label>
                    <input type="number" min="0" className="form-control" name="toilets" id="toilets" placeholder="Inserisci il numero di bagni" value={formData.toilets} onChange={(e) => setFormData({ ...formData, toilets: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="sq_meters" className="form-label">Metri quadri</label>
                    <input type="number" min="0" className="form-control" name="sq_meters" id="sq_meters" placeholder="Inserisci la grandezza in metri quadri" value={formData.sq_meters} onChange={(e) => setFormData({ ...formData, sq_meters: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Indirizzo</label>
                    <input type="text" className="form-control" name="address" id="address" placeholder="Inserisci l'indirizzo" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Immagine</label>
                    <input type="file" className="form-control" name="file" id="file" onChange={handleFileChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrizione</label>
                    <textarea className="form-control" name="description" id="description" placeholder="Descrivi brevemente l'appartamento" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>
                {services && services.map(service =>
                    <div key={service.id} className="form-check">
                        <input className="form-check-input" type="checkbox" value={service.id} id={`service-${service.id}`} onChange={handleCheckbox} />
                        <label className="form-check-label" htmlFor={`service-${service.id}`}>{service.name}</label>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Salva</button>
            </form>
            <ToastContainer />
        </div>
    );
}
