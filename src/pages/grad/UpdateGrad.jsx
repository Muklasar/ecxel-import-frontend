import { useEffect, useState } from "react"
import { getGrad, updateGrad } from "../../functions/grad"
import { toast } from "react-toastify"
import { redirect, useNavigate, useParams } from "react-router-dom"
import Nav from "../../components/nav"
import GradForm from "../../components/forms/GradFrom"

const UpdateGard = () => {
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [loading, setLoading] = useState(false)
    const [grad, setGrad] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            loadGrad(slug)
        }
    }, [slug])

    const loadGrad = (slug) => {
        getGrad(slug).then(res => {
            setGrad(res.data.grad)
            console.log('Update Category', res)
            setName(res.data.grad.name)
            setDescriptions(res.data.grad.descriptions)
            // console.log('category update', res.data)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('name', name)
        setLoading(true)
        updateGrad(slug, { name, descriptions })
            .then(res => {
                setLoading(false)
                // console.log('response', res)
                toast.success(`${grad.name} is updated to ${res.data.name}`)
                setName('')
                // loadCategory()
                navigate('/dashboard/grad-master')
            }).catch(err => {
                setLoading(false)
                toast.error(err.response.data)
            })

    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 pt-5 border">
                    <Nav />
                </div>
                <div className="col p-5">
                    <h4>Update Grad</h4>
                    
                    <GradForm
                        loading={loading}
                        name={name}
                        setName={setName}
                        descriptions={descriptions}
                        setDescriptions={setDescriptions}
                        submitHandler={submitHandler}
                    />

                    {/* <hr /> */}
                </div>
            </div>
        </div>
    )
}

export default UpdateGard