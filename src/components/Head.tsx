
import Head from 'next/head'
import React, {useMemo} from 'react'
import {useAppSelector} from "../redux/store";
import {generalData} from "../redux/general/slice";

export interface HeadProps {
    title?: string;
    description?: string;
    keywords?: string[];
}

const MyHead: React.FC<HeadProps> = ({title, description, keywords}) => {
    const {general} = useAppSelector(generalData)

    const dataSeo = useMemo(() => {
        return {
            title: general?.title,
            description: general?.description,
            keywords: general?.keywords,
        }
    }, [general])


    return (
        <Head>

            <title>{title ? title : dataSeo.title}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={description ? description : dataSeo.description}/>
            <meta name="keywords" content={`${dataSeo.keywords?.join(',')}, ${keywords?.join(',')}`}/>
        </Head>
    )
}

export default MyHead