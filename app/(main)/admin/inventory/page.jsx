"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";

const Redirect = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/admin/inventory/All")
    })
    return(
        <h4>redirecting...</h4>
    )
}

export default Redirect