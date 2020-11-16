import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Link clicks count: <b>{link.clicks}</b></p>
            <p>Created date: <b>{new Date(link.date).toLocaleDateString()}</b></p>
        </>
    )
}