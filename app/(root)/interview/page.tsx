import React from 'react'
import Agent from '@/components/Agent'

const Page = () => {
    return (
        <>
            <h3>Interview Generation</h3>

            <Agent
                userName="RESER"
                userId="{user?.id}"
                // profileImage="{user?.profileURL}"
                type="generate"
            />
        </>
    )
}
export default Page
