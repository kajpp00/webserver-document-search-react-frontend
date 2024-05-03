import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Tabledata(props) {
    const { rows } = props

    // useEffect(() => {
    //     function removeStuff() {
    //         const ul = document.querySelectorAll('ul')
    //         ul.forEach(x => {
    //             x.childNodes.forEach(e => {
    //                 if (e.nodeName === '#text') {
    //                     e.remove()
    //                 }
    //             })
    //         })
    //     }
    //     removeStuff()

    // }, [rows])


    return (
        <div>
            {rows.map((x, i) =>
                <DataWrapper className="rows" key={i}>
                    <div><a href={x.URL}>{x.FILE}</a></div>
                    <div className='text-center'>{x.ROOT_FOLDER}</div>
                    <div>
                        <details>
                            <summary>Show Context</summary>
                            <Context>
                                <ul>{
                                    x.CONTEXT.split(';').map((xx,key) =>
                                        <li key={key} dangerouslySetInnerHTML={{ __html: xx }}></li>
                                    )
                                }
                                </ul>
                            </Context>
                        </details>
                    </div>
                    <div>{x.CREATION_DATE}</div>
                    <div>{x.MODIFIED_DATE}</div>
                    <div>
                        <ul>
                            {x.RELATIONSHIPS &&
                                x.RELATIONSHIPS.split(';').map((xx,key) =>
                                    <li key={key} dangerouslySetInnerHTML={{ __html: xx }}></li>
                                )
                            }
                        </ul>
                    </div>
                </DataWrapper>
            )}
        </div>
    )
}

const DataWrapper = styled.div`
    display:grid;
    grid-template-columns:.25fr .08fr 1fr .15fr .15fr .15fr;
    padding:20px;
    word-break:break;
    &:nth-child(even){
        background:#eee;
    };
    > div {
        word-break:break-word;
    }
   
`;

const Context = styled.div`
overflow:auto;
word-break:keep-all!important;
span {
    font-weight:800;
    color:red;
    text-decoration:underline
}
li {
    padding:10px 0
}
`;
