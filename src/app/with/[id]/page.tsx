"use client"

interface PageProps {
    params : {id : string};
}

const With : React.FC<PageProps> =  ({params} ) => {

    const {id} = params;

    return (
        <main>
            <h1>With page id:{id}</h1>
        </main>
    )
}

export default With;
