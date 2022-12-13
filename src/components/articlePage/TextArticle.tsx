import React, {useEffect, useMemo} from "react";
import LineChart from "../charts/LineChart";
import {useChart} from "../../hooks/useChart";
import BarChart from "../charts/BarChart";
import LinkTool from "./LinkTool";
import LazyLoader from "../LazyLoader";

export interface TextArticleProps {
    text: any,
    setUpdateAnchor?: (value: boolean) => void
}

const TextArticle: React.FC<TextArticleProps> = ({text, setUpdateAnchor}) => {

    const data = useMemo(() => {
        return text?.blocks && text.blocks.map((block: any) => {
            if (block.type === 'paragraph') {
                return (
                    <p key={block.id}>{block.data.text}</p>
                )
            }
            if (block.type === 'header') {
                return (
                    <h2 key={block.id}>{block.data.text}</h2>
                )
            }
            if (block.type === 'list') {
                return (
                    <ul key={block.id}>
                        {block.data.items.map((item: any) => {
                            return (
                                <li key={item}>{item}</li>
                            )
                        })}
                    </ul>
                )
            }
            if (block.type === 'image') {
                return (
                    <LazyLoader
                        key={block.id}
                        image={{
                            src: block.data.file.url,
                            alt: block.data.caption
                        }}
                    />
                )
            }
            if (block.type === 'delimiter') {
                return (
                    <hr key={block.id}/>
                )
            }
            if (block.type === 'quote') {
                return (
                    <blockquote key={block.id}>{block.data.text}</blockquote>
                )
            }
            if (block.type === 'link') {
                return (
                    <a key={block.id} href={block.data.link}>{block.data.link}</a>
                )
            }
            if (block.type === 'code') {
                return (
                    <pre key={block.id}>
                        <code>{block.data.code}</code>
                    </pre>
                )
            }
            if (block.type === 'embed') {
                return (
                    <div key={block.id} dangerouslySetInnerHTML={{__html: block.data.embed}}/>
                )
            }

            if (block.type === 'table' && block.data?.content[0] && block.data?.content[0][0]?.split('[')[0].trim().toLowerCase() === 'chart') {

                const title = block.data?.content[0][0]?.split('[')[1]?.split(']')[0]?.split(',')[0]
                const type = block.data?.content[0][0]?.split('[')[1]?.split(']')[0]?.split(',')[1]

                // get table columns and rows
                const labels = block.data?.content[0].slice(1)
                const rows = block.data?.content.slice(1)

                // return me all columns from rows
                const getColumns = (rows: any) => {
                    // @ts-ignore
                    const columns = []
                    rows.forEach((row: any) => {
                        row.forEach((item: any, index: any) => {
                            // @ts-ignore
                            if (!columns[index]) {
                                columns[index] = []
                            }
                            // @ts-ignore
                            columns[index].push(item)
                        })
                    })
                    return {
                        // @ts-ignore
                        columns: columns.splice(1),
                        // @ts-ignore
                        labels: columns[0]
                    }
                }

                const chartData = getColumns(rows)


                const data = useChart(chartData.labels, chartData.columns.map((column, index) => {
                    return {
                        label: labels[index],
                        data: column
                    }
                }))


                return (
                    type.trim().toLowerCase() === 'line' ?
                        <div key={block.id}>
                            <LineChart data={data}/>
                        </div>
                        :
                        <div key={block.id}>
                            <BarChart data={data}/>
                        </div>

                )
            }
            if (block.type === 'table') {
                return (
                    <table key={block.id}>
                        <tbody>
                        {block.data.content.map((row: any, i: number) => {
                            return (
                                <tr key={i}>
                                    {row.map((cell: any, j: number) => {
                                        return (
                                            <td key={j}>{cell}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )
            }
            if (block.type === 'linkTool') {
                return (
                    <LinkTool key={block.id} data={block.data} />
                )
            }
            return null
        })
    }, [text])

    useEffect(() => {
        if (setUpdateAnchor) {
            setUpdateAnchor(false)
        }
    }, [setUpdateAnchor])

    return (
        <>
            {data || text}
        </>
    )
}

export default TextArticle


