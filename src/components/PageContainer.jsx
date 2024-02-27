import React from 'react'

export default function PageContainer(props) {
    return (
        <div className={"m-10"}>
            <h2 className={"font-extrabold text-5xl"}>{props.title}</h2>
            {props.children}
        </div>
    )
}