import { useState } from 'react'

export const useFetchingStatus = <DataType = unknown>() => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<DataType | null>(null)
    const [error, setError] = useState('')

    return {
        loading,
        setLoading,
        error,
        setError,
        data,
        setData,
    }
}
