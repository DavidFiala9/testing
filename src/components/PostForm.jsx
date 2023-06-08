import React, { useState } from "react";
import Axios from "axios";
import backgroundPattern from '../assets/img/patern.png'

function PostForm() {
    const url ="http://sdtest.wz.cz/api/reservations"
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        faculty_id: "",
        year: "",
        gdpr_consent: false, // set default value to false
        image: null,
        billing_information:{
            city: "",
            street: "",
            postal_code: "",
            country: "",
            phone: "",
        }
    })

    function submit(e){
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', data.name)
        
        Axios.post(url, {
            name: data.name,
            surname: data.surname,
            email: data.email,
            faculty_id: data.faculty_id,
            year: data.year,
            gdpr_consent: data.gdpr_consent,
            image: formData,
            billing_information:{
                city: data.city,
                street: data.street,
                postal_code: data.postal_code,
                country: data.country,
                phone: data.phone
            }
        })
        .then(res=>{
            console.log(res.data)
        })
    }

    function handle(e){
        const newdata={...data}
        if (e.target.type === "checkbox") { // check if the input element is a checkbox
            newdata[e.target.id] = e.target.checked // set the state value to the checked value of the checkbox
        }
        if (e.target.type === "file") {
            newdata[e.target.id] = e.target.files
        }
        else {
            newdata[e.target.id] = e.target.value
        }
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div >
            <form onSubmit={(e)=> submit(e)}>
                <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="name" type="text"></input>
                <input onChange={(e)=>handle(e)} id="surname" value={data.surname} placeholder="surname" type="text"></input>
                <input onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="email" type="email"></input>

                <input onChange={(e)=>handle(e)} id="faculty_id" value={data.faculty_id} placeholder="faculty_id" type="number"></input>

                <input onChange={(e)=>handle(e)} id="year" value={data.year} placeholder="year" type="number"></input>

                <input onChange={(e)=>handle(e)} id="gdpr_consent" checked={data.gdpr_consent} placeholder="gdpr_consent" type="checkbox"></input>
                
                <input onChange={(e)=>handle(e)} id="city" value={data.city} placeholder="city" type="text"></input>
                <input onChange={(e)=>handle(e)} id="street" value={data.street} placeholder="street" type="text"></input>
                <input onChange={(e)=>handle(e)} id="postal_code" value={data.postal_code} placeholder="postal_code" type="text"></input>
                <input onChange={(e)=>handle(e)} id="country" value={data.country} placeholder="country" type="text"></input>
                <input onChange={(e)=>handle(e)} id="phone" value={data.phone} placeholder="phone" type="text"></input>

                <input onChange={(e)=>handle(e)} name="image" accept="image/jpeg, image/png, image/jpg" id="image" placeholder="image" type="file"></input>

                <button>Submit</button>
            </form>
        </div>
    );
}

export default PostForm;