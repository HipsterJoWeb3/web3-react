
export interface LinkToolProps {
    data: {
        link: string
        meta: {
            title: string
            description: string
            image: {
                url: string
            }
        }
    }
}

const LinkTool: React.FC<LinkToolProps> = ({data}) => {

    return (
        <a href={data.link} target="_blank" style={{marginBottom: '60px', display: 'block'}}>
            <div className="link-text d-flex jcb">
                <div>
                    <div className="link-text__title">
                        Link
                    </div>
                    <div className="link-text__description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, veritatis?
                    </div>
                    <div className="link-text__anchor">
                        {data.link.split('/')[2]}
                    </div>
                </div>
                <div className="link-text__image" style={{backgroundImage: `url(${data.meta?.image?.url})`}}></div>
            </div>
        </a>
    )
}

export default LinkTool